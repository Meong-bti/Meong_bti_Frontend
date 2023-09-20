import { domain } from "../domain"

export const tempPw = async ({ email, navigate }) => {
  const response = await fetch(`${domain}/email/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ memberEmail: email })
  })
  
  if (response.ok) {
    alert('임시 비밀번호를 발급했습니다. 이메일을 확인해주세요');
    navigate('/login')
  } else {
    alert('임시 비밀번호 발급에 실패했습니다. 잠시 후 다시 시도해주세요')
  }
}