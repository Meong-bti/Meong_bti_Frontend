import { domain } from "../domain"

export const getPost = async ({setPosts, posts}) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${domain}/post/list`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    const result = await response.json();   
    setPosts([]);
    for (let post of result.data.posts) {
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
  } else {
    alert('실패');
  }
}