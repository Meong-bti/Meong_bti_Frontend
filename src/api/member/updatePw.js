import { domain } from "../domain"

export const updatePw = async ({pw1, pw2, navigate, loginUpdate}) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${domain}/member/password/change`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }, 
    body: JSON.stringify({newPassword: pw1, newPasswordCheck: pw2})
  });

  if (response.ok) {
    alert("비밀번호 수정을 완료했습니다. 다시 로그인 후 이용해주세요")
    localStorage.removeItem('token');
    loginUpdate();
    navigate('/');
  } else {
    const result = await response.json();
    alert("잠시 후 다시 시도해주세요");
  }
}