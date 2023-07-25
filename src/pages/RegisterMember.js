import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import { useState } from "react";
import { checkingEmail, checkingNickname, registerMember } from '../api/member/index.js'

const RegisterMember = () => {
  const navigate = useNavigate();
  const [memberInfo, setMemberInfo] = useState({
    nickname: "",
    email: "",
    pw1: "",
    pw2: ""
  })

  const [defaultCheck, setDefaultCheck] = useState({
    nickname: false,
    email: false,
    pw1Check: false,
    pw2Check: false
  })

  const [valueCheck, setValueCheck] = useState({
    nickname: false,
    email: false,
    pw1: false,
    pw2: false
  })

  const changeNickname = (e) => {
    setMemberInfo({ ...memberInfo, nickname: e.target.value });
    setDefaultCheck(prev => ({
      ...prev,
      nickname: false
    }));
  }

  const checkNickname = async (event) => {
    event.preventDefault();

    if (memberInfo.nickname) {
      checkingNickname(memberInfo.nickname, setDefaultCheck, setValueCheck)
    } else {
      alert("닉네임을 입력해주세요");
    }
  }

  const checkEmail = async (event) => {
    event.preventDefault();
    validateEmail(memberInfo.email);
    if(valueCheck.email) {
      checkingEmail(memberInfo.email, setDefaultCheck, setValueCheck)
    } else {
      alert("유효하지 않은 이메일입니다.");
    }
  }

  const changeEmail = (e) => {
    setMemberInfo({...memberInfo, email: e.target.value});
    setDefaultCheck(prev => ({
      ...prev,
      email: false
    }));
  }

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(email)) {
      setValueCheck({...valueCheck, email: false});
    } else {
      setValueCheck({...valueCheck, email: true});
    }
    // setDefaultCheck(prev => ({
    //   ...prev,
    //   email: true
    // }))
  }

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{9,}$/;

    if (!passwordRegex.test(password)) {
      setValueCheck({...valueCheck, pw1: false});
    } else {
      setValueCheck({...valueCheck, pw1: true});
    }
    setDefaultCheck(prev => ({
      ...prev,
      pw1Check: true
    }));
  };

  const changePw1 = (e) => {
    setMemberInfo({ ...memberInfo, pw1: e.target.value });
    setDefaultCheck(prev => ({
      ...prev,
      pw1Check: false,
      pw2Check: false,
    }));
  }

  const changePw2 = (e) => {
    setMemberInfo({ ...memberInfo, pw2: e.target.value });
    if (memberInfo.pw1 === e.target.value) {
      setValueCheck({...valueCheck, pw2: true});
    } else {
      setValueCheck({...valueCheck, pw2: false});
    }
    setDefaultCheck(prev => ({
      ...prev,
      pw2Check: true
    }))
  }

  const blurPw2 = (e) => {
    if (memberInfo.pw1 === e.target.value) {
      setValueCheck({...valueCheck, pw2: true});
    } else {
      setValueCheck({...valueCheck, pw2: false});
    }
    setDefaultCheck(prev => ({
      ...prev,
      pw2Check: true
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    registerMember({...memberInfo, navigate})
    // if (nicknameCheck && emailCheck && pw1Check && pw2Check) {
    // } else {
    //   alert('중복확인')
    // }
  }

  return (
    <div className="register-member">
      <div className="login-img-wrapper">
        {/* <div>멍BTI LOGO</div> */}
        <img src="assets/BIGLOGO.png" alt="MbtiLogo" width="150px" />
      </div>
      <form onSubmit={handleSubmit} id="email_login">
        <div className="input-box">
          <input
            className="input input-value"
            type="text"
            value={memberInfo.nickname}
            onChange={changeNickname}
            placeholder="닉네임"
          />
          <button className="nickname-check-btn" onClick={checkNickname}>중복 확인</button>
          {!defaultCheck.nickname ? null : ( valueCheck.nickname ? (
            <span className="material-symbols-outlined check-icon">done</span>
          ) : (
            <span className="material-symbols-outlined bad-check-icon">close</span>    
          ))}
        </div>
        {defaultCheck.nickname && !valueCheck.nickname && (
          <div className="check-message">사용 중인 닉네임입니다.</div>
        )}
        <div className="input-box">
          <input
            className="input input-value"
            type="email"
            value={memberInfo.email}
            onChange={changeEmail}
            onBlur={(e) => validateEmail(e.target.value)}
            placeholder="이메일"
          />
          <button className="nickname-check-btn" onClick={checkEmail}>중복 확인</button>
          {!defaultCheck.email ? null : ( valueCheck.email ? (
            <span className="material-symbols-outlined check-icon">done</span>
          ) : (
            <span className="material-symbols-outlined bad-check-icon">close</span>    
          ))}
        </div>
        {defaultCheck.email && !valueCheck.email && (
          <div className="check-message">사용 중인 이메일입니다.</div>
        )}
        <div className="input-box">
          <input
            className="input input-value"
            type="password"
            value={memberInfo.pw1}
            onChange={changePw1}
            onBlur={(e) => validatePassword(e.target.value)}
            placeholder="비밀번호"
          />
          {!defaultCheck.pw1Check ? null : ( valueCheck.pw1 ? (
            <span className="material-symbols-outlined check-icon">done</span>
          ) : (
            <span className="material-symbols-outlined bad-check-icon">close</span>    
          ))}
        </div>
        {defaultCheck.pw1Check && !valueCheck.pw1 && (
          <div className="check-message">특수문자, 대소문자, 숫자를 포함해 9자 이상</div>
        )}
        <div className="input-box">
          <input
            className="input input-value"
            type="password"
            value={memberInfo.pw2}
            onChange={changePw2}
            onBlur={blurPw2}
            placeholder="비밀번호 확인"
          />
          {!defaultCheck.pw2Check ? null : ( valueCheck.pw2 ? (
            <span className="material-symbols-outlined check-icon">done</span>
          ) : (
            <span className="material-symbols-outlined bad-check-icon">close</span>    
          ))}
        </div>
        {defaultCheck.pw2Check && !valueCheck.pw2 && (
          <div className="check-message">비밀번호가 일치하지 않습니다.</div>
        )}
        <div className="login-wrapper">
          <MyButton text="회원가입" />
        </div>
      </form>
    </div>
  )
}

export default RegisterMember;