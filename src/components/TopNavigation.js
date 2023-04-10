import React from "react";
import { useState } from "react";
import { useNavigate} from "react-router-dom";

const TopNavigation = () => {
    const navigate = useNavigate();  

    // 토글메뉴 오픈
    const [isOpen, setNav] = (useState(false));
    const openMenu = () => {
      setNav(isOpen => !isOpen);
    };

    const goHome = () => {
      navigate('/Home');
    };
    const goBack = () => {
      navigate(-1);
    };
    return (
      <>
        <header className="top-nav">
          <button className="nav-back" onClick={goBack}>
              <span className="material-symbols-outlined">arrow_back_ios</span>
              back
          </button>
          <button className="nav-home" onClick={goHome}>
              <span className="material-symbols-outlined">home</span>    
              home
          </button>    
          <button className="nav-menu" onClick={openMenu}>
              <span className="material-symbols-outlined">menu</span>
              menu
          </button>    
        </header>
        <div className={isOpen ? `toggle-menu show-menu` : `toggle-menu`}>
          <div className="toggle-menu-top">
            <button className="menu-close-btn" onClick={openMenu}><span className="material-symbols-outlined">arrow_back_ios</span>닫힘</button>
          </div>
          <div className="toggle-menu-content">
              <div className="user-box">
                ooo 보호자님
              </div>
          </div>
        </div>
      </>
    );
  };
  
  export default TopNavigation;
  