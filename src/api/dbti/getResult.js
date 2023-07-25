const domain = "http://ec2-3-36-140-165.ap-northeast-2.compute.amazonaws.com/api"

export const getResult = async (dbtiId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${domain}/pet/${dbtiId}/dbtiInfo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    const result = await response.json();
    const data = result.data
    return data;
  }
}