package com.lelievre.milestone1.presentationlayer.pets.pets;

import com.lelievre.milestone1.presentationlayer.pets.shelters.ShelterResponseDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PetResponseDTO {
    private String petId;
    private String name;
    private String type;
    private String breed;
    private int age;
    private ShelterResponseDTO shelter;
    private String posterURL;

}
