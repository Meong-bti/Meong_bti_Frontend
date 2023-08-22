import { domain } from "../domain"

export const createPost = async ({clickedPet, selectedImage, content, navigate}) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('petId', clickedPet);
  formData.append('postImageFile', selectedImage);
  formData.append('content',  content);

  const response = await fetch(`${domain}/post/${clickedPet}/register`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (response.ok) {
    alert('게시물 작성 성공');
  } else {
    alert('게시물 작성 실패')
  }

  navigate('/dogpost');
}