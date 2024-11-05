import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './GlobalStyles.css';




export default function ShelterCard({shelter}){
    return(
        <LinkContainer to={"/shelterpets"} state={{shelterId: shelter.shelterId}} style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', width: '20rem', borderRadius: '1rem', background: '#8BC34A'  }} text="light" className="mx-1 my-3">
        <Card>
        <Card.Img src={shelter.imageURL}/>
            <Card.Body>
                <Card.Title>{shelter.name}</Card.Title>  
                <Card.Text>
                    <strong>Name: </strong>{shelter.name}
                </Card.Text>
                <Card.Text>
                <strong>location: </strong>{shelter.location}

                </Card.Text>
                
            </Card.Body>

        </Card>
        </LinkContainer>
    )
}
