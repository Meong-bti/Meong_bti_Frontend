import { domain } from "../domain"

export const tempPw = async ({ email, navigate }) => {
  console.log(email)
  const response = await fetch(`${domain}/email/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ memberEmail: email })
  })
  
  if (response.ok) {
    alert('good');
    navigate('/login')
  } else {
    console.error(response);
  }
}