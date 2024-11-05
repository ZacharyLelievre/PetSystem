import { useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Row, Col } from 'react-bootstrap'
import _ from 'lodash'
import React, { useEffect } from 'react';
import countryList from 'react-select-country-list';
import * as countries from "react-bootstrap/ElementChildren";

export default function AddShelter({addPet, shelterOptions}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

const location= useMemo(()=>countryList().getData(),[])

 const handleSubmit = (event)=>{ 
    console.log("Hello from add shelter save ");
    event.preventDefault()//prevents refresh
    console.log(event)
    //there will be a questions like this in the next up compming test(understand how FORM works)
    console.log("Name is:"+event.target[0].value);
    console.log("Poster URL is:"+event.target[1].value);
    console.log("Release Year:"+event.target[2].value);
    console.log("Director is:"+event.target[3].value);

var url = "https://thumbs.dreamstime.com/b/movie-slate-film-reel-wood-clapper-wooden-backgorund-36502412.jpg";
if(event.target[1].value&& event.target[1].value!==""){
    url = event.target[1].value;

}


//get directorID 
var shelter= shelterOptions.find(shelter => 
    shelter.name=== event.target[3].value)

    //call back function in movieslist
    addPet(event.target[0].value,url,
        event.target[2].value, director.directorId)

    handleClose()
 }
    
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
                    <Modal.Title>Add Shelter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addmodal" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control placeholder="The Matrix"
                                required
                                type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridPosterURL">
                            <Form.Label>Poster URL</Form.Label>
                            <Form.Control placeholder="http://google.com" />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridDirector">
                                <Form.Label>year</Form.Label>
                                <Form.Select required defaultValue="Choose...">
                                    <option>Choose...</option>
                                    {countries.map((country, i) => {
                                        return (
                                            <option key={i} value={country.label}>
                                                {country.label}
                                            </option>
                                        )

                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridDob">
                                <Form.Label>Shelter</Form.Label>
                                <Form.Control type="date"
                                required
                                max={new Intl.DateTimeFormat('en-CA').format(new Date())}/>
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
                    <Button form="addmodal" variant="primary" type="submit">Add shelter</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}