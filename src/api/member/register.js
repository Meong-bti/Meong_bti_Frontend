import { domain } from "../domain"

export const registerMember = async ({nickname, email, pw1, pw2, navigate }) => {
  const response = await fetch(`${domain}/member/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ memberNick: nickname, memberEmail: email, memberPw: pw1, checkPw: pw2})
  })
  
  if (response.ok) {
    alert('회원가입에 성공했습니다. 로그인 후 이용해주세요');
    navigate('/login')
  } else {
    alert("잠시 후 다시 시도해주세요")
  }
}

export const checkingEmail = async (email, setDefaultCheck, setValueCheck) => {
  const response = await fetch(`${domain}/member/email/duplicate-check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ memberEmail: email })
  })

  if (response.ok) {
    setDefaultCheck(prev => ({
      ...prev,
      email: true
    }));
    setValueCheck(prev => ({
      ...prev,
      email: true
    }));

    return true;
  } else {
    alert("이미 사용중인 이메일입니다.")
    setDefaultCheck(prev => ({
      ...prev,
      email: true
    }));
    setValueCheck(prev => ({
      ...prev,
      email: false
    }));
    return false;
  }
}
