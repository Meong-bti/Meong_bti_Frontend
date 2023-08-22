import MyButton from "../components/MyButton";
import { useRef, useState } from "react";
import { tempPw } from '../api/member/index.js'
import { useNavigate } from "react-router-dom";

const ForgetPw = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const emailInputRef = useRef(null);

  const getPw = async (event) => {
    event.preventDefault();
    tempPw({email, navigate});
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="forget-pw">
      <div className="logo-wrapper">
        <img src="assets/LOGO.png" alt="MbtiLogo" width="150px" />
      </div>
      <div className="input-box">
        <input
          className="input input-value"
          type="email" value={email} ref={emailInputRef}
          onChange={handleEmailChange}
          placeholder="이메일"
        />
      </div>
      <div className="btn-wrapper">
        <MyButton text="임시비밀번호 발급" onClick={getPw} />
      </div>
    </div>
  );
};

export default ForgetPw;
