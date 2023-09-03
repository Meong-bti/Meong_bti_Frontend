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
    const res = await response.json();
    localStorage.setItem('token', res.accessToken);
    localStorage.setItem('authType', "google");
    loginUpdate();
    getNickname();
    navigate('/main');
  } else {
    alert("google Auth API 실패")
    console.log(response)
  }
}