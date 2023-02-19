import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

function DogSelect() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state);

    if(location.state === null){
        console.log("강아지없다.");
        alert("강아지 등록을 먼저 해주세요!");
        navigate(`/DogInfo`);
    }
    else{
       console.log("강아지 있다.  " );
       return (
            <div className="dog_select_warp">

            </div>
        );
    }
   
}

export default DogSelect;