const domain = "https://api.mungbti.com/api"

export const confirmEmail = async ({ email, setDefaultCheck }) => {
  const response = await fetch(`${domain}/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ memberEmail: email })
  })

  if (response.ok) {
    alert("이메일로 보낸 인증번호를 확인해주세요.")
    setDefaultCheck(prev => ({...prev, emailCheck: true}))
  } else {
    alert("인증번호 전송에 실패했습니다. 잠시 후 다시 시도해주세요")
  }
}

export const confirmCertNumber = async ({ email, certNumber, setDefaultCheck, setValueCheck }) => {
  const response = await fetch(`${domain}/email/verifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ memberEmail: email, code: certNumber })
  })

  if (response.ok) {
    alert("인증번호 확인이 완료되었습니다.")
    setDefaultCheck(prev => ({ ...prev, certNumberCheck: true }))
    setValueCheck(prev => ({...prev, certNumber: true}))
  } else {
    alert("인증번호 확인에 실패했습니다. 다시 시도해주세요")
    setDefaultCheck(prev => ({ ...prev, certNumberCheck: true }))
    setValueCheck(prev => ({...prev, certNumber: false}))
  }
}