import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

    const goLink = () => {
        navigate('/DogSelect', {
                state: {
                   dNum1: "미미",
                   dNum2: "쥬쥬",
                }
            }
        );
    };
    return (
        <div id="Main">
            <div className="main-box" onClick={goLink}>
                <div className="main-logo">멍BTI LOGO</div>
                <div className="main-img-box"></div>
            </div>
        </div>
    );
}

export default Home;
