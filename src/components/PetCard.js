// src/components/PetCard.js
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import EditPet from "./EditPet";
import './PetsCard.css';

export default function PetCard(props) {
    const { pet, updatePet, shelterOptions, onDeletePetHandler } = props;

    const onDelete = (e) => {
        e.stopPropagation();
        onDeletePetHandler(pet.petId);
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
    };

    return (
        <Card className="card" text="light">
            <Link to={`/pets/${pet.petId}`} className="card-link">
                <Card.Img src={pet.posterURL} />
            </Link>
            <Card.Body className="card-body">
                <Card.Title className="card-title">{pet.name}</Card.Title>
                <Card.Text className="card-text">
                    <strong>Age: </strong>{pet.age}
                </Card.Text>
                <Card.Text className="card-text">
                    <strong>Type: </strong>{pet.type}
                </Card.Text>
                <Card.Text className="card-text">
                    <strong>Breed: </strong>{pet.breed}
                </Card.Text>
                {window.location.pathname === "/pets" &&
                    <div className="button-group">
                        <div onClick={handleEditClick}>
                            <EditPet pet={pet} updatePet={updatePet} shelterOptions={shelterOptions} />
                        </div>
                        <Button variant="danger" onClick={onDelete} className="small-button">Delete</Button>
                    </div>
                }
            </Card.Body>
        </Card>
    );
}
