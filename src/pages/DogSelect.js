import React from 'react';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopNavigation from '../components/TopNavigation';

let curPos = 0;
let postion = 0;
let start_x, end_x;
const IMAGE_WIDTH = 220;
const images = document.querySelector(".img-box") 
 
// images.addEventListener('touchstart', touch_start);
// images.addEventListener('touchend', touch_end);
 
function prev(){
  if(curPos > 0){
    postion += IMAGE_WIDTH;
    images.style.transform = `translateX(${postion}px)`;
    curPos = curPos - 1;
  }
}
function next(){
  if(curPos < 3){
    postion -= IMAGE_WIDTH;
    images.style.transform = `translateX(${postion}px)`;
    curPos = curPos + 1;
  }
}
 
function touch_start(event) {
  start_x = event.touches[0].pageX
}
 
function touch_end(event) {
  end_x = event.changedTouches[0].pageX;
  if(start_x > end_x){
    next();
  }else{
    prev();
  }
}


const DogList = (props) => {
    return (
        <li className='img-box' onTouchStart={touch_start} onTouchEnd={touch_end} num={props.num} name={props.name}>
            <a>
                <img src=''/>
            </a>
            <span className="material-symbols-outlined">add_circle</span>
        </li>
    )
}

const DogSelect = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [dogList, setDogList] = useState(null);
    let dNumList;
    let dNameList;
    let dogInfoList;

    if(location.state === null){
        console.log("강아지없다.");
        alert("강아지 등록을 먼저 해주세요!");
        navigate(`/DogInfo`);
    }
    else{
        dogInfoList = location.state;
        dNumList = Object.keys(dogInfoList);
        dNameList = Object.values(dogInfoList);

        const getEntries = Object.entries(dogInfoList).map((entrie, idx) => {
            return console.log(entrie, idx);
        });

        const List = () => { 
            return getEntries.map((v) => (<DogList num={v[0]} name={v[1]}/>));
        };
        console.log(<List/>);
        return (
            <>
                <TopNavigation />
                <div className="dog-select-warp">
                    <div className="dog-select-list">
                        <p>MBTI를 검사할 우리 아이를 선택해주세요.</p>
                        <ul>                        
                            <li className='img-box' onTouchStart={touch_start} onTouchEnd={touch_end}>
                                <a>
                                    <img src=''/>
                                </a>
                                <span className="material-symbols-outlined">add_circle</span>
                            </li>
                            <li className='img-box' onTouchStart={touch_start} onTouchEnd={touch_end}>
                                <a>
                                    <img src=''/>
                                </a>
                                <span className="material-symbols-outlined">add_circle</span>
                            </li>                        
                        </ul>
                    </div>
                    <div className="dog-menu-list">
                        <ul>
                            <li className="dbti-link">
                                <a>MBTI 분석하기</a>
                                <span className="material-symbols-outlined">arrow_forward_ios</span>
                            </li>
                            <p>4가지 분석 기준에 따라 분류되어 있어요.</p>
                            <li className="dog-show-link">
                                <a>반려견 자랑하기</a>
                                <span className="material-symbols-outlined">arrow_forward_ios</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
   
}

export default DogSelect;