import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import { useState } from "react";
import { checkingEmail, registerMember, confirmEmail, confirmCertNumber } from '../api/member/index.js'

const RegisterMember = () => {
  const navigate = useNavigate();
  const [certNumber, setCertNumber] = useState("")
  const [memberInfo, setMemberInfo] = useState({
    nickname: "",
    email: "",
    pw1: "",
    pw2: ""
  })

  const [defaultCheck, setDefaultCheck] = useState({
    nicknameCheck: false,
    emailCheck: false,
    certNumberCheck: false,
    pw1Check: false,
    pw2Check: false
  })

  const [valueCheck, setValueCheck] = useState({
    nickname: false,
    email: false,
    certNumber: false,
    pw1: false,
    pw2: false
  })

  const checkEmail = async (event) => {
    event.preventDefault();
    if (validateEmail(memberInfo.email)) {
      if (await checkingEmail(memberInfo.email, setDefaultCheck, setValueCheck, valueCheck)) {
        confirmEmail({email: memberInfo.email, setDefaultCheck})
      }
    }
  }

  const checkCertNumber = async (event) => {
    event.preventDefault();
    confirmCertNumber({email: memberInfo.email, certNumber: certNumber, setDefaultCheck, setValueCheck })
  }

  

  const validateNickname = (nickname) => {
    const nicknameRegex = /^[a-zA-Z가-힣0-9._%+-]{2,}$/;
    if (!nicknameRegex.test(nickname)) {
      setValueCheck({ ...valueCheck, nickname: false });
      setDefaultCheck({...defaultCheck, nicknameCheck: true})
    } else {
      setValueCheck({ ...valueCheck, nickname: true });
      setDefaultCheck({...defaultCheck, nicknameCheck: true})
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      alert('유효하지 않은 이메일 형식입니다.')
      return false;
    } else {
      return true;
    }
  }

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

  const changeNickname = (e) => {
    setMemberInfo({ ...memberInfo, nickname: e.target.value });
    setDefaultCheck(prev => ({
      ...prev,
      nickname: false
    }));
  }


  const changeEmail = (e) => {
    setMemberInfo({...memberInfo, email: e.target.value});
    setDefaultCheck(prev => ({
      ...prev,
      emailCheck: false
    }));
  }

  const changeCertNumber = (e) => {
    setCertNumber(e.target.value)
  }

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
    if (!defaultCheck.nicknameCheck || !valueCheck.nickname) { alert("닉네임을 확인해주세요"); return false; }
    if (!defaultCheck.emailCheck || !valueCheck.email) { alert("이메일을 확인해주세요"); return false; }
    if (!defaultCheck.certNumberCheck || !valueCheck.certNumber) { alert("인증번호를 확인해주세요"); return false; }
    if (!defaultCheck.pw1Check || !defaultCheck.pw2Check || !valueCheck.pw1 || !valueCheck.pw2) { alert("비밀번호를 확인해주세요"); return false; }
    registerMember({ ...memberInfo, navigate })
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
            onBlur={(e) => validateNickname(e.target.value)}
            placeholder="닉네임"
          />
          {!defaultCheck.nicknameCheck ? null : ( valueCheck.nickname ? (
            <span className="material-symbols-outlined check-icon">done</span>
          ) : (
            <span className="material-symbols-outlined bad-check-icon">close</span>    
          ))}
        </div>
        {defaultCheck.nicknameCheck && !valueCheck.nickname && (
          <div className="check-message">한글 혹은 영문자를 포함해 2글자 이상</div>
        )}
        <div className="input-box">
          <input
            className="input input-value"
            type="email"
            value={memberInfo.email}
            onChange={changeEmail}
            placeholder="이메일"
          />
          <button className="nickname-check-btn" onClick={checkEmail}>인증번호 전송</button>
          {!defaultCheck.emailCheck ? null : ( valueCheck.email ? (
            <span className="material-symbols-outlined check-icon">done</span>
          ) : (
            <span className="material-symbols-outlined bad-check-icon">close</span>    
          ))}
        </div>
        {defaultCheck.emailCheck && (valueCheck.email && (
          <div className="input-box">
            <input className="input input-value" type="text" value={certNumber} onChange={changeCertNumber} placeholder="인증번호" />
            <button className="nickname-check-btn" onClick={checkCertNumber}>인증번호 확인</button>
            {!defaultCheck.certNumberCheck ? null : ( valueCheck.certNumber ? (
              <span className="material-symbols-outlined check-icon">done</span>
            ) : (
              <span className="material-symbols-outlined bad-check-icon">close</span>    
            ))}
          </div>
        ))}
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
          {}
          <MyButton text="회원가입" />
        </div>
      </form>
    </div>
  )
}

export default RegisterMember;