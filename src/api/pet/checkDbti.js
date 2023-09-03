import { domain } from "../domain"

export const checkDbti = async ({petId}) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${domain}/pet/${petId}/detailInfo`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    const result = await response.json();
    if (result.data.petDbti) {
      return true;
    } else {
      return false;
    }
  } else {
    console.log('pet 상세불러오기 실패');
  }
}