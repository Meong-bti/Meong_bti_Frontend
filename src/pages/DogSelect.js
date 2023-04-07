import React, {useEffect} from 'react';
// import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopNavigation from '../components/TopNavigation';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const DogSelect = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {state} = useLocation();
    // const [dogList, setDogList] = useState(null);

    // 메뉴 이동 navigater
    const goDogAdd = () => {
        navigate('/doginfo');
    };
    const goMbti = () => {
        navigate('/Question');
    };
    
    // 이미지 에러시 띄워줄 기본 이미지
    const handleImgError = (e) => {
        e.target.src = "assets/dog.jpg";
    };

    // 강아지 정보 있는지 확인
    useEffect(() => {
        if(state === null || state.length === 0){
            console.log("강아지없다.");
            alert("강아지 등록을 먼저 해주세요!");
            navigate('/doginfo');
        }
    }, [state, navigate]);

    // 강아지 정보 있을 때 이미지 슬라이드 추가
    const dogInfoList = location.state;

    // 강아지 정보 로케이션
    const goBoast = () => {
        navigate('/DogBoast', {
                state: dogInfoList,
            }
        );
    };

    // 있는 강아지 등록 정보 리스트
    const dogArr = dogInfoList.map((item) => {
        return <SwiperSlide key={item.idx} className="dog-slide">
                    <img src={item.url} 
                        alt={item.name} 
                        onError={handleImgError}/>
                    <span className='dog-name'>{item.name}</span>
            </SwiperSlide>;
    });  

    return (
        <>
            {/* 탑 네비 */}
            <TopNavigation />

            {/* 중간 컨텐츠 */}
            <div className="dog-select-warp">
                <div className="dog-select-list">
                    <p>MBTI를 검사할 우리 아이를 선택해주세요.</p>
                
                {/* 이미지 슬라이드 */}
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={25}
                            //간격
                        slidesPerView={1.5}
                            //보여질 컨텐츠 수
                        scrollbar={{ draggable: true }}
                            //드래그
                        className="dog-select-list"
                        >

                        {/* 기존에 있는 강아지 리스트 */}
                        {dogArr} 

                        {/* 새로 추가할 강아지 리스트 */}
                        <SwiperSlide className='new-dog-slide' onClick={goDogAdd}><div><span className="material-symbols-outlined">add_circle</span></div></SwiperSlide> 
                    </Swiper>
                </div>
                <div className="dog-menu-list">
                    <ul>
                        <li className="dbti-link" onClick={goMbti}>
                            <button>MBTI 분석하기</button>
                            <span className="material-symbols-outlined">arrow_forward_ios</span>
                        </li>
                        <p>4가지 분석 기준에 따라 분류되어 있어요.</p>
                        <li className="dog-show-link" onClick={goBoast}>
                            <button>반려견 자랑하기</button>
                            <span className="material-symbols-outlined">arrow_forward_ios</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
   
}

export default DogSelect;