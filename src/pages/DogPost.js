import React, { useState } from "react";
import { useEffect } from "react";
import MyHeader from "../components/MyHeader";
// import HeartImg from "../assets/heart.png";

const Post = () => {
  const [postData, setPostData] = useState({
    memberName: "",
    petName: "",
    petMbti: "",
    like: 0,
    postDate: "",
    postContent: "",
  })
  const [likeClick, setLikeClick] = useState(false);
  const [like, setLike] = useState(0);
  const [heartImg, setHeartImg] = useState("heart_empty");
  const [heartSticker, setHeartSticker] = useState("none");

  const clickHeart = () => {
    if (likeClick === true) {
      setHeartImg("heart_empty");
      setLikeClick(false);
      setLike(like - 1);
    } else {
      setLike(like + 1);
      setLikeClick(true);
      setHeartImg("heart");
      setHeartSticker("flex");
      setTimeout(() => { setHeartSticker("none") }, 1000);
    }
  };

  const clickMenu = () => {
    
  }
  
  useEffect(() => {
    if (likeClick === true) {
      setHeartImg("heart");
    } else {
      setHeartImg("heart_empty");
    }
  }, []);
  
  return (
    <div className="post-box">
      <div className="post-head">
        <div className="person-img"></div>
        <div className="post-info">
          <div className="post-writer">
            <span className="person-name">라꿍이누나</span>
            <span className="dog-name">멍순이 &nbsp;CTEA</span>
          </div>
          <div className="post-date">10분 전</div>
        </div>
        <div className="menu-box">
          <span className="material-symbols-outlined menu" onClick={clickMenu} style={{marginTop: "10px"}}>more_vert</span>
          <div className="dropdown-content">
            <span>수정하기</span>
            <span>삭제하기</span>
          </div>
        </div>
      </div>
      <div className="post-image">
        <img className="pet-post-image" src="assets/petpostimg.jpg" alt="강아지이미지" width="380px" />
        <img className="heart-sticker" src="assets/heart_stick.png" alt="하트 스티커" style={{ display: `${heartSticker}`}} />
      </div>
      <div className="post-like">
        <img src={`assets/${heartImg}.png`} alt="heart" onClick={clickHeart} style={{ width: "30px" }} />
        <div
          className="like-number"
          style={{ fontSize: "25px", fontWeight: "100", marginLeft: "10px" }}
        >
          {like}
        </div>
      </div>
      <div className="post-content">사랑이 우리강아지너모귀여엉옹귀여어귀여워위귀여우어귀여우엉닝닝ㅁㄹㅇ날ㄴㅇ님니이라ㅇ라ㅣㅇㄴ랑ㄴㄹ오라.</div>
    </div>
  );
};

const DogPost = () => {

  const [likeClick, setLikeClick] = useState(false);

  return (
    <div className="dog-post">
      <MyHeader />
      <div className="btn-wrapper">
        <button>자랑하기</button>
      </div>
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default DogPost;
