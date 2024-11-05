import PetCard from "./PetCard";
import { Container, Row } from "react-bootstrap";
import { useState, useEffect ,useRef} from 'react';
import AddPet from "./AddPet";
import { successToast } from "../Utils/Toast";
import './GlobalStyles.css';

export default function PetsList() {
    const [pets, setPets] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const[shelterOptions,setShelterOptions]=useState(null);

    const initialized =useRef(false)



    useEffect(() => {

        if(!initialized.current){
        initialized.current=true
        }


        getAllPets();
        getSheltersOptions();


    }, []);

    if (isLoading) {
        return <div><h1>Loading...</h1></div>
    }
    function updatePet(updatePet){
        console.log("updatePet in Pets list ")


        var petRequestDTO = {
            name: updatePet.name,
            shelterId: updatePet.shelterId,
            age: updatePet.age,
            type:updatePet.type,
            breed:updatePet.breed,
            posterURL: updatePet.posterURL
        }

        fetch(`http://localhost:8080/api/v2/pets/${updatePet.petId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(petRequestDTO)
        })
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            console.log("data is:" +data.title)

            if (!response.ok) {
                const error = (data && data.message) || response.status;
                console.log("put error occurred");
                return Promise.reject(error);
            }

            if (response.status === 200) {
                console.log("Succesfully modified a property!")
            }
            getAllPets();
    })}

function getAllPets() {
    (async () => {
        const response = await fetch("http://localhost:8080/api/v2/pets", { method: "GET" });
        if (!response.ok) {
            throw new Error("Fetch failed with status: " + response.status);
        }
        const pets = await response.json();
        setPets(pets);
        setIsLoading(false);
    })();
}
function getSheltersOptions(){
    (async () => {
        const response = await fetch("http://localhost:8080/api/v2/shelters", {
            method: "GET"
        });
        console.log(response);
        const shelters = await response.json();
        setShelterOptions(shelters);
    })();
}

    async function deletePetHandler(petId) {
        try {
            const response = await fetch(`http://localhost:8080/api/v2/pets/${petId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 204) {
                successToast("Delete successful!");
                getAllPets();
            } else {
                console.log("Unexpected response status:", response.status);
                successToast("Unexpected error occurred.");
            }
        } catch (error) {
            console.log("An unknown error occurred:", error);
            return Promise.reject(error);
        }
    }



    function addPet(name,type,breed, posterURL, age, shelterId) {
        console.log("PetsList addPet");

        var petRequestDTO = {
            name: name,
            type: type,
            breed: breed,
            shelterId: shelterId,
            age: age,
            posterURL: posterURL
        };

        fetch(`http://localhost:8080/api/v2/pets`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(petRequestDTO)
        })
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // Check for error
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                console.log("Post error occurred");
                return Promise.reject(error);
            }
        });
    }

    return (
        <Container fluid style={{ backgroundColor: '#F1AB28', padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <AddPet addPet={addPet} shelterOptions={shelterOptions}/>
            </div>
            <Row sm={2} lg={4} className='justify-content-evenly'>
                {pets.map((pet) =>
                    <PetCard
                    key={pet.petId}
                    pet={pet}
                    updatePet={updatePet}
                    shelterOptions={shelterOptions}
                    onDeletePetHandler={deletePetHandler}
                    />
                )}
            </Row>
        </Container>
    );

}

