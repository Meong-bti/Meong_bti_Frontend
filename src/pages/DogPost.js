import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import TopNavigation from "../components/TopNavigation";
import { useNavigate } from "react-router-dom";
import Post from '../components/Post';
import { AuthContext } from "../components/AuthContext";
import { getPost } from "../api/post/getPost";

const DogPost = () => {
  const [load, setLoad] = useState(false);
  const [posts, setPosts] = useState([]);
  const nickname = localStorage.getItem('nickname');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [postKey, setPostKey] = useState(1)
  let target = useRef(null);

  const observeLastItem = (io, items) => {
    const lastItem = items[items.length - 1];
    io.observe(lastItem);
  };

  

  useEffect(() => {
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          io.unobserve(entry.target)
          postKeyIncrease()
          setTimeout(() => {
            observeLastItem(io, document.querySelectorAll('.post-box'));
          }, 2000)
        }
      })
    }, { threshold: 0.5 });

    if (postKey === 1) {
      observer.observe(target.current);
    }  
  }, [load])

  const postKeyIncrease = () => {
    setPostKey((prevKey) => prevKey + 10)
  }  

  useEffect(() => {
    getPost({ setPosts, postKey, setPostKey, setLoad });
  }, [postKey])

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
        <div ref={target} style={{backgroundColor: "red", height: "10px"} } />
      </div>
    </>
  );
};

export default DogPost;
