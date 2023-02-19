import React from 'react';
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const goLink = () => {
        navigate('/DogSelect', {
                state: {
                    dInfo: "미미",
                }
            }
        );
    };
    return (
        <div id="Main">
            <div className="main_box" onClick={goLink}>
                <div className="main_logo">멍BTI LOGO</div>
                <div className="main_img_box"></div>
            </div>
        </div>
    );
}

export default Home;