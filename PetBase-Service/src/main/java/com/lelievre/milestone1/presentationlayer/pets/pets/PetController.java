package com.lelievre.milestone1.presentationlayer.pets.pets;

import com.lelievre.milestone1.businesslayer.PetService;
import com.lelievre.milestone1.presentationlayer.pets.shelters.ShelterRequestDTO;
import com.lelievre.milestone1.presentationlayer.pets.shelters.ShelterResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v2/pets")
public class PetController {
    private PetService petService;

    //constructor
    public PetController(PetService petService) {this.petService = petService;}

    @GetMapping()
    public ResponseEntity<List<PetResponseDTO>> getPets() {
        return ResponseEntity.status(HttpStatus.OK).body(petService.getAllPets());
    }
    @GetMapping("/{petId}")
    public ResponseEntity<PetResponseDTO> getPets(@PathVariable String petId) {

        return ResponseEntity.status(HttpStatus.OK).body(petService.getPet(petId));
    }
    @PostMapping()
    public ResponseEntity<PetResponseDTO> addPet(@RequestBody PetRequestDTO petRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(petService.addPet(petRequestDTO));
    }
    @PutMapping("/{petId}")
    public ResponseEntity<PetResponseDTO> updatePet(@RequestBody PetRequestDTO petRequestDTO,@PathVariable String petId){
        return ResponseEntity.status(HttpStatus.CREATED).body(petService.updatePetDTO(petRequestDTO, petId));
    }

    @DeleteMapping("/{petId}")
    public ResponseEntity<Void> deletePet(@PathVariable String petId){
        petService.deletePet(petId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);


    }
}
