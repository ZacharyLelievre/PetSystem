import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

export default function EditPet(props) {
    const { pet, updatePet, shelterOptions } = props;
    const [show, setShow] = useState(false);
    const [name, setName] = useState(pet?.name || '');
    const [posterURL, setPosterURL] = useState(pet?.posterURL || '');
    const [age, setAge] = useState(pet?.age || '');
    const [type, setType] = useState(pet?.type || '');
    const [breed, setBreed] = useState(pet?.breed || '');
    const [sheltername, setShelterName] = useState(pet?.shelter?.name || '');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const range = _.range(1, 101);

    const handleSubmit = (event) => {
        event.preventDefault();
        const shelter = shelterOptions.find(shelter => shelter.name === sheltername);
        updatePet({ petId: pet.petId, name, posterURL, age, type, breed, shelter });
        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>Edit Pet</Button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Pet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="editmodal" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={name} required type="text" onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridBreed">
                            <Form.Label>Breed</Form.Label>
                            <Form.Control value={breed} required type="text" onChange={(e) => setBreed(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control value={type} required type="text" onChange={(e) => setType(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridPosterURL">
                            <Form.Label>Poster URL</Form.Label>
                            <Form.Control value={posterURL} type="url" onChange={(e) => setPosterURL(e.target.value)} />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Select required value={age} onChange={(e) => setAge(e.target.value)}>
                                    <option>Choose...</option>
                                    {range.map((pet, i) => (
                                        <option key={i} value={pet}>{pet}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridShelter">
                                <Form.Label>Shelter</Form.Label>
                                <Form.Select required defaultValue={sheltername} onChange={(e) => setShelterName(e.target.value)}>
                                    <option>Choose...</option>
                                    {shelterOptions && shelterOptions.map((shelter, i) => (
                                        <option key={i} value={shelter.name}>{shelter.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button form="editmodal" variant="primary" type="submit">Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}