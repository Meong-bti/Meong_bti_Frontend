import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { emailLogin } from '../api/member/index.js'

const EmailLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();
  const { login, loginUpdate } = useContext(AuthContext);
  
  useEffect(() => {
    if (login) {
      navigate('/main');
    }
  }, [])

  const goForgetPw = () => {
    navigate('/forgetPw');
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      emailLogin({email, password, loginUpdate, navigate})
    } else if (!email) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <div className="email-login">
      <div className="login-img-wrapper">
        <img src="assets/BIGLOGO.png" alt="MbtiLogo" width="150px" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            className="input input-value"
            type="email" value={email} ref={emailInputRef}
            onChange={handleEmailChange}
            placeholder="이메일"
          />
        </div>
        <div className="input-box">
          <input
            className="input input-value"
            type="password" value={password} ref={passwordInputRef}
            onChange={handlePasswordChange}
            placeholder="비밀번호" />
        </div>
        <div className="login-wrapper">
          <MyButton text="로그인" />
          <button className="forget" onClick={goForgetPw}>비밀번호를 잊어버리셨나요?</button>
        </div>
      </form>
    </div>
  );
};

export default EmailLogin;
