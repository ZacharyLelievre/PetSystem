package com.lelievre.milestone1.businesslayer;

import com.lelievre.milestone1.businesslayer.PetService;
import com.lelievre.milestone1.dataaccesslayer.Pet;
import com.lelievre.milestone1.dataaccesslayer.PetRepository;
import com.lelievre.milestone1.dataaccesslayer.Shelter;
import com.lelievre.milestone1.dataaccesslayer.ShelterRepository;
import com.lelievre.milestone1.presentationlayer.pets.pets.PetRequestDTO;
import com.lelievre.milestone1.presentationlayer.pets.pets.PetResponseDTO;
import com.lelievre.milestone1.presentationlayer.pets.shelters.ShelterResponseDTO;
import com.lelievre.milestone1.utils.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Service
public class PetServiceImpl implements PetService {
    private PetRepository petRepository;

    private ShelterRepository shelterRepository;


    public PetServiceImpl(PetRepository petRepository,ShelterRepository shelterRepository) {
        this.petRepository = petRepository;
        this.shelterRepository = shelterRepository;
    }

    @Override
    public List<PetResponseDTO> getAllPets() {
        List<Pet> petEntities = petRepository.findAll();
        List<PetResponseDTO> petResponseDTOList = new ArrayList<>();

        for (Pet pet : petEntities) {
            if (pet != null) {
                PetResponseDTO petResponseDTO = new PetResponseDTO();
                BeanUtils.copyProperties(pet, petResponseDTO);
                petResponseDTOList.add(petResponseDTO);
            }
        }
        return petResponseDTOList;
    }

    @Override
    public PetResponseDTO getPet(String petId){

        Pet savedPet = petRepository.findPetByPetId(petId);

        if(savedPet==null)
            throw new NotFoundException("Unkown petId:"+petId);


        PetResponseDTO petResponseDTO = new PetResponseDTO();
        BeanUtils.copyProperties(savedPet,petResponseDTO);

        //
        ShelterResponseDTO shelterResponseDTO=new ShelterResponseDTO();
        BeanUtils.copyProperties(savedPet.getShelter(),shelterResponseDTO);
        petResponseDTO.setShelter(shelterResponseDTO);

        return petResponseDTO;
    }

    @Override
    public PetResponseDTO addPet(PetRequestDTO petRequestDTO) {
        Shelter shelter = shelterRepository.findShelterByShelterId(petRequestDTO.getShelterId());

        if(shelter==null){
            throw new NotFoundException("Unkown petId:"+petRequestDTO.getShelterId());
        }
        Pet pet = new Pet();
        BeanUtils.copyProperties(petRequestDTO,pet);
        pet.setPetId(UUID.randomUUID().toString());
        pet.setShelter(shelter);

        //save pet entity to database via repository
        Pet savedPet = petRepository.save(pet);



        PetResponseDTO petResponseDTO = new PetResponseDTO();
        BeanUtils.copyProperties(savedPet,petResponseDTO);

        ShelterResponseDTO shelterResponseDTO=new ShelterResponseDTO();
        BeanUtils.copyProperties(savedPet.getShelter(),shelterResponseDTO);

        petResponseDTO.setShelter(shelterResponseDTO);

        return petResponseDTO;
    }

    @Override
    public PetResponseDTO updatePetDTO(PetRequestDTO petRequestDTO, String petId) {

        Pet foundPet = petRepository.findPetByPetId(petId);
        if(foundPet==null){
            throw new NotFoundException("Unkown petId:"+petId);
        }
        Pet pet = new Pet();
        BeanUtils.copyProperties(petRequestDTO,pet);
        pet.setPetId(foundPet.getPetId());
        pet.setId(foundPet.getId());

        Pet savedPet= petRepository.save(pet);

        PetResponseDTO petResponseDTO=new PetResponseDTO();
        BeanUtils.copyProperties(savedPet,petResponseDTO);

        return petResponseDTO;
    }

    @Override
    public void deletePet(String petId) {
        Pet foundPet = petRepository.findPetByPetId(petId);

        if(foundPet==null){
            throw new NotFoundException("Unkown petId:"+petId);
        }

        petRepository.delete(foundPet);

    }
}
