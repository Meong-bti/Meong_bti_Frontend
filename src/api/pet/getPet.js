import { domain } from "../domain"

export const getPet = async ({setPetList, loginUpdate, navigate, setLoaded}) => {
  setLoaded(false);
  const token = localStorage.getItem('token');
  const response = await fetch(`${domain}/pet/imageViewList`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    const result = await response.json();
    const getPetList = result.data.map((pet) => ({
      idx: pet.petId,
      name: pet.petName,
      src: pet.petImageFile,
    }));
    
    setPetList(getPetList);
  } else if (response.status === 400) {
    // alert('강아지 없음');
    setPetList([]);
  } else if (response.status === 401) {
    alert("로그인이 만료되었습니다.")
    localStorage.removeItem('token')
    loginUpdate()
    navigate('/')
  } else {
    // 수정
    console.log(response.status);
  }
}