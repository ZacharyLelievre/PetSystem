package com.lelievre.milestone1.presentationlayer.pets.shelters;

import com.lelievre.milestone1.businesslayer.ShelterService;
import com.lelievre.milestone1.presentationlayer.pets.pets.PetResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v2/shelters")
public class ShelterController {
    private ShelterService shelterService;

    //constructor
    public ShelterController(ShelterService shelterService) {

        this.shelterService = shelterService;
    }

    @GetMapping()
    public ResponseEntity<List<ShelterResponseDTO>> getShelters() {

        return ResponseEntity.status(HttpStatus.OK).body(shelterService.getAllShelters());
    }

    @GetMapping("/{shelterId}")
    public ResponseEntity<ShelterResponseDTO> getShelters(@PathVariable String shelterId) {
        return ResponseEntity.status(HttpStatus.OK).body(shelterService.getShelter(shelterId));
    }

    @PostMapping()
    public ResponseEntity<ShelterResponseDTO> addShelter(@RequestBody ShelterRequestDTO shelterRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(shelterService.addShelter(shelterRequestDTO));
    }
    @PutMapping("/{shelterId}")
    public ResponseEntity<ShelterResponseDTO> updateShelter(@RequestBody ShelterRequestDTO shelterRequestDTO,@PathVariable String shelterId){
        return ResponseEntity.status(HttpStatus.CREATED).body(shelterService.updateShelterDTO(shelterRequestDTO, shelterId));
    }

    @DeleteMapping("/{shelterId}")
    public ResponseEntity<Void>deleteShelter(@PathVariable String shelterId) {
        shelterService.deleteShelter(shelterId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);

    }
}

