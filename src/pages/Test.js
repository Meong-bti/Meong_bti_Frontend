import MyButton from "../components/MyButton";

import QuestionBox from "../components/QuestionBox";

const Test = () => {
  return (
    <div>
      <QuestionBox />
      <div className="test_wrapper">
        <MyButton type={"arrow"} text="MBTI 분석하기" />
        
      </div>
    </div>
  );
};

export default Test;
