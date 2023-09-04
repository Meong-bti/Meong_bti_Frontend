import { domain } from "../domain";

export const deleteMember = async ({loginUpdate, navigate}) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${domain}/member/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    localStorage.removeItem('token');
    alert("성공적으로 탈퇴가 되었습니다.")
    loginUpdate();
    navigate('/')
  } else {
    alert("탈퇴 실패");
  }
}