package com.lelievre.milestone1.businesslayer;

import com.lelievre.milestone1.presentationlayer.pets.pets.PetRequestDTO;
import com.lelievre.milestone1.presentationlayer.pets.pets.PetResponseDTO;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public interface PetService {
    @GetMapping
    public List<PetResponseDTO> getAllPets();
    public PetResponseDTO getPet(String petId);

    PetResponseDTO addPet(PetRequestDTO petRequestDTO);

    PetResponseDTO updatePetDTO (PetRequestDTO petRequestDTO, String petId);
    void deletePet(String petId);
}
