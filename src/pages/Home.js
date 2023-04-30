import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const dogArr = [{idx:"dNum1",name:"미미", url:"assets/dogImg0.jpg"},{idx:"dNum2", name:"쥬쥬", url:"assets/dogImg2.jpg"},{idx:"dNum3", name:"뽀삐", url:"assets/dogImg3.jpg"}];
    // const dogArr = [];
    const goLink = () => {
        navigate('/DogSelect', {
                state: dogArr,
            }
        );
    };
    return (
        <div id="Main">
            <div className="main-box" onClick={goLink}>
                <div className="main-logo"><img src="assets/LOGO.png" style={{"width" : "120px"}} alt="MbtiLogo"/></div>
                <div className="main-img-box"></div>
            </div>
        </div>
    );
}

export default Home;
