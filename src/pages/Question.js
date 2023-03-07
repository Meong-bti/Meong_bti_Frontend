import QuestionBox from "../components/QuestionBox";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const navigate = useNavigate();

  const questListBox = {
    ques1: [
      "우리 반려견은 자기가 사람인 줄 안다",
      "우리 반려견은 자기가 사람인 줄 안다",
      "우리 반려견은 자기가 사람인 줄 안다",
      "우리 반려견은 자기가 사람인 줄 안다",
      "우리 반려견은 자기가 사람인 줄 안다",
      "우리 반려견은 자기가 사람인 줄 안다",
      "우리 반려견은 자기가 사람인 줄 안다",
      "우리 반려견은 자기가 사람인 줄 안다",
      "우리 반려견은 자기가 사람인 줄 안다",
      "우리 반려견은 자기가 사람인 줄 안다",
      "우리 반려견은 자기가 사람인 줄 안다",
      "우리 반려견은 자기가 사람인 줄 안다",
      "우리 반려견은 자기가 사람인 줄 안다",
      "우리 반려견은 자기가 사람인 줄 안다",
      "우리 반려견은 자기가 사람인 줄 안다",
    ],
    ques2: [
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
    ],
    ques3: [
      "간식을 너무 좋아한다",
      "간식을 너무 좋아한다",
      "간식을 너무 좋아한다",
      "간식을 너무 좋아한다",
      "간식을 너무 좋아한다",
      "간식을 너무 좋아한다",
      "간식을 너무 좋아한다",
      "간식을 너무 좋아한다",
      "간식을 너무 좋아한다",
      "간식을 너무 좋아한다",
      "간식을 너무 좋아한다",
      "간식을 너무 좋아한다",
      "간식을 너무 좋아한다",
      "간식을 너무 좋아한다",
      "간식을 너무 좋아한다",
    ],
    ques4: [
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
      "다른 개와 잘 어울린다",
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
  const [state, setState] = useState("question");

  const percentIncrease = (num) => {
    if (num % 3 === 0) {
      setPercent((percent) => percent + 6);
    } else {
      setPercent((percent) => percent + 7);
    }
  };

  useEffect(() => {
    const charge_bar = document.getElementById("charging");
    charge_bar.style.width = `${percent}%`;
  }, [percent]);

  useEffect(() => {
    if (step === 5) {
      navigate("/result", {
        state: {
          step1: score.step1,
          step2: score.step2,
          step3: score.step3,
          step4: score.step4,
      }});
    }
  }, [state]);

  useEffect(() => {
    const elements = document.querySelectorAll("input:checked");
    var stepScore = 0;
    elements.forEach((it) => {
      stepScore = stepScore + parseInt(it.getAttribute("value"));
    });

    if (step >= 2){
      setScore((score) =>
        ({ ...score, [`step${step-1}`]: Math.round((stepScore+45)/90*100) })
      );
    }
    

    if (step === 5) {
      setState("result");
      
      return;
    }

    setQuestList(questListBox[`ques${step}`]);
    setPercent(0);

    const allElement = document.getElementsByClassName("check-element");
    for (var i = 0; i < allElement.length; i++) {
      allElement[i].checked = false;
      allElement[i].disabled = true;
    }

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
      <MyHeader />
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
