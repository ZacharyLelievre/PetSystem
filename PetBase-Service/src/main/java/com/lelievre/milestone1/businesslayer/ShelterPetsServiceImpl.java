package com.lelievre.milestone1.businesslayer;

import com.lelievre.milestone1.dataaccesslayer.Pet;
import com.lelievre.milestone1.dataaccesslayer.PetRepository;
import com.lelievre.milestone1.dataaccesslayer.Shelter;
import com.lelievre.milestone1.dataaccesslayer.ShelterRepository;
import com.lelievre.milestone1.presentationlayer.pets.pets.PetResponseDTO;
import com.lelievre.milestone1.presentationlayer.pets.shelterpets.ShelterPetsResponseDTO;
import com.lelievre.milestone1.presentationlayer.pets.shelters.ShelterResponseDTO;
import com.lelievre.milestone1.utils.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShelterPetsServiceImpl implements ShelterPetsService{
    private ShelterRepository shelterRepository;
    private PetRepository petRepository;

    public ShelterPetsServiceImpl(ShelterRepository shelterRepository,PetRepository petRepository) {
        this.shelterRepository = shelterRepository;
        this.petRepository = petRepository;
    }



    @Override
    public ShelterPetsResponseDTO getAllPetsByShelterId(String shelterId) {
        Shelter foundShelter = shelterRepository.findShelterByShelterId(shelterId);

        if (foundShelter == null) {
            throw new NotFoundException("Unkown shelter id:" + shelterId);

        }
        ShelterPetsResponseDTO shelterPetsResponseDTO= new ShelterPetsResponseDTO();
        BeanUtils.copyProperties(foundShelter,shelterPetsResponseDTO);

        List<Pet> petsList= petRepository.findPetsByShelter_ShelterId(shelterId);

        List <PetResponseDTO> petResponseDTOList = new ArrayList<>();

        for (Pet pet: petsList) {
            PetResponseDTO petResponseDTO= new PetResponseDTO();
            BeanUtils.copyProperties(pet,petResponseDTO);

            ShelterResponseDTO shelterResponseDTO = new ShelterResponseDTO();
            BeanUtils.copyProperties(pet.getShelter(),shelterResponseDTO);
            petResponseDTO.setShelter(shelterResponseDTO);
            petResponseDTOList.add(petResponseDTO);
        }

        shelterPetsResponseDTO.setPets(petResponseDTOList);

        return shelterPetsResponseDTO;
    }
}
