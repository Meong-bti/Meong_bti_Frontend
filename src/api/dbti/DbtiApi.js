const domain = "http://ec2-3-36-140-165.ap-northeast-2.compute.amazonaws.com/api"

export const updateDbti = async (petId, petName, dbti, navigate) => {
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
      state: { petName: petName, dbti: dbti, dbtiName: dbtiValue.dbtiName }
    });
  } else {
    alert('DBTI 등록에 에러가 발생했습니다. 잠시 후 다시 시도해주세요');
  }
}

export const getTestResult = async (dbtiId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${domain}/pet/${dbtiId}/dbtiInfo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    const result = await response.json();
    const data = result.data
    return data;
  }
}