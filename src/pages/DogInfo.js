import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import MyRadio from "../components/MyRadio";

const petBreedList = ["리트리버", "말라뮤트", "진돗개", "보더콜리", "웰시코기"];

const DogInfo = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [petInfo, setPetInfo] = useState({
    petName: "",
    petBreed: "",
    petBirthYear: "",
    petBirthMonth: "",
    petBirthDay: "",
    petGender: "",
    petNtlz: "",
    petWeightInt: 0,
    petWeightDeci: 0,
    petImage: "",
  });

  const clickNextButton = () => {
    var checkState = 0
    const inputValueList = Array.from(
      document.getElementsByClassName("input-value")
    );
   
    for (var i = 0; i < inputValueList.length; i++){
      var it = inputValueList[i];
      if (it.value === "" || it.value === "견종") {
        return;
      } else if (it.checked && it.type === "radio") {
        checkState += 1;
      }
    };
    
    if (checkState <= 1 && step === 2) return;
    
    inputValueList.map((it) => {
      if (it.checked || it.type !== "radio") {
        setPetInfo((petInfo) => ({ ...petInfo, [it.name]: it.value }));
      }
    });
    setStep(step + 1);
  };

  const PetInfoBox = () => {
    if (step === 1) {
      return (
        <>
          <div className="main">
            <div className="input-box">
              <input className="input input-value" type="text" name="petName" placeholder="이름" />
            </div>
            <div className="input-box">
              <div className="select-wrapper">
                <select
                  name="petBreed" className="pet-breed-box input-value" defaultValue="견종"
                  onChange={(e) => e.target.style.color = "black"}
                >
                  <option value="견종" disabled hidden>견종</option>
                  {petBreedList.map((it, index) => (
                    <option key={index} value={it}>{it}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="btn-wrapper">
            <MyButton text="다음으로" onClick={clickNextButton} />
          </div>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <div className="main">
            <div className="input-title">생년월일</div>
            <div className="input-box text-left">
              <input className="input input-value" type="number" name="petBirthYear" placeholder="년"/>
              <input className="input input-value" type="number" name="petBirthMonth" placeholder="월" />
              <input className="input input-value" type="number" name="petBirthDay" placeholder="일" />
            </div>
            <div className="input-title">성별</div>
            <div className="input-box">
              <MyRadio type="radio" name="petGender" value="Male" text="남아" />
              <MyRadio type="radio" name="petGender" value="Female" text="여아" />
            </div>
            <div className="input-title">중성화 수술 여부</div>
            <div className="input-box">
              <MyRadio type="radio" name="petNtlz" value="Ntlz" text="유" />
              <MyRadio type="radio" name="petNtlz" value="None" text="무" />
            </div>
            <div className="input-title">몸무게</div>
            <div className="input-box">
              <div className="weight-box">
                <input className="input input-value" type="number" name="petWeightInt" placeholder={"00"} />
                <div className="weight-text" style={{ fontSize: "30px" }}>
                  .
                </div>
                <input className="input input-value" type="number" name="petWeightDeci" defaultValue={0} />
                <div className="weight-text">kg</div>
              </div>
            </div>
          </div>
          <div className="btn-wrapper">
            <MyButton
              text="다음으로"
              onClick={clickNextButton}
            />
          </div>
        </>
      );
    } else if (step === 3) {
      return (
        <>
          <div className="main">
            {petInfo.petName}
            <br />
            {petInfo.petBreed}
            <br />
            {petInfo.petBirthYear}
            <br />
            {petInfo.petBirthMonth}
            <br />
            {petInfo.petBirthDay}
            <br />
            {petInfo.petGender}
            <br />
            {petInfo.petNtlz}
            <br />
            {petInfo.petWeightInt}
            <br />
            {petInfo.petWeightDeci}
            <br />
          </div>
          <div className="btn-wrapper">
            <MyButton
              text="완료"
              onClick={() => {
                console.log(petInfo);
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
    <div className="pet-info">
      <MyHeader />
      <PetInfoBox />
    </div>
  );
};

export default DogInfo;
