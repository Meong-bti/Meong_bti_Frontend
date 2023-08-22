import { domain } from "../domain"

export const deletePet = async ({ petId, petList, navigate }) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${domain}/pet/${petId}/deletePet`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      navigate('/main')
      if (petList.length === 1) {
        alert('남은 강아지가 없습니다. 강아지를 등록해주세요');
        navigate('/doginfo');
      }
    } else {
      console.log("삭제 실패");
    }
  }