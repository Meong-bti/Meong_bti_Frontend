import { useContext, useEffect, useState } from "react";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext"; 
import { authGoogle, authKakao } from "../api/auth";

const APILogin = () => {
  const navigate = useNavigate();
  const { login, loginUpdate } = useContext(AuthContext);
  const [kakaoCode, setKakaoCode] = useState("")
  const [googleCode, setGoogleCode] = useState("")

  useEffect(() => {
    if (login) {
      navigate('/main');
    }
    let OAuthLogin = localStorage.getItem('OAuthLogin')

    if (OAuthLogin === 'google') {
      setGoogleCode(new URL(window.location.href).searchParams.get("code"));
      if (!!googleCode) {
        authGoogle({ code: googleCode, loginUpdate, navigate })
        localStorage.removeItem("OAuthLogin")
      }
    }
    
    if (OAuthLogin === 'kakao') {
      setKakaoCode(new URL(window.location.href).searchParams.get("code"));
      if (!!kakaoCode) {
        authKakao({ code: kakaoCode, loginUpdate, navigate })
        localStorage.removeItem("OAuthLogin")
      }
    }
      
  }, [login, kakaoCode, googleCode])

  const goEmailLogin = () => {
    navigate(`/loginEmail`);
  };

  const goRegister = () => {
    navigate(`/register`);
  }

  const redirectUri = 'https://www.mungbti.com/login'; // 리다이렉트 URI  
  const kakaoClientId = '0aae94045a35d65feef8a14ff7e1b4b7'
  const googleClientId = '1061443135750-pinrgokprfe3m9gs8ev41t3ecrvv7vvo.apps.googleusercontent.com'; // 클라이언트 ID

  const handleKakaoLogin = () => {
    localStorage.setItem('OAuthLogin', 'kakao')
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectUri}&response_type=code&scope=account_email`;
  };

  const handleGoogleLogin = () => {
    localStorage.setItem('OAuthLogin', 'google')
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=profile email`
  };


  return (
    <div className="api-login">
      <div className="login-img-wrapper">
        <img src="assets/BIGLOGO.png" alt="MbtiLogo" width="150px" />
        <img
          alt="개"
          src={process.env.PUBLIC_URL + `assets/dog.jpg`}
          width="90%"
        />
      </div>
      <div className="api-btn-wrapper">
        <img src="assets/googleLogin.png" className="api-button" onClick={handleGoogleLogin} />
        <img src="assets/kakaoLogin.png" className="api-button" onClick={handleKakaoLogin} />
      </div>
      <div className="btn-wrapper">
        <MyButton text="회원가입" onClick={goRegister} />
        <MyButton text="로그인" onClick={goEmailLogin} />
      </div>
    </div>
  );
};

export default APILogin;
