const domain = "http://ec2-3-36-140-165.ap-northeast-2.compute.amazonaws.com/api"

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