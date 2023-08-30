import { domain } from "../domain";

export const clickLike = async ({postData, setLikeClick, setHeartImg, setHeartSticker}) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${domain}/post/${postData.postId}/like`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    postData.like = postData.like + 1;
    setLikeClick(true);
    setHeartImg("heart");
    setHeartSticker("flex");
    setTimeout(() => { setHeartSticker("none") }, 1000);
  } else {
    console.log("좋아요 누르기 실패");
  }
}

export const cancelLike = async ({postData, setHeartImg, setLikeClick}) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${domain}/post/${postData.postId}/dislike`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    postData.like = postData.like - 1;
    setHeartImg("heart_empty");
    setLikeClick(false);
  } else {
    console.log("좋아요 취소하기 실패");
  }
}