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
    alert('good');
    navigate('/login')
  } else {
    console.error(response);
  }
}

export const checkingNickname = async (nickname, setDefaultCheck, setValueCheck, valueCheck) => {
  const response = await fetch(`${domain}/member/nickname/duplicate-check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ memberNick: nickname })
  })

  if (response.ok) {
    alert("닉네임 중복 확인 성공")
    setDefaultCheck(prev => ({
      ...prev,
      nickname: true
    }));
    setValueCheck({...valueCheck, nickname: true});
  } else {
    alert("닉네임 중복 확인 실패")
    setDefaultCheck(prev => ({
      ...prev,
      nickname: true
    }));
    setValueCheck({...valueCheck, nickname: false});
  }
}

export const checkingEmail = async (email, setDefaultCheck, setValueCheck, valueCheck) => {
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
    setValueCheck({...valueCheck, email: true});
  } else {
    alert("이메일 중복 확인 실패")
    setDefaultCheck(prev => ({
      ...prev,
      email: true
    }));
    setValueCheck({...valueCheck, email: false});
  }
}
