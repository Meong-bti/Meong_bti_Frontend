import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import MyInput from "../components/MyInput";

const DogTypeList = ["리트리버", "말라뮤트", "진돗개", "보더콜리", "웰시코기"];

const DogInfo = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [dogType, setDogType] = useState("견종");

  const [dogInfo, setDogInfo] = useState({
    defaultInfo: {
      name: "",
      d_type: "",
    },
    detailInfo: {
      birth: "",
      sex: "",
      ntlz: "",
      weight: 0,
    },
    dogImage: "",
  });

  const clickNextButton = () => {
    const valueList = document.getElementsByClassName("input-value");
    console.log(valueList);
  };

  const DogInfoBox = () => {
    if (step === 1) {
      return (
        <>
          <div className="main">
            <div className="input-box">
              <MyInput type="text" name="d_name" text="이름" />
            </div>
            <div className="input-box">
              <div className="select-wrapper">
                <select name="dogType" className="d-type-box">
                  <option value="" disabled hidden selected>
                    견종
                  </option>
                  {DogTypeList.map((it, index) => (
                    <option key={index} value={it}>
                      {it}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="btn-wrapper">
            <MyButton
              text="다음으로"
              onClick={() => {
                setDogInfo({
                  ...dogInfo,
                  defaultInfo: {
                    name: "a",
                    d_type: "b",
                  },
                });
                setStep(2);
              }}
            />
          </div>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <div className="main">
            <div className="input-title">생년월일</div>
            <div className="input-box text-left">
              <MyInput type="number" name="d_birth_year" text="년" />
              <MyInput type="number" name="d_birth_month" text="월" />
              <MyInput type="number" name="d_birth_day" text="일" />
            </div>
            <div className="input-title">성별</div>
            <div className="input-box">
              <MyInput type="radio" name="d_sex" value="Man" text="남아" />
              <MyInput type="radio" name="d_sex" value="Woman" text="여아" />
            </div>
            <div className="input-title">중성화 수술 여부</div>
            <div className="input-box">
              <MyInput type="radio" name="d_ntlz" value="True" text="유" />
              <MyInput type="radio" name="d_ntlz" value="False" text="무" />
            </div>
            <div className="input-title">몸무게</div>
            <div className="input-box">
              <div className="weight-box">
                <MyInput type="number" name="d_weight_int" text={"00"} />
                <div className="weight-text" style={{ fontSize: "30px" }}>
                  .
                </div>
                <MyInput type="number" name="d_weight_deci" text={"00"} />
                <div className="weight-text">kg</div>
              </div>
            </div>
          </div>
          <div className="btn-wrapper">
            <MyButton
              text="다음으로"
              onClick={() => {
                setDogInfo({
                  ...dogInfo,
                  detailInfo: {
                    birth: "19991128",
                    sex: "male",
                    ntlz: "true",
                    weight: 12.37,
                  },
                });
                setStep(3);
              }}
            />
          </div>
        </>
      );
    } else if (step === 3) {
      return (
        <>
          <div className="main">
            {dogInfo.defaultInfo.name}
            <br />
            {dogInfo.defaultInfo.d_type}
            <br />
            {dogInfo.detailInfo.birth}
            <br />
            {dogInfo.detailInfo.sex}
            <br />
            {dogInfo.detailInfo.ntlz}
            <br />
            {dogInfo.detailInfo.weight}
            <br />
          </div>
          <div className="btn-wrapper">
            <MyButton
              text="완료"
              onClick={() => {
                navigate("/question");
              }}
            />
          </div>
        </>
      );
    } else {
    }
  };

  return (
    <div className="dog-info">
      <MyHeader />
      {DogInfoBox()}
    </div>
  );
};

export default DogInfo;
