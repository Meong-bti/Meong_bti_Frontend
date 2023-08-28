import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageMap from "image-map";
import TopNavigation2 from '../components/TopNavigation2.js';
import dbtiDes from "../components/DbtiConnection.js";


const DogExplanation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // 네비게이션
    const goBack = () => {
        navigate('/DogMbtiResult', {
            state: location.state
        });
    };

    const dogExContent = [
        {mbti: "WTIL", explanation: dbtiDes["WTIL"].plusDes},
        {mbti: "WTIA", explanation: dbtiDes["WTIA"].plusDes},
        {mbti: "WNIA", explanation: dbtiDes["WNIA"].plusDes},
        {mbti: "WNIL", explanation: dbtiDes["WNIL"].plusDes},
        {mbti: "WTEL", explanation: dbtiDes["WTEL"].plusDes},
        {mbti: "WTEA", explanation: dbtiDes["WTEA"].plusDes},
        {mbti: "WNEA", explanation: dbtiDes["WNEA"].plusDes},
        {mbti: "WNEL", explanation: dbtiDes["WNEL"].plusDes},
        {mbti: "CTEL", explanation: dbtiDes["CTEL"].plusDes},
        {mbti: "CTEA", explanation: dbtiDes["CTEA"].plusDes},
        {mbti: "CNEA", explanation: dbtiDes["CNEA"].plusDes},
        {mbti: "CNEL", explanation: dbtiDes["CNEL"].plusDes},
        {mbti: "CTIA", explanation: dbtiDes["CTIA"].plusDes},
        {mbti: "CTIL", explanation: dbtiDes["CTIL"].plusDes},
        {mbti: "CNIA", explanation: dbtiDes["CNIA"].plusDes},
        {mbti: "CNIL", explanation: dbtiDes["CNIL"].plusDes}
    ];

    const mapRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // 이미지맵
    useEffect(() => {
        if (isLoaded && mapRef.current) {
        ImageMap('img[useMap]');
        }
    }, [isLoaded]);

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    // const [mbti, setMbti] = useState([]);
    const [mbti, setMbti] = useState(dogExContent[10].explanation)
    const [title, setTitle] = useState();
    // const [mbEx, setMbEx] = useState();
    
    const imageClick = (title) => {
        
        const fill = dogExContent.filter(ex => ex.mbti === title);
        setMbti(fill[0].explanation);
        setTitle(fill[0].mbti);
    }

    const DogExBox = () => {
        console.log(mbti)
        if(mbti === null || mbti === ""){
            return <p></p>;
        }
        else{
            return (
                <>
                    <h4>{title} 설명</h4>
                    <div>{mbti.map((it, index) => (
                        <div className="des-box" key={index}>
                            {it}
                        </div>
                    ))}</div>
                </>
            );
        }
    }

    
    return (
        <>
            <div className="result-box">
                <TopNavigation2 />
                <p>MBTI 멍비티아이란?</p>
                <div className="explain-mbti">
                    <h3>MBTI 설명</h3>
                    <p>ㅁㅇㅇㅇㄴsㄻㄹㄴㄹㅇㄴㅁㅁㄴㅇㄹㄴㅇㄻㄹㄴㄹㄴㅁㄴㄹㄴㅁㄴㄹㄴㅇㄹㄴㅁㄹㄴㅇㄻㄴㄹㄴㄹㅇㅇㄻㄴㅇㄻㄴ. DBTI를 눌러서 설명을 읽어보세요</p>
                </div>
                <div className="explain-mbti-detail-box">
                    <img src="assets/image18.png" alt="전체 mbti 설명 표" useMap="#imageMap" onLoad={handleImageLoad}/>
                    {/* 이미지 맵 매칭 코드 */}
                    <map name="imageMap" ref={mapRef}>
                        <area onClick={()=>imageClick('WTIL')} alt="WTIL" title="WTIL" coords="173,183,111,124" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('WTIA')} alt="WTIA" title="WTIA" coords="183,123,241,180" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('WNIA')} alt="WNIA" title="WNIA" coords="253,122,311,180" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('WNIL')} alt="WNIL" title="WNIL" coords="323,121,383,180" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('WTEL')} alt="WTEL" title="WTEL" coords="113,193,172,252" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('WTEA')} alt="WTEA" title="WTEA" coords="183,194,243,251" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('WNEA')} alt="WNEA" title="WNEA" coords="252,193,312,252" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('WNEL')} alt="WNEL" title="WNEL" coords="322,193,382,252" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('CTEL')} alt="CTEL" title="CTEL" coords="114,263,172,323" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('CTEA')} alt="CTEA" title="CTEA" coords="182,262,241,323" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('CNEA')} alt="CNEA" title="CNEA" coords="253,262,312,323" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('CNEL')} alt="CNEL" title="CNEL" coords="322,263,383,322" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('CTIA')} alt="CTIA" title="CTIA" coords="114,333,172,394" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('CTIL')} alt="CTIL" title="CTIL" coords="183,334,242,393" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('CNIA')} alt="CNIA" title="CNIA" coords="254,333,313,393" shape="rect" style={{cursor:"pointer"}}/>
                        <area onClick={()=>imageClick('CNIL')} alt="CNIL" title="CNIL" coords="322,333,384,393" shape="rect" style={{cursor:"pointer"}}/>
                    </map>

                    {/* 간략표 */}
                    <img src="assets/1 5.png" alt="전체 mbti 간략 설명 표"/>
                    <div className="explain-mbti-detail">
                        {DogExBox()}
                    </div>                    
                </div>
                <div className="explain-back-btn">
                    <button onClick={goBack}>back</button>
                </div>
            </div>
        </>
    )
    
};

export default DogExplanation;