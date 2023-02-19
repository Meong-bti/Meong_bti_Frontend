import "./App.css";
import "./css/MyHeader.css";
import "./css/APILogin.css";
import "./css/EmailLogin.css";
import "./css/MyButton.css";
import "./css/Question.css";
import "./css/PageAnimation.css";
import "./css/QuestionBox.css";
import "./css/MyInput.css";
import "./css/DogInfo.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Test from "./pages/Test";
import APILogin from "./pages/APILogin";
import EmailLogin from "./pages/EmailLogin";
import Question from "./pages/Question";
import DogInfo from "./pages/DogInfo";
import Transition from "./components/Transition";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<APILogin />} />
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<EmailLogin />} />
          <Route path="/question" element={<Question />} />
          <Route path="/doginfo" element={<DogInfo />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </BrowserRouter>
    // <BrowserRouter>
    //   <div className="App">
    //     <Transition />
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
