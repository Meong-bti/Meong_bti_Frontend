import { domain } from "../domain"
import { getNickname } from "../member"

export const authGoogle = async ({ code, loginUpdate, navigate }) => {
  console.log(code)
  const response = await fetch(`${domain}/auth/google`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ authorizationCode: code })
  })

  if (response.ok) {
    console.log("google Auth API 성공")
    const res = await response.json();
    console.log(res.data)
    localStorage.setItem('token', res.data.accessToken);
    loginUpdate();
    getNickname();
    navigate('/main');
  } else {
    alert("google Auth API 실패")
    console.log(response)
  }
}