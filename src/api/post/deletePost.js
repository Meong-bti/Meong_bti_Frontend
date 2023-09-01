import { domain } from "../domain";

export const deletePost = async ({postData, setChange}) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${domain}/post/${postData.postId}/deletePost`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }    
  })
  if (response.ok) {
    alert("삭제 성공");
    setChange(true);
  } else {
    console.log("삭제 실패")
  }
}

