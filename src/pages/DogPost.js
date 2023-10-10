import React, { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import TopNavigation from "../components/TopNavigation";
import { useNavigate } from "react-router-dom";
import Post from '../components/Post';
import { AuthContext } from "../components/AuthContext";
import { getPost } from "../api/post/getPost";

const DogPost = () => {
  const [maxPostId, setMaxPostId] = useState(1);
  const [load, setLoad] = useState(false);
  const [posts, setPosts] = useState([]);
  const nickname = localStorage.getItem('nickname');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [postKey, setPostKey] = useState(0)
  const target = useRef(null);
  const [finishPost, setFinishPost] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          io.unobserve(entry.target)
          postKeyIncrease()
          setTimeout(() => {
            observeLastItem(io, document.querySelectorAll('.post-box'));
          }, 500)
        }
      })
    }, { threshold: 0.5 });

    if (postKey === 0) {
      observer.observe(target.current);
    }
    return () => { observer.disconnect(); }

  }, [load])

  useEffect(() => {
    if (!finishPost) {
      getPost({ setPosts, postKey, setLoad, setMaxPostId, maxPostId, setFinishPost });
    }
  }, [postKey])

  
  const postKeyIncrease = () => {
    console.log("포스트키 증가 ")
    setPostKey(key => key + 1)
    setLoad(false)
  }

  const observeLastItem = (io, items) => {
    if (items.length === 0) {
      if (target.current !== null) {
        io.observe(target.current)
        return;
      }
      return;
    } 
    const lastItem = items[items.length - 1];
    io.observe(lastItem);
  };

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
        <div ref={target} style={{ height: "10px"} } />
      </div>
    </>
  );
};

export default DogPost;
