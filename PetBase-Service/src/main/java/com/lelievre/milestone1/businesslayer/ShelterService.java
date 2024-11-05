package com.lelievre.milestone1.businesslayer;

import com.lelievre.milestone1.presentationlayer.pets.shelters.ShelterRequestDTO;
import com.lelievre.milestone1.presentationlayer.pets.shelters.ShelterResponseDTO;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public interface ShelterService {

    List<ShelterResponseDTO> getAllShelters();
    ShelterResponseDTO getShelter(String shelterId);

    ShelterResponseDTO addShelter(ShelterRequestDTO shelterRequestDTO);

    ShelterResponseDTO updateShelterDTO (ShelterRequestDTO shelterRequestDTO, String shelterId);
    void deleteShelter(String shelterId);
}
