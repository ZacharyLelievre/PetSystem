package com.lelievre.milestone1.dataaccesslayer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository  extends JpaRepository<Pet,Integer> {

    Pet findPetByPetId(String petId);

    List<Pet> findPetsByShelter_ShelterId(String shelterId);

}
