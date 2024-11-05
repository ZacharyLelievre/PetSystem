import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

export default function AddPet({ addPet, shelterOptions }) {
    const [show, setShow] = useState(false);
    const [shelterId, setShelterId] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const range = _.range(1, 101);

    const handleSubmit = (event) => {
        console.log("Hello from add pets save ");
        event.preventDefault(); // prevents refresh
        console.log(event);
        console.log("Name is:" + event.target[0].value);
        console.log("Breed is:" + event.target[1].value);
        console.log("Type is:" + event.target[2].value);
        console.log("Poster URL is:" + event.target[3].value);
        console.log("Age is:" + event.target[4].value);
        console.log("Shelter is:" + shelterId);

        var url = "https://thumbs.dreamstime.com/b/movie-slate-film-reel-wood-clapper-wooden-backgorund-36502412.jpg";
        if (event.target[3].value && event.target[3].value !== "") {
            url = event.target[3].value;
        }

        var shelter = shelterOptions.find(shelter =>
            shelter.shelterId === shelterId);

        if (!shelter) {
            console.error('Shelter not found');
            return;
        }

        addPet(event.target[0].value, event.target[1].value, event.target[2].value, url, event.target[4].value, shelter.shelterId);

        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Pet
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Pet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addmodal" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="The Matrix"
                                          required
                                          type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridBreed">
                            <Form.Label>Breed</Form.Label>
                            <Form.Control placeholder="Breed"
                                          required
                                          type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control placeholder="Type"
                                          required
                                          type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridPosterURL">
                            <Form.Label>Poster URL</Form.Label>
                            <Form.Control placeholder="http://google.com" />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Select required defaultValue="Choose...">
                                    <option>Choose...</option>
                                    {range.map((age, i) => {
                                        return (
                                            <option key={i} value={age}>
                                                {age}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridShelter">
                                <Form.Label>Shelter</Form.Label>
                                <Form.Select required defaultValue="Choose..." onChange={(e) => setShelterId(e.target.value)}>
                                    <option>Choose...</option>
                                    {shelterOptions && shelterOptions.map((shelter, i) => {
                                        return (
                                            <option key={i} value={shelter.shelterId}>
                                                {shelter.name}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button form="addmodal" variant="primary" type="submit">Add Pet</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}