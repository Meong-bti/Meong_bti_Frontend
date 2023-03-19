import { useState } from "react";
import { useNavigate } from "react-router-dom";


const TopNavigation = () => {
    const [choice, setChoice] = useState(0);
    const navigate = useNavigate();  

    const openMenu = () => {

    }

    const goLink = (props) => {
        console.log(props.value);
        // if (choice === 1){

        // }
        // else if (choice === 2) {

            
        // }
        // else{
        //     console.log("선택안함");
        // }
    };
    return (
      <header className="top-nav">
        <a className="nav-back" onClick={goLink} value="1">
            <span className="material-symbols-outlined">arrow_back_ios</span>
            back
        </a>
        <a className="nav-home" onClick={goLink} value="2">
            <span className="material-symbols-outlined">home</span>    
            home
        </a>    
        <a className="nav-menu" onClick={openMenu}>
            <span className="material-symbols-outlined">menu</span>
            menu
        </a>    
      </header>
    );
  };
  
  export default TopNavigation;
  