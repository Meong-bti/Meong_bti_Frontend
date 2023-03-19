import React from "react";
import { useState } from "react";
import { useNavigate, useLocation, useHistory } from "react-router-dom";
import TopNavigation2 from '../components/TopNavigation2.js';

const DogExplanation = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/DogMbtiResult');
    };

    return (
        <>
            <div className="result-box">
                <TopNavigation2 />
                <p>MBTI 멍비티아이란?</p>
                <div className="explain-mbti">
                    <h3>MBTI 설명</h3>
                    <p>ㅁㅇㅇㅇㄴㄻㄹㄴㄹㅇㄴㅁㅁㄴㅇㄹㄴㅇㄻㄹㄴㄹㄴㅁㄴㄹㄴㅁㄴㄹㄴㅇㄹㄴㅁㄹㄴㅇㄻㄴㄹㄴㄹㅇㅇㄻㄴㅇㄻㄴ</p>
                </div>
                <div className="explain-mbti-detail-box">
                    <img src="assets/image18.png" alt="전체 mbti 설명 표"/>
                    <img src="assets/1 5.png" alt="전체 mbti 간략 설명 표"/>
                    <div className="explain-mbti-detail">
                        <h4>MBTI 설명</h4>
                        <p>ㅁㄴㄹㄴㅇㄹㄴㄹㄷㄻㄴㄹㅇㄴㄻㄴㄹㄷㅈㄷㅁㄴㄹㄴㅇㅁㄻㅈㄷㄹㄷㄻㄴㄹㅇㄹㄴ</p>
                        <p>ㅁㄴㄹㄴㅇㄹㄴㄹㄷㄻㄴㄹㅇㄴㄻㄴㄹㄷㅈㄷㅁㄴㄹㄴㅇㅁㄻㅈㄷㄹㄷㄻㄴㄹㅇㄹㄴ</p>
                        <p>ㅁㄴㄹㄴㅇㄹㄴㄹㄷㄻㄴㄹㅇㄴㄻㄴㄹㄷㅈㄷㅁㄴㄹㄴㅇㅁㄻㅈㄷㄹㄷㄻㄴㄹㅇㄹㄴ</p>
                        <p>ㅁㄴㄹㄴㅇㄹㄴㄹㄷㄻㄴㄹㅇㄴㄻㄴㄹㄷㅈㄷㅁㄴㄹㄴㅇㅁㄻㅈㄷㄹㄷㄻㄴㄹㅇㄹㄴ</p>
                        <p>ㅁㄴㄹㄴㅇㄹㄴㄹㄷㄻㄴㄹㅇㄴㄻㄴㄹㄷㅈㄷㅁㄴㄹㄴㅇㅁㄻㅈㄷㄹㄷㄻㄴㄹㅇㄹㄴ</p>
                    </div>                    
                </div>
                <div className="explain-back-btn">
                    <a onClick={goBack}>back</a>
                </div>
            </div>
        </>
    )
    
};

export default DogExplanation;