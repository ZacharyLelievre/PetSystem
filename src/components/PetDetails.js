// src/components/PetDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import './PetDetails.css';

export default function PetDetails() {
    const { petId } = useParams();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v2/pets/${petId}`)
            .then(response => response.json())
            .then(data => {
                setPet(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching pet details:', error);
                setLoading(false);
            });
    }, [petId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!pet) {
        return <div>Pet not found.</div>;
    }

    return (
        <Container className="pet-details-container">
            <Row>
                <Col md={6}>
                    <img src={pet.posterURL} alt={pet.name} className="pet-image" />
                </Col>
                <Col md={6} className="pet-info">
                    <h2>{pet.name}</h2>
                    <p><strong>Age:</strong> {pet.age}</p>
                    <p><strong>Type:</strong> {pet.type}</p>
                    <p><strong>Breed:</strong> {pet.breed}</p>
                    <hr />
                    <div className="shelter-info">
                        <h4>Shelter Information</h4>
                        <p><strong>Name:</strong> {pet.shelter.name}</p>
                        <p><strong>Location:</strong> {pet.shelter.location}</p>
                    </div>
                    <Button variant="primary" as={Link} to="/pets" className="mt-3">← Back to Pets</Button>
                </Col>
            </Row>
        </Container>
    );
}
