import { domain } from "../domain"

export const editPet1 = async ({ petInfo, navigate }) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('petName', petInfo.petName);
  formData.append('petBreed', petInfo.petBreed);
  formData.append('petBday', petInfo.petBday);
  formData.append('petGender', petInfo.petGender);
  formData.append('petNtlz', petInfo.petNtlz);
  formData.append('petWeight', petInfo.petWeight);
  formData.append('petImageFile', petInfo.selectedImage);

  const response = await fetch(`${domain}/pet/${petInfo.petId}/edit`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })

  if (response.ok) {
    alert("수정을 완료했습니다.")
    navigate('/dogdetail', {
      state: petInfo.petId
    })
  } else {
    alert('잠시 후 다시 시도해주세요');
  }
}

export const editPet2 = async ({ petInfo, navigate }) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  const imageUrl = petInfo.petImageFile;
  const imageResponse = await fetch(imageUrl, {
    method: 'GET',
    mode: 'no-cors'
  });
  if (!imageResponse.ok) {
    console.log(imageResponse)
    console.log("에러가 발생했습니다. 잠시 후 다시 시도해주세요")
  }

  const blob = await imageResponse.blob();
  const file = new File([blob], "petImage.jpg", { type: blob.type });
  console.log(file)

  formData.append('petName', petInfo.petName);
  formData.append('petBreed', petInfo.petBreed);
  formData.append('petBday', petInfo.petBday);
  formData.append('petGender', petInfo.petGender);
  formData.append('petNtlz', petInfo.petNtlz);
  formData.append('petWeight', petInfo.petWeight);
  formData.append('petImageFile', file);

  const response = await fetch(`${domain}/pet/${petInfo.petId}/edit`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })

  if (response.ok) {
    alert("수정했습니다")
    navigate('/dogdetail', {
      state: petInfo.petId
    })
  } else {
    alert('잠시 후 다시 시도해주세요');
    const result = await response.json()
    console.log(result.status);
  }
}