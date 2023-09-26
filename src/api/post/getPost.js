import { domain } from "../domain"

export const getPost = async ({ setPosts, postKey, setPostKey, setLoad }) => {
  if (postKey === 1) {
    return;
  }
  const token = localStorage.getItem('token'); 
  const response = await fetch(`${domain}/post/list?key=${postKey}&size=10`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    const result = await response.json();  
    for (let post of result.data.posts) {
      console.log(post.postId)
      setPosts(prevPost => ([...prevPost, {
        postId: post.postId,
        petId: post.petId,
        content: post.content,
        imageUrl: post.postImageUrl,
        like: post.likeCount,
        createdAt: post.createdAt,
        createdDate: post.createdDate,
        memberId: post.memberId,
        userName: post.nickname,
        likeClick: post.isPostLiked,
        petImg: post.petImageUrl,
        petDbti: post.petDbti,
      }]))
    }
    setLoad(true)
  } else {
    alert('실패');
  }
}