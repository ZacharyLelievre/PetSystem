package com.lelievre.milestone1.presentationlayer.pets.shelterpets;

import com.lelievre.milestone1.presentationlayer.pets.pets.PetResponseDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
public class ShelterPetsResponseDTO {
    private String shelterId;
    private String name;
    private String location;
    private List<PetResponseDTO> pets;
}
