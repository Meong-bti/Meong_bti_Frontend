import { domain } from "../domain";

export const updatePost = async ({postData, content, setContentEdit}) => {
  const formData = new FormData();
  const imageUrl = postData.petImageFile;
  const imageResponse = await fetch(imageUrl, {
    method: 'GET',
  });
  if (!imageResponse.ok) {
    console.log("이미지 불러오기 에러(게시물 수정)")
  }
  const blob = await imageResponse.blob();
  const file = new File([blob], "postImage.jpg", { type: blob.type });

  formData.append('petId', postData.petId)
  formData.append('postImageFile', file)
  formData.append('content', content)

  const token = localStorage.getItem('token');
  const response = await fetch(`${domain}/post/${postData.petId}/edit`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })

  if (response.ok) {
    setContentEdit(false);
  } else {
    console.log("수정 실패");
  }
}