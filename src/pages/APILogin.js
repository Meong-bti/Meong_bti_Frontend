import { useContext, useEffect, useState } from "react";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext"; 
import base64 from 'base-64';
import { authGoogle, authKakao } from "../api/auth";
// import { Kakao } from 'kakao-sdk';

const APILogin = () => {
  // const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { login, loginUpdate } = useContext(AuthContext);
  const [kakaoCode, setKakaoCode] = useState("")
  const [googleCode, setGoogleCode] = useState("")
  const [kakaoLogin, setKakaoLogin] = useState(false);
  if(false) console.log(kakaoLogin, setKakaoLogin)

  useEffect(() => {
    if (login) {
      navigate('/main');
    }
    // setGoogleCode(new URL(window.location.href).searchParams.get("code"));
    // if (!!googleCode) {
    //   authGoogle({code: googleCode, loginUpdate, navigate})
    // }

    setKakaoCode(new URL(window.location.href).searchParams.get("code"));
    // if (!!kakaoCode) {
    //   authKakao({code: kakaoCode, loginUpdate, navigate})
    // }

    // if (localStorage.getItem("kakao_access_token")) {
    //   getKakaoAccessToken()
    // }
      
  }, [login, kakaoCode, googleCode])

  const goEmailLogin = () => {
    navigate(`/loginEmail`);
  };

  const goRegister = () => {
    navigate(`/register`);
  }

  const redirectUri = 'http://localhost:3000/login'; // 리다이렉트 URI  
  const kakaoClientId = 'ef93abe634b47bc062e23cbd5ccd7405'; // 클라이언트 ID
  // const kakaoClientId = '0aae94045a35d65feef8a14ff7e1b4b7'
  const kakaoClientSecret = 'RZLUqWa60emw1tXfU8X8jCziKS4ojO43'; // 클라이언트 시크릿

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectUri}&response_type=code&scope=account_email,openid,talk_message,friends`;
    // window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectUri}&response_type=code`;
  };

  const requestKakaoAccessToken = async () => {
    const kakaoUrl = 'https://kauth.kakao.com/oauth/token';

    const kakaoParams = new URLSearchParams();
    kakaoParams.append('grant_type', 'authorization_code');
    kakaoParams.append('client_id', kakaoClientId);
    kakaoParams.append('client_secret', kakaoClientSecret);
    kakaoParams.append('redirect_uri', redirectUri);
    kakaoParams.append('code', kakaoCode);

    try {
      const kakaoResponse = await fetch(kakaoUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },  
        body: kakaoParams,
      });

      const data = await kakaoResponse.json();
      console.log(data)
      let idToken = data.id_token;
      let payload = data.id_token.substring(idToken.indexOf('.') + 1, idToken.lastIndexOf('.'));
      let decodePayload = base64.decode(payload)
      let payloadJSON = JSON.parse(decodePayload)
      console.log(payloadJSON.email)
      localStorage.setItem('kakao_access_token', data.access_token);

    } catch (error) {
      console.error('액세스 토큰 요청 중 오류 발생:', error);
    }
  };

  const getKakaoAccessToken = async () => {
    const kakaoAccessToken = localStorage.getItem('kakao_access_token');
    
    const response = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization': `Bearer ${kakaoAccessToken}`
      }
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.kakao_account.email);
    } else {
      alert('이메일 획득 실패')
    }
  }
  // const googleClientId = '8342887674-j4gf33mhl9rc5trpatu5a2ampqbap0vm.apps.googleusercontent.com'; // 클라이언트 ID
  // const googleClientSecret = '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'; // 클라이언트 시크릿
  const googleClientId = '1061443135750-pinrgokprfe3m9gs8ev41t3ecrvv7vvo.apps.googleusercontent.com'; // 클라이언트 ID
  const googleClientSecret = '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'; // 클라이언트 시크릿

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=profile%20email`
  };

  const requestGoogleAccessToken = async () => {
    const googleUrl = 'https://oauth2.googleapis.com/token';

    const googleParams = new URLSearchParams();
    googleParams.append('grant_type', 'authorization_code');
    googleParams.append('client_id', googleClientId);
    googleParams.append('client_secret', googleClientSecret);
    googleParams.append('redirect_uri', redirectUri);
    googleParams.append('code', googleCode);

    try {
      const googleResponse = await fetch(googleUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },  
        body: googleParams,
      });

      const data = await googleResponse.json();
      console.log(data);
      localStorage.setItem('google_access_token', data.access_token);
    } catch (error) {
      console.error('액세스 토큰 요청 중 오류 발생:', error);
    }
  };
  
  const getGoogleAccessToken = async () => {
    const googleAccessToken = localStorage.getItem('google_access_token');
    
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization': `Bearer ${googleAccessToken}`
      }
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      alert('실패')
    }
  }

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
        <button className="api-button" onClick={requestGoogleAccessToken}>구글 토큰 획득</button>
        <button className="api-button" onClick={getGoogleAccessToken}>구글 정보 확인</button>
        <img src="assets/kakaoLogin.png" className="api-button" onClick={handleKakaoLogin} />
        <button className="api-button" onClick={requestKakaoAccessToken}>카카오 토큰 획득</button>
        <button className="api-button" onClick={getKakaoAccessToken}>카카오 정보 확인</button>
      </div>
      <div className="btn-wrapper">
        <MyButton text="회원가입" onClick={goRegister} />
        <MyButton text="로그인" onClick={goEmailLogin} />
      </div>
    </div>
  );
};

export default APILogin;
