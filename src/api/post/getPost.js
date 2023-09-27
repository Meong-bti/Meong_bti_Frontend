import { domain } from "../domain"

export const getPost = async ({ setPosts, postKey, setLoad, setMaxPostId, maxPostId, setFinishPost }) => {
  console.log("getPost 실행")
  const token = localStorage.getItem('token'); 
  const response = await fetch(`${domain}/post/list?key=${maxPostId}&size=10`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    const result = await response.json(); 
    if (postKey ===  0) {
      console.log("초기 세팅")
      setMaxPostId(result.data.previousCursorRequest.key + 1);
      return;
    } else if (postKey !== 1){
      let postSize = result.data.posts.length;
      if (postSize === 0) {
        console.log("게시물이 없어용")
        setFinishPost(true)
        return;
      }
      setMaxPostId(result.data.posts[postSize-1].postId)
    }
    console.log(maxPostId)

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
      setLoad(true)
    }
  } else {
    alert('실패');
  }
}