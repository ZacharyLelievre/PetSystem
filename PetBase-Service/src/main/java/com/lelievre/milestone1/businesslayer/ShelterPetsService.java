package com.lelievre.milestone1.businesslayer;

import com.lelievre.milestone1.presentationlayer.pets.shelterpets.ShelterPetsResponseDTO;

public interface ShelterPetsService {
    ShelterPetsResponseDTO getAllPetsByShelterId(String shelterId);
}
