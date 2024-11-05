// ShelterPetsList.js
import React, { useState, useEffect } from 'react';
import PetCard from './PetCard.js';
import { Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './GlobalStyles.css';

export default function ShelterPetsList() {
    const [pets, setPets] = useState([]);
    const location = useLocation();
    const shelterId = location.state?.shelterId;

    useEffect(() => {
        if (shelterId) {
            fetch(`http://localhost:8080/api/v2/shelters/${shelterId}/pets`)
                .then(response => response.json())
                .then(data => setPets(data.pets)); // Access the pets array from the response
        }
    }, [shelterId]);

    return (
        <Container>
            <Row>
                {pets.map(pet => (
                    <PetCard key={pet.petId} pet={pet} />
                ))}
            </Row>
        </Container>
    );
}
