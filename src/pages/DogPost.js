import React, { useState } from "react";
import { useEffect } from "react";
import TopNavigation from "../components/TopNavigation";
// import HeartImg from "../assets/heart.png";

const Post = () => {
  const [postData, setPostData] = useState({
    memberName: "사랑이누나",
    petName: "사랑이",
    petMbti: "CTWL",
    like: 30,
    postDate: "",
    postContent: "사랑이랑 산책!",
  })
  const [likeClick, setLikeClick] = useState(false);
  const [like, setLike] = useState(0);
  const [heartImg, setHeartImg] = useState("heart_empty");
  const [heartSticker, setHeartSticker] = useState("none");
  const [contentEdit, setContentEdit] = useState(false);

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
            <span className="person-name">{postData.memberName }</span>
            <span className="dog-name">{postData.petName} &nbsp;{postData.petMbti}</span>
          </div>
          <div className="post-date">10분 전</div>
        </div>
        <div className="menu-box">
          <span className="material-symbols-outlined menu" onClick={clickMenu} style={{marginTop: "10px"}}>more_vert</span>
          <div className="dropdown-content">
            <span>수정</span>
            <span>삭제</span>
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
      {contentEdit ? (
        <div className="post-content"><textarea value={postData.postContent}></textarea></div>
      ): (
        <div className="post-content">{postData.postContent}</div>
      )}
    </div>
  );
};

const DogPost = () => { 
  return (
    <div className="dog-post">
      <TopNavigation />
      <div className="btn-wrapper">
        <button className="post-button">자랑하기</button>
      </div>
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default DogPost;
