const domain = "http://ec2-3-36-140-165.ap-northeast-2.compute.amazonaws.com/api"

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

export const checkingNickname = async (nickname, setDefaultCheck, setNicknameCheck) => {
  const response = await fetch(`${domain}/member/checkNickname`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nickname })
  })

  if (response.ok) {
    setDefaultCheck(prev => ({
      ...prev,
      nickname: true
    }));
    setNicknameCheck(true);
  } else {
    setDefaultCheck(prev => ({
      ...prev,
      nickname: true
    }));
    setNicknameCheck(false);
  }
}

export const checkingEmail = async (email, setDefaultCheck, setEmailCheck) => {
  const response = await fetch(`${domain}/member/checkEmail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })

  if (response.ok) {
    setDefaultCheck(prev => ({
      ...prev,
      email: true
    }));
    setEmailCheck(true);
  } else {
    setDefaultCheck(prev => ({
      ...prev,
      email: true
    }));
    setEmailCheck(false);
  }
}
