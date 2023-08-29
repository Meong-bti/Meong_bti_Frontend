import { domain } from "../domain"

export const logoutMember = async ({navigate, loginUpdate}) => {

  localStorage.removeItem('token');
  loginUpdate();
  navigate('/');

  // const response = await fetch(`${domain}/auth/logout`, {
  //   method: 'GET',
  //   // headers: {
  //   //   'Authorization': `Bearer ${token}`
  //   // }
  // });

  // if (response.ok) {
  //   localStorage.removeItem('token');
  //   loginUpdate();
  //   navigate('/');
  // } else if(response.status === 401) {
  //   const response2 = await fetch(`${domain}/auth/reissueToken`, {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   });

  //   if (response2.ok) {
  //     console.log("재발급 성공");
  //     console.log(response2.accessToken)
  //   } else {
  //     console.log("재발급 실패")
  //     console.log(response2.status);
  //   }
  // }
}