import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const EmailLogin = () => {
  const email = useRef();
  const pw = useRef();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    const email_input = document.getElementsByName("email")[0];
    const pw_input = document.getElementsByName("password")[0];

    if (email_input.value < 1) {
      email_input.focus();
    } else if (pw_input.value < 1) {
      pw_input.focus();
    } else {
      // document.getElementById("email_login").submit();
      navigate("/Home");
    }
    event.preventDefault();
  };

  return (
    <div className="email-login">
      <div className="login-img-wrapper">
        <div>멍BTI LOGO</div>
      </div>
      <form method="post" action="/login_result" id="email_login">
        <div className="input-box">
          <input className="input input-value" type="text" name="email" placeholder="이메일" />
        </div>
        <div className="input-box">
          <input className="input input-value" type="password" name="password" placeholder="비밀번호" />
        </div>
        <div className="login-wrapper">
          <MyButton text="로그인" onClick={handleLogin} />
          <button className="forget">비밀번호를 잊어버리셨나요?</button>
        </div>
      </form>
    </div>
  );
};

export default EmailLogin;
