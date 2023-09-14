import { domain } from "../domain"

export const setResult = async (petId, petName, dbti, navigate) => {
  const token = localStorage.getItem('token')
  console.log(token)

  const dbtiValue = {
    dbtiName: dbti.protoDog + dbti.dependence + dbti.relationship + dbti.activity,
    activity: dbti.step4,
    relationship: dbti.step3,
    protoDog: dbti.step1,
    dependence: dbti.step2
  }

  const response = await fetch(`${domain}/pet/${petId}/dbti`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(dbtiValue)
  })

  if (response.ok) {
    alert('dbti 등록 성공')
    navigate(`/DogMbtiResult?dbtiId=${petId}`, {
      state: { dbtiName: dbtiValue.dbtiName, testUser: true }
    });
  } else {
    alert('DBTI 등록에 에러가 발생했습니다. 잠시 후 다시 시도해주세요');
  }
}

