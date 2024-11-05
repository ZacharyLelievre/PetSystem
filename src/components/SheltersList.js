import ShelterCard from './ShelterCard.js'; // Add the .js extension
import { Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import './GlobalStyles.css';

export default function SheltersList() {
    const [shelters, setShelters] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v2/shelters')
            .then(response => response.json())
            .then(data => setShelters(data));
    }, []);

    return (
        <Container>
            <Row>
                {shelters.map(shelter => (
                    <ShelterCard key={shelter.shelterId} shelter={shelter} />
                ))}
            </Row>
        </Container>
    );
}