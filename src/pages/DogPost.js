import React, { useContext, useState } from "react";
import { useEffect } from "react";
import TopNavigation from "../components/TopNavigation";
import { useNavigate } from "react-router-dom";
import Post from '../components/Post';
import { AuthContext } from "../components/AuthContext";
import { getPost } from "../api/post/getPost";

const DogPost = () => { 

  const [posts, setPosts] = useState([]);
  const [change, setChange] = useState(true);
  const nickname = localStorage.getItem('nickname');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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
        // 스크롤이 끝까지 내려갔을 때 실행될 함수
        // 여기에 원하는 동작을 추가하세요.
        // console.log('스크롤이 끝까지 내려갔습니다.');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [document.documentElement.scrollHeight])


  useEffect(() => {
    if (change === true) {
      getPost({setPosts, posts});
      setChange(false);
    }
  }, [change])

  const goBoast = () => {
    navigate('/dogBoast');
  };

  return (
    <>
      <div className="dog-post">
        <TopNavigation />
        <div className="btn-wrapper">
          <button className="post-button" onClick={goBoast}>자랑하기</button>
        </div>
        <div className="post-content">
          {posts.map((it, index) => (
            <Post postData={it} key={index} user={nickname} onChange={setChange} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DogPost;
