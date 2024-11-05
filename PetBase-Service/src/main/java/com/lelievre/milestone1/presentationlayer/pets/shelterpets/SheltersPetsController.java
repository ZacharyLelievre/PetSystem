package com.lelievre.milestone1.presentationlayer.pets.shelterpets;

import com.lelievre.milestone1.businesslayer.ShelterPetsService;
import com.lelievre.milestone1.presentationlayer.pets.shelterpets.ShelterPetsResponseDTO;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v2/shelters/{shelterId}/pets")
public class SheltersPetsController {
    private ShelterPetsService shelterPetsService;

    public SheltersPetsController(ShelterPetsService shelterPetsService) {
        this.shelterPetsService = shelterPetsService;
    }

    @GetMapping()
    public ShelterPetsResponseDTO getAllPetsForAShelter(@PathVariable String shelterId){
        return shelterPetsService.getAllPetsByShelterId(shelterId);
    }
}
