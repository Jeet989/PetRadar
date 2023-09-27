import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./App.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [petData, setPetData] = useState([]);
  const [contact, setContact] = useState('');
  useEffect(() => {
  Axios({
    method: "get",
    url: "http://129.173.67.181:8085/petprofile/contact"+window.location.pathname,
    responseType: "stream",
  }).then((response) => {
    response = JSON.parse(response.data);
    setPetData(response.data?.petDetails);
    setContact(response.data?.OwnerPhoneNumber);
  });
  },[])

  const handleClick = () => {
    window.open('https://www.google.com/maps?q=animal+hospital', '_blank');
  }

  return petData ?
      <Card className="p-3 d-flex justify-content-center vh-100">
        <Card.Img
          variant="top"
          className="bg-light"
          src={petData.imageUrl}
        />
        <Card.Body className="bg-light ">
          <div className="d-flex justify-content-between shadow p-3 h-25 mb-2 bg-body border-light rounded-3  ">
            <div className="justify-content-center mt-auto mb-auto">
              <div className="justify-content-center text-center">
                {petData.petName}
                
              </div>
              <div
                className="justify-content-center text-center"
                style={{fontFamily: 'Poppins',  fontSize: "18px" }}
              >
                {petData.petCategory}
              </div>
            </div>

            <div className="justify-content-center mt-auto mb-auto">
              <div className="justify-content-center text-center"
                style={{ 
                  fontFamily: 'Poppins', fontSize: "18px" }}>
                {petData.gender}
              </div>
              <div
                className="justify-content-center text-center"
                style={{ 
                  fontFamily: 'Poppins', fontSize: "18px" }}
              >
                {petData.age} years old
              </div>
            </div>
          </div>
          <Card.Title className="d-flex p-3 justify-content-center mt-5"
          style={{ 
            fontFamily: 'Poppins', fontSize: "30px" }}>

            Let's connect to owner
          </Card.Title>
          <div className="d-grid gap-2 mx-auto mt-5 ">
            <Button className="btn border-light rounded-pill" onClick={() => contact != null ? window.open(`tel:${contact}`) : alert('Pet owner number is not present!!')} style={{fontFamily: 'Poppins',backgroundColor:'#F57327', padding:10, fontSize: "22px"}}>
              Call pet owner
            </Button>
            <Button className="btn border-light rounded-pill" onClick={handleClick} style={{fontFamily: 'Poppins', backgroundColor:'#F57327',  padding:10, fontSize: "22px"}}>
              Near by facility
            </Button>
            <Button className="btn border-light rounded-pill" style={{fontFamily: 'Poppins',  backgroundColor:'#F57327',  padding:10, fontSize: "22px"}}>
              Pet History
            </Button>
          </div>
        </Card.Body>
      </Card>
:<></>;
}

export default App;