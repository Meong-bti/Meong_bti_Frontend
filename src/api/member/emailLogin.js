import { getNickname } from "./getNickname";

const domain = "http://ec2-3-36-140-165.ap-northeast-2.compute.amazonaws.com/api"

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
    console.log(res.data.accessToken)
    localStorage.setItem('token', res.data.accessToken);
    loginUpdate();
    getNickname();
    navigate('/main');
  } else if (response.status === 401) {
    const err = await response.text();
    alert(err)
  } else alert('로그인 실패');
};