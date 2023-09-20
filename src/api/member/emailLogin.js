import { getNickname } from "./getNickname";
import { domain } from "../domain"

export const emailLogin = async ({email, password, loginUpdate, navigate}) => {
  const response = await fetch(`${domain}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ memberEmail: email, memberPw: password })
  });

  if (response.ok) {
    const res = await response.json();
    localStorage.setItem('token', res.data.accessToken);
    localStorage.setItem('authType', "email");
    loginUpdate();
    getNickname();
    navigate('/main');
  } else if (response.status === 401) {
    const err = await response.text();
    alert('아이디 혹은 비밀번호를 확인해주세요')
  } else alert('아이디 혹은 비밀번호를 확인해주세요');
};