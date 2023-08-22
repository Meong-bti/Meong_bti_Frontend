import { domain } from "../domain"
import { getNickname } from "../member"

export const authKakao = async ({ code, loginUpdate, navigate }) => {
  console.log(code)
  const response = await fetch(`${domain}/auth/kakao`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ authorizationCode: code })
  })

  if (response.ok) {
    console.log("kakao Auth API 성공")
    const res = await response.json();
    console.log(res.data)
    localStorage.setItem('token', res.data.accessToken);
    loginUpdate();
    getNickname();
    navigate('/main');
  } else {
    alert("kakao Auth API 실패")
  }
}