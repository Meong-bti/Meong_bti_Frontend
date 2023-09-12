import React, { useContext, useState } from "react";
import { useEffect } from "react";
import TopNavigation from "../components/TopNavigation";
import { useNavigate } from "react-router-dom";
import Post from '../components/Post';
import { AuthContext } from "../components/AuthContext";
import { getPost } from "../api/post/getPost";

const DogPost = () => { 

  const [posts, setPosts] = useState([]);
  const nickname = localStorage.getItem('nickname');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [postKey, setPostKey] = useState(0)

  useEffect(() => {
    // if (!login) {
    //   alert('로그인이 필요합니다');
    //   navigate('/login');
    // }
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight) {
        getPost({ setPosts, posts, postKey })
        setPostKey(postKey + 1)
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [document.documentElement.scrollHeight, posts])


  useEffect(() => {
    getPost({ setPosts, posts, postKey });
    setPostKey(postKey + 1)
  }, [])

  const goBoast = () => {
    navigate('/dogBoast');
  };

  return (
    <>
      <div className="dog-post">
        <TopNavigation />
        <div className="post-content">
          {posts.map((it, index) => (
            <Post postData={it} key={index} user={nickname}  />
          ))}
          {posts.length == 0 && (<div className="no-post">등록된 포스트가 없습니다.</div>)}
        </div>
        <div className="btn-wrapper">
          <button className="post-button" onClick={goBoast}>자랑하기</button>
        </div>
      </div>
    </>
  );
};

export default DogPost;
