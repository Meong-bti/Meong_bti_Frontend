import QuestionBox from "../components/QuestionBox";
import TopNavigation from "../components/TopNavigation";
import MyButton from "../components/MyButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const navigate = useNavigate();

  const questListBox = {
    ques1: [
      "우리 반려견은 자기가 사람인 줄 안다",
      "다른 개와 잘 어울린다",
      "반려견이 싫어하는 행동을 계속 하면 물려고 한다",
      "다른 강아지를 만나면 보호자 뒤로 숨으려고 한다",
      "우리 집에 다른 강아지가 올 수 있다",
      "어떤 낯선 곳에 가더라도 겁먹지 않고 냄새를 맡으면 탐색하다",
      "나의 반려견을 누구나 만질 수 있다",
      "다른 개와 장난감을 공유한다",
      "간식을 손에 쥐고 있으면 흥분한다",
      "사람들을 보면 줄당김이 심하다",
      "낯선 환경에서 부르면 간식이 있을 때만 온다",
      "다른 개와 놀고 있을 때 부르면 모른 척 한다",
      "보호자나 다른 개와 터그놀이를 한다",
      "냄새를 맡고 있을 때 불러도 계속 냄새를 맡는다",
      "마운팅을 자주 한다",
    ],
    ques2: [
      "다른 강아지와 놀 때 먼저 놀자고 하거나 함께 뛰어다니며 노는 편이다",
      "보호자 옆에만 있는다 / 졸졸졸 따라다닌다",
      "땅에 떨어져 있는 음식을 주워 먹는다",
      "다른 강아지가 냄새를 맡으려고 하면 차분히 맡게 해준다",
      "잠 잘때 건드리면 다른 장소로 이동한다",
      "낯선 장소에서는 아무것도 먹지 않는다",
      "혼자 장난감을 가지고 노는 것을 좋아한다",
      "놀이에 쉽게 싫증낸다",
      "자극에 쉽게 흥분한다",
      "외부에서 마킹을 많이 한다",
      "다른 강아지를 만나면 무조건 냄새를 맡으려고 한다",
      "장난감을 던지면 반응이 없다",
      "차 안에서 바깥을 보고 짖는다",
      "야외에서 반려견을 잠시 묶어놓으면 차분하게 기다린다",
      "간식을 받으면 이동해서 먹는다",
    ],
    ques3: [
      "이름을 부르면 온다",
      "반려견 혼자 못 있는다",
      "위협을 받았을 때 맞서 싸우려고 한다",
      "집 안에서 엎드리는 장소가 정해져 있다",
      "손님이 오면 경계 또는 공격한다",
      "움직이는 물체를 보고 달려든다(오토바이, 자전거, 고양이 등)",
      "낯선 장소에서도 쉽게 엎드린다",
      "나는 내 반려견을 컨트롤 할 수 있다",
      "먹이, 간식이나 장난감을 지킨다",
      "나를 귀찮게 한다",
      "차 안에서 혼자 못 앉아있는다",
      "문이 열리면 혼자 나간다",
      "다른 개에게 정면으로 다가간다",
      "우리 강아지는 개를 싫어하는 편이다",
      "소파나 침대 위에 자주 올라가 있는다",
    ],
    ques4: [
      "반려견 앞에서 다른 개에게 간식을 줄 수 있다",
      "다른 사람이 만져 주는 것을 좋아한다",
      "내 반려견은 잘 안 짖는 편이다",
      "다른 개를 보면 줄당김이 심하다",
      "다른 개에게 뽀뽀를 많이 한다",
      "간식이 없으면 기다려가 전혀 안 된다",
      "집에 사람이 오면 너무 반긴다(희뇨, 껑충껑충, 빙글빙글, 멍멍 등)",
      "어딜 가든 대소변을 잘 본다",
      "내 반려견은 낯선 장소에서도 활기차고 항상 움직이는 편이다",
      "놀이에 냉담하거나 무심하다",
      "내 반려견이 다른 반려견 앞에서 배를 자주 드러내는 편이다",
      "애견 카페나 운동장에서 혼자 돌아다니며 논다",
      "산책할 때 낯선 사람에게 공격적인 모습을 보인다(조깅하는 사람, 어린이, 노인 등)",
      "산책할 때 매우 흥분을 한다",
      "낯선 사람이 주는 간식을 먹지 않는다",
    ],
  };

  const [questList, setQuestList] = useState(questListBox.ques1);
  const [step, setStep] = useState(1);
  const [percent, setPercent] = useState(0);
  const [score, setScore] = useState({
    step1: 0,
    step2: 0,
    step3: 0,
    step4: 0,
  })
  // const [state, setState] = useState("question");

  const percentIncrease = (num) => {
    if (num % 3 === 0) {
      setPercent((percent) => percent + 6);
    } else {
      setPercent((percent) => percent + 7);
    }
  };

  useEffect(() => {
    // 진행 퍼센트 바
    const charge_bar = document.getElementById("charging");
    charge_bar.style.width = `${percent}%`;
  }, [percent]);

  useEffect(() => {
    if (step === 5) {
      navigate("/DogMbtiResult", {
        state: {
          step1: score.step1,
          step2: score.step2,
          step3: score.step3,
          step4: score.step4,
      }});
    }
  }, [step]);

  useEffect(() => {
    // 체크된 요소 점수 합산
    const elements = document.querySelectorAll("input:checked");
    var stepScore = 0;
    elements.forEach((it) => {
      stepScore = stepScore + parseInt(it.getAttribute("value"));
    });

    // 해당 스텝에 점수 부여
    if (step >= 2){
      setScore((score) =>
        ({ ...score, [`step${step-1}`]: Math.round((stepScore+45)/90*100) })
      );
    }
    
    // 마지막 스텝일 경우 결과페이지로~
    if (step === 5) {
      // setState("result");
      return;
    }

    setQuestList(questListBox[`ques${step}`]);
    setPercent(0);

    // 질문 세팅 초기화 -> 체크 된거 해제 및 선택 불가 활성화
    const allElement = document.getElementsByClassName("check-element");
    for (var i = 0; i < allElement.length; i++) {
      allElement[i].checked = false;
      allElement[i].disabled = true;
    }

    // 첫 질문은 선택 가능하도록 세팅 및 페이지 제일 위로 이동
    const firstElement = document.getElementById(`box0`);
    firstElement.style.opacity = 1;
    window.scrollTo(0, 0);
    document
      .getElementsByName(`question0`)
      .forEach((it) => it.removeAttribute("disabled"));
  }, [step]);

  const NextButton = () => {
    if (percent !== 100) {
      return (
        <MyButton
          type="incomplete"
          text="위 문항의 응답을 완료해주세요."
          disabled={true}
        />
      );
    } else {
      return (
        <MyButton type="question-next" onClick={() => setStep(step + 1)} />
      );
    }
  };

  // prettier-ignore
  return (
    <div className="question">
      <TopNavigation style={{}} />
      <div className="process-bar">
        <div className="percent">{percent}%</div>
        <div className="bar">
          <div className="charge-bar" id="charging" />
        </div>
        <div className="step">{step}/4</div>
      </div>
      {questList.map((it, index) => (
        <QuestionBox
          key={index}
          num={index}
          text={it}
          percentIncrease={percentIncrease}
          step={step}
        />
      ))}
      <div className="btn-wrapper">
        {/* <MyButton type="question-next" onClick={() => setStep(step + 1)} /> */}
        <NextButton />
      </div>
    </div>
  );
};

export default Question;
