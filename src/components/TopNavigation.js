import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
// import { LoginStateContext } from "../App";
import { AuthContext } from "./AuthContext";
import { deleteMember, logoutMember } from "../api/member";

const TopNavigation = () => {
  const navigate = useNavigate();  
  const nickname = localStorage.getItem('nickname');
  const { loginUpdate } = useContext(AuthContext);

  // const logout = async () => {

  //   const token = localStorage.getItem('token');
  //   console.log(token);
    
  //   const response = await fetch(`${domain}/auth/logout`, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   });

  //   if (response.ok) {
  //     localStorage.removeItem('token');
  //     loginUpdate();
  //     navigate('/');
  //   } else if(response.status === 401) {
  //     alert('logout 실패')
  //     alert('토큰 재발급')
  //     const response2 = await fetch(`${domain}/auth/reissueToken`, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });

  //     if (response2.ok) {
  //       console.log("재발급 성공");
  //       console.log(response2.accessToken)
  //     } else {
  //       console.log("재발급 실패")
  //       console.log(response2.status);
  //     }
  //   }
  // }

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

  

  return (
    <>
      <header className="top-nav">
        <button className="nav-back" >
          <span className="material-symbols-outlined" onClick={goBack}>arrow_back_ios</span>
            back
        </button>
        <button className="nav-logo" value="2">
            <img src="assets/LOGO.png" onClick={goHome} alt="MbtiLogo"/>
            MbtiLogo
        </button>
        {/* <button className="nav-home" onClick={goHome}>
            <span className="material-symbols-outlined">home</span>    
            home
        </button>     */}
        <button className="nav-menu" >
          <span className="material-symbols-outlined" onClick={openMenu}>menu</span>
            menu
        </button>    
      </header>
      <div className={isOpen ? `toggle-menu show-menu` : `toggle-menu`}>
        <div className="toggle-menu-top">
          <button className="menu-close-btn" onClick={openMenu}><span className="material-symbols-outlined">expand_less</span>닫힘</button>
          <div className="logout-btn" onClick={logout}><div className="text-box">로그아웃</div></div>
        </div>
        <div className="toggle-menu-content">
          <div className="user-box">
            {nickname} 보호자님
          </div>
          <div className="user-info-box" onClick={() => navigate('/updatePassword')}>
            개인정보 재설정
          </div>
          <div className="user-info-box member-delete-box" onClick={() => deleteMember({loginUpdate, navigate})}>
            회원 탈퇴
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavigation;
