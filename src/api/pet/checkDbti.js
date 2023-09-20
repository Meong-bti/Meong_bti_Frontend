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
    alert("에러가 발생했습니다. 잠시 후 다시 시도해주세요")
  }
}