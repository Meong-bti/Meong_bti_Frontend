import React, { useContext, useState } from "react";
import { useNavigate} from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { deleteMember, logoutMember } from "../api/member";

const TopNavigation = () => {
  const navigate = useNavigate();  
  const nickname = localStorage.getItem('nickname');
  const { loginUpdate } = useContext(AuthContext);

  const logout = () => {
    logoutMember({navigate, loginUpdate})
  }

  // 토글메뉴 오픈
  const [isOpen, setNav] = useState(false);
  const openMenu = () => {
    setNav(isOpen => !isOpen);
  };

  const goHome = () => {
    navigate('/main');
  };
  const goBack = () => {
    navigate(-1);
  };

  const goChangePw = () => {
    let authType = localStorage.getItem("authType")
    if (authType === "email") {
      navigate('/updatePassword')
    } else {
      alert("SNS 로그인은 비밀번호 변경이 불가능합니다.")
    }
  }

  const clickDeleteMember = () => {
    if (window.confirm(
`탈퇴하시면 복구가 불가능합니다. 
회원탈퇴를 진행하시겠습니까 ?`)) {
      deleteMember({loginUpdate, navigate})
    }
  }


  return (
    <>
      <header className="top-nav">
        <button className="nav-back" >
          <span className="material-symbols-outlined" onClick={goBack}>arrow_back_ios</span>
        </button>
        <button className="nav-logo" value="2">
            <img src="assets/LOGO.png" onClick={goHome} alt="MbtiLogo"/>
        </button>
        <button className="nav-menu" >
          <span className="material-symbols-outlined" onClick={openMenu}>menu</span>
        </button>    
      </header>
      <div className={isOpen ? `toggle-menu show-menu` : `toggle-menu`}>
        <div className="toggle-menu-top">
          <div className="logout-btn" onClick={logout}><div className="text-box">로그아웃</div></div>
          <button className="menu-close-btn" onClick={openMenu}><span className="material-symbols-outlined">expand_less</span></button>
        </div>
        <div className="toggle-menu-content">
          <div className="user-box">
            {nickname} 보호자님
          </div>
          <div className="user-info-box" onClick={goChangePw}>
            개인정보 재설정
          </div>
          <div className="user-info-box member-delete-box" onClick={clickDeleteMember}>
            회원 탈퇴
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavigation;
