import { domain } from "../domain"

export const petRegister = async ({petInfo, navigate}) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('petName', petInfo.petName);
  formData.append('petBreed', petInfo.petBreed);
  formData.append('petBday',  petInfo.petBday);
  formData.append('petGender', petInfo.petGender);
  formData.append('petNtlz', petInfo.petNtlz);
  formData.append('petWeight', petInfo.petWeight);
  console.log(petInfo.selectedImage)
  if (petInfo.selectedImage === "") {
    const imagePath = `${process.env.PUBLIC_URL}/assets/dog.jpg`
    fetch(imagePath)
      .then(response => response.blob())
      .then(imageBlob => {
        formData.append('petImageFile', imageBlob)
      })
  } else {
    formData.append('petImageFile', petInfo.selectedImage)
  }

  const response = await fetch(`${domain}/pet/register`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
  
  if (response.ok) {
    alert("성공")
    navigate('/main');
  } else {
    alert('등록 실패');
  }
}