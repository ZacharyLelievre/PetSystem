package com.lelievre.milestone1.dataaccesslayer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ShelterRepository extends JpaRepository<Shelter,Integer> {
    Shelter findShelterByShelterId(String shelterId);

}
