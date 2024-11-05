package com.lelievre.milestone1.dataaccesslayer;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="pets")
@Data
@NoArgsConstructor
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;//database id

    @Column(name="petid")
    private String petId;//public id

    @Column(name="name")
    private String name;

    @Column(name="type")
    private String type;

    @Column(name="breed")
    private String breed;

    @Column(name="age")
    private Integer age;

    @Column(name="posterurl")
    private String posterURL;

    @ManyToOne
    @JoinColumn(name="shelterid", referencedColumnName = "shelterid")
    private Shelter shelter;
}
