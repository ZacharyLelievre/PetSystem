package com.lelievre.milestone1.dataaccesslayer;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name="shelters")
@Data
@NoArgsConstructor
public class Shelter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // database id

    @Column(name="shelterid")
    private String shelterId; // public id

    @Column(name="name")
    private String name;

    @Column(name="location")
    private String location;

    @Column(name="imageURL")
    private String imageURL;


    @OneToMany(mappedBy = "shelter")
    private Set<Pet> pets;
}
