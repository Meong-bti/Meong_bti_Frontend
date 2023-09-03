// Test 적용 / 원본 : DogMbtiResult2

import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import TopNavigation2 from '../components/TopNavigation2.js';
import { useLocation } from 'react-router-dom';
import dbtiDes from '../components/DbtiConnection.js';
import { getResult } from "../api/dbti/index.js";

const DogMbtiResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goDetail = () => {
    navigate('/DogExplanation', {
      state: location.state
    });
  };

  const goTest = () => {
    navigate('/Question');
  };

  const queryParams = new URLSearchParams(location.search);
  const dbtiId = queryParams.get('dbtiId');
  const [dbtiResult, setDbtiResult] = useState('CNEA')
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
    if (true) {
      setDbtiResult("CNEA")
      setResultTest({
        idx:"dNum1",
        name: "사랑이", 
        type: dbtiResult,
        subTitle: dbtiDes[dbtiResult].subTitle, 
        img: `assets/dbti/main/${dbtiResult}.png`,
        sideImg: `assets/dbti/side/right/${dbtiResult}.png`,
        detail1: 11, 
        detail2: 20, 
        detail3: 70, 
        detail4: 90, 
        simpleDes: dbtiDes[dbtiResult].simpleDes,
        mainDes: dbtiDes[dbtiResult].mainDes
      });
    }
  }, [dbtiResult])

  const [friendList, setFriendList] = useState(null);

  const resultShare = async () => {
    const getFriendListUrl = "https://kapi.kakao.com/v1/api/talk/friends?limit=3"
    const kakaoUrl = "https://kapi.kakao.com/v1/api/talk/friends/message/default/send";
    const kakaoAccessToken = localStorage.getItem('kakao_access_token');    

    const templateObject = {
      object_type: 'text',
      text: 'DBTI 서비스 준비중입니다.',
      link: {
        web_url: 'https://www.naver.com',
        mobile_web_url: 'https://www.naver.com',
      },
      button_title: '바로 확인',
    };

    try {
      const kakaoGetFriendList = await fetch(getFriendListUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${kakaoAccessToken}`,
        }
      })

      if(kakaoGetFriendList.ok) {
        const result = kakaoGetFriendList.json()
        result.then(data => {
          setFriendList(data.elements)
        });

        console.log(friendList[0].uuid)
      }
      
    } catch (error) {
      console.error("친구 목록 가져오기 중 에러 : ", error)
    }

    try {
      const kakaoMessageSend = await fetch(kakaoUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${kakaoAccessToken}`,
        },
        // body: `template_object=${encodeURIComponent(JSON.stringify(templateObject))}`,
        body: new URLSearchParams({
          receiver_uuids: JSON.stringify([friendList[0].uuid]),
          template_object: JSON.stringify(templateObject)
        })
      })

      if (kakaoMessageSend.ok) {
        alert('공유 성공');
      } else {
        alert('공유 실패 : ', kakaoMessageSend.status);
      }
    } catch (error) {
      console.error('메시지 보내기 요청 중 에러 발생: ', error)
    }
  }

  const currentUrl = window.location.href;
  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
  }

  // 강아지 mbti 결과
  const {idx,name,type,subTitle,img,sideImg,detail1,detail2,detail3,detail4,simpleDes, mainDes} = resultTest;
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
        <TopNavigation2 />
        <p className="result-word">DBTI 분석 완료!</p>
        <div className="result-top">
          <div className="result-container">
            <div className="result-detail-left">
              <p className="result-word">[{name}] 의 성격 유형은 :</p>
              <p className="result-dbti-name">{dbtiResult}</p>
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
            <p>{simpleDes.map((it, index) => (
              <div className="content-des-box">
                <div className="content-simpleDes">{it}</div>
                <div className="content-mainDes">{mainDes[index]}</div>
              </div>
            ))}</p>
          </div>                  
        </div>
        <div className="mbti-all-explanation">
          <button onClick={goDetail}>MBTI 설명 보러가기</button>
        </div>
        <div className="mbit-btn-group">
          <ul>
            <li>
              <button onClick={resultShare}>결과 공유하기</button>
            </li>
            <li>
              <button onClick={goTest}>다시 테스트하기</button>
            </li>
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