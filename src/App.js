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
import './css/Reset.css';
import './css/Home.css';
import './css/TopNavigation.css';
import './css/DogSelect.css';
import './css/DogMbtiResult.css';
import './css/TopNavigation2.css';
import './css/DogExplanation.css';


import { BrowserRouter, Route, Routes } from "react-router-dom";

import Test from "./pages/Test";
import APILogin from "./pages/APILogin";
import EmailLogin from "./pages/EmailLogin";
import Question from "./pages/Question";
import DogInfo from "./pages/DogInfo";
import Transition from "./components/Transition";
import Result from "./pages/Result";
import Home from "./pages/Home.js";
import DogSelect from "./pages/DogSelect.js";
import DogPost from "./pages/DogPost";
import DogMbtiResult from './pages/DogMbtiResult.js';
import DogExplanation from './pages/DogExplanation.js';

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
          <Route path="/DogSelect" element={<DogSelect />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/DogMbtiResult" element={<DogMbtiResult />} />
          <Route path="/DogExplanation" element={<DogExplanation />} />
          <Route path="/dogpost" element={<DogPost />} />
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
