import { useState } from "react";
import { useNavigate } from "react-router-dom";


const TopNavigation2 = () => {
    const navigate = useNavigate();  

    // 토글메뉴 오픈
    const [isOpen, setNav] = (useState(false));
    const openMenu = () => {
      setNav(isOpen => !isOpen);
    };

    // 네비게이션
    const goHome = () => {
        navigate('/Home');
    };
    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
        <header className="top-nav">
            <button className="nav-back" onClick={goBack} value="1">
                <span className="material-symbols-outlined">arrow_back_ios</span>
                back
            </button>
            <button className="nav-logo" onClick={goHome} value="2">
                <img src="assets/LOGO.png" alt="MbtiLogo"/>
                MbtiLogo
            </button>
            {/* <button className="nav-home" onClick={goHome} value="3">
                <span className="material-symbols-outlined">home</span>    
                home
            </button>     */}
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
  
  export default TopNavigation2;
  