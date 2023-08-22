import { useContext, useState } from "react";
import TopNavigation from "../components/TopNavigation";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { updatePw } from "../api/member/index.js";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { loginUpdate } = useContext(AuthContext)
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [pw1Check, setPw1Check] = useState(false);
  const [pw2Check, setPw2Check] = useState(false);
  const [defaultCheck, setDefaultCheck] = useState({
    pw1Check: false,
    pw2Check: false
  })

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{9,}$/;

    if (!passwordRegex.test(password)) {
      setPw1Check(false);
    } else {
      setPw1Check(true);
    }
    setDefaultCheck(prev => ({
      ...prev,
      pw1Check: true
    }));
  };

  const changePw1 = (e) => {
    setPw1(e.target.value);
    setDefaultCheck(prev => ({
      ...prev,
      pw1Check: false,
      pw2Check: false,
    }));
  }

  const changePw2 = (e) => {
    setPw2(e.target.value);
    if (pw1 === e.target.value) {
      setPw2Check(true);
    } else {
      setPw2Check(false);
    }
    setDefaultCheck(prev => ({
      ...prev,
      pw2Check: true
    }))
  }

  const blurPw2 = (e) => {
    if (pw1 === e.target.value) {
      setPw2Check(true);
    } else {
      setPw2Check(false);
    }
    setDefaultCheck(prev => ({
      ...prev,
      pw2Check: true
    }))
  }

  const changeNewPw = async () => {
    if (pw1Check && pw2Check) {
      updatePw({pw1, pw2, navigate, loginUpdate})
    } else {
      alert("비밀번호를 확인해주세요");
    }
  }

  return (
    <div className="update-password">
      <TopNavigation />
      <div className="input-container">
        <div className="input-box">
          <input
            className="input input-value"
            type="password"
            value={pw1}
            onChange={changePw1}
            onBlur={(e) => validatePassword(e.target.value)}
            placeholder="새 비밀번호"
          />
          {!defaultCheck.pw1Check ? null : ( pw1Check ? (
            <span className="material-symbols-outlined check-icon">done</span>
          ) : (
            <span className="material-symbols-outlined bad-check-icon">close</span>    
          ))}
        </div>
        {defaultCheck.pw1Check && !pw1Check && (
          <div className="check-message">특수문자, 대소문자, 숫자를 포함해 9자 이상</div>
        )}
        <div className="input-box">
          <input
            className="input input-value"
            type="password"
            value={pw2}
            onChange={changePw2}
            onBlur={blurPw2}
            placeholder="새 비밀번호 확인"
          />
          {!defaultCheck.pw2Check ? null : ( pw2Check ? (
            <span className="material-symbols-outlined check-icon">done</span>
          ) : (
            <span className="material-symbols-outlined bad-check-icon">close</span>    
          ))}
        </div>
        {defaultCheck.pw2Check && !pw2Check && (
          <div className="check-message">비밀번호가 일치하지 않습니다.</div>
        )}
        <div className="login-wrapper">
          <MyButton text="비밀번호 변경" onClick={changeNewPw} />
        </div>
      </div>
    </div>
  )
}

export default UpdatePassword;