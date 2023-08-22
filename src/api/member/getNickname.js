import { domain } from "../domain"

export const getNickname = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${domain}/member/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  if (response.ok) {
    const result = await response.json();
    localStorage.setItem('nickname', result.data.memberNick);
  } else {
    console.log(response.status);
  }
}