import { domain } from "../domain"

export const getPetInfo = async ({petId, setPetInfo}) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${domain}/pet/${petId}/detailInfo`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const result = await response.json();
      setPetInfo({ ...result.data, petId: petId })
    } else {
      console.log('pet 상세불러오기 실패');
    }
  }