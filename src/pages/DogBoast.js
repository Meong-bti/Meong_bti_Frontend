import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import TopNavigation from '../components/TopNavigation';


const DogBoast = () => {

    const [page, setPage] = useState(1);
    const {state} = useLocation();
    const navigate = useNavigate();
    const location = useLocation();
    const [imageSrc, setImageSrc] = useState('');

    // 강아지 정보 있는지 확인
    useEffect(() => {
        if(state === null || state.length === 0){
            console.log("강아지없다.");
            alert("강아지 등록을 먼저 해주세요!");
            navigate('/doginfo');
        }
    }, [state, navigate]);

    // 이미지 에러시 띄워줄 기본 이미지
    const handleImgError = (e) => {
        e.target.src = "assets/dog.jpg";
    };

    // 있는 강아지 리스트
    const dogInfoList = location.state;

    const dogArr = dogInfoList.map((item) => {
        return <li key={item.idx} className="dog-slide">
                    <img src={item.url} 
                        alt={item.name} 
                        onError={handleImgError}/>
                    <span className='dog-name'>{item.name}</span>
                </li>;
    });  

    if(page === 1){
        return (
            <>
                {/* 탑 네비 */}
                <TopNavigation />
                {/* 자랑할 강아지 선택 */}
                <div className="dog-select-warp boat-box">
                <p><span className="material-symbols-outlined">expand_more</span>자랑하고 싶은 아이를 선택해주세요.</p>
                    <ul className='boast-list'>
                        {dogArr}
                        <li>
                            <div><span className="material-symbols-outlined">add_circle</span></div>
                        </li>
                    </ul>
                    <div className="dog-select-btn">
                        <button onClick={() => setPage(2)}>선택</button>
                    </div>
                </div>
            </>
        );
    }
    else{

        const encodeFileToBase64 = (fileBlob) => {
            const reader = new FileReader();
            reader.readAsDataURL(fileBlob);
            return new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc(reader.result);
                resolve();
            };
            });
        };

        return (
            <>
                {/* 탑 네비 */}
                <TopNavigation />
                {/* 전송 폼 */}
                <form className='boast-form'> 
                    <div className='img-box'>
                        <div className='boast-img'>
                            {imageSrc !== '' ? imageSrc && <img src={imageSrc} alt="preview-img" />:<span className="material-symbols-outlined">add_circle</span>}
                        </div>
                        <label className="profile-label" htmlFor="profileImg">사진 추가</label>
                        <input
                        className="profile-input"
                        type="file"
                        accept="image/*"
                        id="profileImg"
                        onChange={(e) => {
                            encodeFileToBase64(e.target.files[0]);
                          }} 
                        />
                    </div>
                    <div className='boast-content'>
                        <img src='assets/rrrr_2.png' alt='발바닥모양'/>
                        <textarea placeholder='50자 이내로 작성해주세요.'></textarea>
                    </div>
                    <div className='boast-submit dog-select-btn'>
                        <button>자랑하기</button>
                    </div>
                </form>
            </>
        );
    }
   
}

export default DogBoast;