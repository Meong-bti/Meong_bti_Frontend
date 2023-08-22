const domain = "https://api.mungbti.com/api"

export const confirmEmail = async ({ email, setDefaultCheck, setValueCheck, defaultCheck, valueCheck }) => {
  console.log(email)
  const response = await fetch(`${domain}/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ memberEmail: email })
  })

  if (response.ok) {
    alert("이메일로 보낸 인증번호를 확인해주세요.")
    setDefaultCheck({...defaultCheck, emailCheck: true})
  } else {
    alert("인증번호 전송 실패")
  }
}