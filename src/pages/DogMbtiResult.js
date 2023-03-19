import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopNavigation2 from '../components/TopNavigation2.js';

const DogMbtiResult = () => {
    const navigate = useNavigate();

    const goDetail = () => {
        navigate('/DogExplanation');
    };

    return ( 
        <>
            <div className="result-box">
                <TopNavigation2 />
                <p>MBTI 분석 완료!</p>
                <div className="result-top">
                    <p className="result-word">[    ] 의 성격유형은 :</p>
                    <div className="result-container">
                        <div className="result-left">
                            <h3>CTIL</h3>
                            <p>모범견계의 엄친아형</p>
                            <div className="detail-img">
                                <img src="assets/ffgg1.png" alt="dogDetail img"/>
                            </div>
                        </div>
                        <div className="result-right"> 
                            <ul>
                                <li>
                                    <p>활동성</p>
                                </li>
                                <li>
                                    <p>관계성</p>
                                </li>
                                <li>
                                    <p>야생성</p>
                                </li>
                                <li>
                                    <p>의존성</p>
                                </li>
                            </ul>
                        </div>
                    </div>                   
                </div>
                <div className="result-detail">
                    <div className="detail-top">
                        <h4>CTIL</h4>
                        <p>모범견계의 엄친아형</p>
                    </div>
                   <div className="detail-content">
                        <p>CTIL 설명 ㅁㄴㅇㅁㄴㅇㅁㄴ<br/>ㅇㅁㄴㅇㅁㄴ ㅇㅁㄴㅇㅁㄴㅇ <br/>ㅁㄴㅇ ㅁㄴㅇ ㅁㄴ <br/>ㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴ ㅇㅁㄴ <br/>ㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅀㅁㄴ<br/>ㅇㅀ ㄴㅇㅀㄴ<br/>ㅇㅀ ㅗㅇㄹ홍ㄹ홍ㅀ <br/>ㅗㅇㄹ홍ㄹ홍ㄹ호 <br/>ㅇㄹ홍ㄹ홍ㄹ홍ㄹ호 <br/>ㅇㄹ홍ㄹ홍ㄹ홍ㄹ호<br/> ㄴㅇㅀ ㄴㅇㅀㄴㅇㅀㄴㅇㅀㄴㅇㅀ<br/> ㄴㅇㅀㄴㅇㅀㄴㅇㅀ<br/>ㄴㅇㅀㄴㅇㅀ ㄴㅇㅀㄴㅇㅀㄴㅇㅀㄴㅇㅀㄴ</p>
                   </div>                  
                </div>
                <div className="mbti-all-explanation">
                    <a onClick={goDetail}>MBTI 설명 보러가기</a>
                </div>
                <div className="mbit-btn-group">
                    <ul>
                        <li>
                            <a>결과 공유하기</a>
                        </li>
                        <li>
                            <a>다시 테스트하기</a>
                        </li>
                    </ul>
                </div>
                <div className="share-box">
                <span className="material-symbols-outlined">forward</span>
                    <input defaultValue="https://naver.com"/>
                    <button>URL 복사</button>
                </div>
            </div>
        </>
    )
};

export default DogMbtiResult;