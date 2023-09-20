import { domain } from "../domain"
import { getNickname } from "../member"

export const authGoogle = async ({ code, loginUpdate, navigate }) => {
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
    alert("잠시 후 다시 시도해주세요")
  }
}