import React , {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import TopNavigation from '../components/TopNavigation.js';
import { useLocation } from 'react-router-dom';
import dbtiDes from '../components/DbtiConnection.js';
import { getResult } from "../api/dbti/index.js";

const DogMbtiResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState("share");
  const goDetail = () => {
    if (location.state && location.state.user === "test") {
      navigate('/DogExplanation', {
        state: { dbtiName: dbtiResult, petId: dbtiId, user: "test" }
      });
    } else {
      navigate('/DogExplanation', {
        state: { dbtiName: dbtiResult, petId: dbtiId, user: "share"}
      });
    }
  };

  const goTest = () => {
    navigate('/question', {
      state: { petId: dbtiId }
    });
  };

  const queryParams = new URLSearchParams(location.search);
  const dbtiId = queryParams.get('dbtiId');
  const [dbtiResult, setDbtiResult] = useState('')
  const [petName, setPetName] = useState('')
  const [resultTest, setResultTest] = useState({
    idx:"dNum1",
    name: "", 
    type: "",
    subTitle: "", 
    img: "",
    sideImg: "",
    detail1: 0, 
    detail2: 0, 
    detail3: 0, 
    detail4: 0,
    simpleDes: [],
    mainDes: []
  })

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const shareKakao = (url) => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init("cc5ebe066875a3d0c3214fc264f06811");
      }
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `${petName}의 DBTI 테스트 결과를 확인해보세요`,
          imageUrl:
            'https://meongbti-image.s3.ap-northeast-2.amazonaws.com/default/Default-2.jpg',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        buttons: [
          {
            title: '웹으로 이동',
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
        ],
      });
    }
  }


  useEffect(() => {
    
    if (location.state && location.state.user === "test") {
      setUser("test")
    }
    getResult(dbtiId).then((data) => {
      setDbtiResult(data.dbtiName)
      setPetName(data.petName)
      setResultTest({
        idx:"dNum1",
        name: data.petName, 
        type: data.dbtiName,
        subTitle: dbtiDes[data.dbtiName].subTitle, 
        img: `assets/dbti/main/${data.dbtiName}.png`,
        sideImg: `assets/dbti/side/right/${data.dbtiName}.png`,
        detail1: data.protoDog, 
        detail2: data.relationship, 
        detail3: data.dependence, 
        detail4: data.activity, 
        simpleDes: dbtiDes[data.dbtiName].simpleDes,
        mainDes: dbtiDes[data.dbtiName].mainDes
      })
    })
  }, [dbtiResult])


  const currentUrl = window.location.href;
  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
  }

  // 강아지 mbti 결과
  const {idx,name,type,subTitle,img,sideImg,detail1,detail2,detail3,detail4,simpleDes,mainDes} = resultTest;
  // 프로그레스바 설정
  useEffect(() => {
    const progress_bar1 = document.getElementById("detail1");
    const progress_bar2 = document.getElementById("detail2");
    const progress_bar3 = document.getElementById("detail3");
    const progress_bar4 = document.getElementById("detail4"); 

    progress_bar1.style.width = `${detail1}%`;
    progress_bar2.style.width = `${detail2}%`;
    progress_bar3.style.width = `${detail3}%`;
    progress_bar4.style.width = `${detail4}%`;

    progress_bar1.style.backgroundColor = "#5C4CFF";
    progress_bar2.style.backgroundColor = "#0A9A4A";    
    progress_bar3.style.backgroundColor = "#FB7237";    
    progress_bar4.style.backgroundColor = "#5186F3";
  }, [detail1]);

  return ( 
    <>
      <div className="result-box">
        <TopNavigation />
        <p className="result-word">DBTI 분석 완료!</p>
        <div className="result-top">
          <div className="result-container">
            <div className="result-detail-left">
              <p className="result-word">[{name}] 의 성격 유형은 :</p>
              <p className="result-dbti-name">{type.toUpperCase()}</p>
              <p className="result-dbti-simpleDes">{subTitle}</p>
              <div className="detail-img">
                <img src={img} alt="dogDetailImg"/>
              </div>
            </div>
            <div className="result-detail-right">
              <div className="progress-container">
                <ul>
                  <li>
                    <p>야생성</p> 
                    <div className="progress">
                      <div className="progress-bar" id="detail1" />
                    </div>
                    <p className="percent">{detail1}%</p>
                  </li>
                  <li>
                    <p>관계성</p>
                    <div className="progress">
                      <div className="progress-bar" id="detail2" />
                    </div>
                    <p className="percent">{detail2}%</p>
                  </li>
                  <li>
                    <p>의존성</p>
                    <div className="progress">
                      <div className="progress-bar" id="detail3" />
                    </div>
                    <p className="percent">{detail3}%</p>
                  </li>
                  <li>
                    <p>활동성</p>
                    <div className="progress">
                      <div className="progress-bar" id="detail4" />
                    </div>
                    <p className="percent">{detail4}%</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>                   
        </div>
        <div className="result-content">
          <div className="detail-top">
            <img className="side-img" src={sideImg} alt="side img"/>
            <h4>{type.toUpperCase()}</h4>
            <p>{subTitle}</p>
          </div>
          <div className="detail-content">
            <div>{simpleDes.map((it, index) => (
              <div className="content-des-box" key={index}>
                <div className="content-simpleDes">{it}</div>
                <div className="content-mainDes">{mainDes[index]}</div>
              </div>
            ))}</div>
          </div>                  
        </div>
        <div className="mbti-all-explanation">
          <button onClick={goDetail}>MBTI 설명 보러가기</button>
        </div>
        <div className="mbit-btn-group">
          <ul>
            <li>
              {/* <button onClick={resultShare}>결과 공유하기</button> */}
              <button onClick={() => shareKakao(currentUrl)}>결과 공유하기</button>
            </li>
            {user === "test" && (
              <li>
                <button onClick={goTest}>다시 테스트하기</button>
              </li>
            )}
          </ul>
        </div>
        <div className="share-box">
          <span className="material-symbols-outlined">forward</span>
          <input defaultValue={currentUrl} disabled />
          <button onClick={copyUrl}>URL 복사</button>
        </div>
      </div>
    </>
  )
};

export default DogMbtiResult;