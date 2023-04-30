import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";

const APILogin = () => {
  const navigate = useNavigate();

  const goEmailLogin = () => {
    navigate(`/login`);
  };

  const goRegister = () => {
    navigate(`/register`);
  }

  return (
    <div className="api-login">
      <div className="login-img-wrapper">
        <div>멍BTI LOGO</div>
        <img
          alt="개"
          src={process.env.PUBLIC_URL + `assets/dog.jpg`}
          width="90%"
        />
      </div>
      <div className="api-btn-wrapper">
        <button className="api-button">구글 계정으로 로그인</button>
        <button className="api-button">카카오 로그인</button>
      </div>
      <div className="btn-wrapper">
        <MyButton text="회원가입" onClick={goRegister}></MyButton>
        <MyButton text="로그인" onClick={goEmailLogin}></MyButton>
      </div>
    </div>
  );
};

export default APILogin;
