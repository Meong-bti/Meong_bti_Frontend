import { useLocation } from 'react-router-dom'

const Result = () => {
  const location = useLocation();
  
  return <div className="Result">
    {location.state.step1}<br />
    {location.state.step2}<br />
    {location.state.step3}<br />
    {location.state.step4}<br />
  </div>;
};

export default Result;
