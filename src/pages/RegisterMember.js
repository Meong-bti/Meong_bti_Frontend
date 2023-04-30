import MyButton from "../components/MyButton";

const RegisterMember = () => {

  return (
    <div className="register-member">
      <div className="login-img-wrapper">
        {/* <div>멍BTI LOGO</div> */}
        <img src="assets/LOGO.png" alt="MbtiLogo" width="150px" />
      </div>
      <form method="post" action="/member/signup" id="email_login">
        <div className="input-box">
          <input className="input input-value" type="text" name="memberNick" placeholder="닉네임" />
        </div>
        <div className="input-box">
          <input className="input input-value" type="text" name="memberEmail" placeholder="이메일" />
        </div>
        <div className="input-box">
          <input className="input input-value" type="password" name="memberPw" placeholder="비밀번호" />
        </div>
        <div className="input-box">
          <input className="input input-value" type="password" name="memberPwCheck" placeholder="비밀번호 확인" />
        </div>
        <div className="login-wrapper">
          <MyButton text="회원가입" />
        </div>
      </form>
    </div>
  )
}

export default RegisterMember;