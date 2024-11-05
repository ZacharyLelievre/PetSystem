package com.lelievre.milestone1.presentationlayer.pets.shelters;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ShelterRequestDTO {
    private String shelterId;
    private String name;
    private String location;
    private String imageURL;

}
