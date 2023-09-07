import { domain } from "../domain"

export const updatePw = async ({pw1, pw2, navigate, loginUpdate}) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${domain}/member/password/change`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }, 
    body: JSON.stringify({memberPw: pw1, checkPw: pw2})
  });

  if (response.ok) {
    localStorage.removeItem('token');
    loginUpdate();
    navigate('/');
  } else {
    const result = await response.json();
    console.log(result);
    alert("실패");
  }
}