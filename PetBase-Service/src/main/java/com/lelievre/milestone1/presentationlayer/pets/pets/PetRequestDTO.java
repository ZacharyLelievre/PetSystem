package com.lelievre.milestone1.presentationlayer.pets.pets;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PetRequestDTO {
    private String name;
    private String type;
    private String breed;
    private int age;
    private String shelterId;
    private String posterURL;

}
