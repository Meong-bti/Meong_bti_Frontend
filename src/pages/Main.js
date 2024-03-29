import React, { useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import TopNavigation from '../components/TopNavigation';
import { PetContext } from '../App';
import { AuthContext } from '../components/AuthContext';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { getPet } from '../api/pet';

const Main = () => {
  const navigate = useNavigate();
  const { login, loginUpdate } = useContext(AuthContext);
  const { petList, setPetList } = useContext(PetContext);
  const [loaded, setLoaded] = useState(false);
  const [dogArr, setDogArr] = useState([]);

  // 페이지 이동 navigater
  const goDogAdd = () => {
    navigate('/doginfo');
  };
  const goMbti = () => {
    navigate('/DogSelect');
  };

  const goPost = () => {
    navigate('/dogpost');
  };

  const goPetDetail = (petId) => {
    navigate('/dogdetail', {
      state: petId
    });
  }

  // 이미지 에러시 띄워줄 기본 이미지
  const handleImgError = (e) => {
    e.target.src = "assets/dog.jpg";
  };

  useEffect(() => {
    loginUpdate();
    if (!login) {
      navigate('/');
    }
  }, [login, navigate])

  // 강아지 정보 불러오기
  useEffect(() => {
    if (loaded === false) {
      getPet({setPetList, loginUpdate, navigate, setLoaded});
      setLoaded(true);
    }
  }, [navigate, loaded]);

  useEffect(() => {
    if (loaded) {
      if (petList === null || petList.length === 0) {
        alert("등록된 강아지가 없습니다. 강아지 등록을 먼저 해주세요!");
        navigate('/doginfo');
      } else {
        const updatedDogArr = petList.map((item) => (
          <SwiperSlide key={item.idx} className="dog-slide">
            <img
              src={item.src}
              alt="펫이미지"
              onError={handleImgError}
            />
            <button className="dog-info-btn" onClick={() => goPetDetail(item.idx)}>
              펫 정보
            </button>
          </SwiperSlide>
        ));
        setDogArr(updatedDogArr);
      }
    }
  }, [petList]);
  
  return (
    <>
      <TopNavigation />
      <div className="dog-list-box">
        <div className="dog-img-list">
          <p>MBTI를 검사할 우리 아이를 선택해주세요.</p>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            // spaceBetween={5} slidesPerView={1.5} //간격, 보여질 컨텐츠 수
            slidesPerView={1.5} //간격, 보여질 컨텐츠 수
            scrollbar={{ draggable: true }} className="dog-swiper-list" //드래그
          >
            {/* 강아지 리스트 및 추가하기 박스 */}
            {dogArr} 
            <SwiperSlide className='add-dog-box' onClick={goDogAdd}><div><span className="material-symbols-outlined">add_circle</span></div></SwiperSlide> 
          </Swiper>
        </div>
        <div className="dog-menu-list">
          <ul>
            <li className="dbti-link" onClick={goMbti}>
              <button>MBTI 분석하기</button>
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            </li>
            <p>4가지 분석 기준에 따라 분류되어 있어요.</p>
            <li className="dog-show-link" onClick={goPost}>
              <button>반려견 자랑하기</button>
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
   
}

export default Main;