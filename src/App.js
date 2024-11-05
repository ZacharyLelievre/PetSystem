import HomePage from './pages/HomePage'; // assuming HomePage.js or HomePage.jsx exists in the pages folder
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SheltersPage from "./pages/SheltersPage";
import PetsPage from "./pages/PetsPage";
import MyNavBar from "./components/MyNavBar";
import PetShelterList from "./components/PetShelterList";
import ShelterPetsList from "./components/ShelterPetsList";
import { ToastContainer } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import PetDetails from "./components/PetDetails";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <MyNavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/shelters" element={<SheltersPage />} />
          <Route path="/petshelter" element={<PetShelterList />} />
          <Route path="/shelterpets" element={<ShelterPetsList />} />
            <Route path="/pets/:petId" element={<PetDetails />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
