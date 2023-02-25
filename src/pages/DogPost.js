import { useState } from "react";
import MyHeader from "../components/MyHeader";

const Post = () => {
  const [like, setLike] = useState(0);

  const clickHeart = () => {
    setLike(like + 1);
  };

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
        <span class="material-symbols-outlined">more_vert</span>
      </div>
      <div className="post-image">
        <img src="" alt="강아지이미지" />
      </div>
      <div className="post-like">
        <span class="material-symbols-outlined heart" onClick={clickHeart}>
          favorite
        </span>
        <div className="like-number">{like}</div>
      </div>
      <div className="post-content">text</div>
    </div>
  );
};

const DogPost = () => {
  return (
    <div className="dog-post">
      <MyHeader />
      <div className="btn-wrapper">
        <button>자랑하기</button>
      </div>
      {Post()}
      {Post()}
      {Post()}
    </div>
  );
};

export default DogPost;
