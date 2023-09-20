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
    alert("닉네임을 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요")
  }
}