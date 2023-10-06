import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Page.css";

import { useAuth0 } from "@auth0/auth0-react";

function Page(props) {
  const apiData = props.apiData;
  const [count, setCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { loginWithRedirect } = useAuth0();
  const [timeRemaining, setTimeRemaining] = useState(150); // 3600 seconds = 1 hour

  const pull_data = (data) => {
    setCount(count + data);
  };

  const submitHandler = () => {
    setShowResults(true);
  };

  useEffect(() => {
    
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        clearInterval(timer);
        submitHandler(); // Automatically submit the test when the time is up
      }
    }, 1000); // Update the timer every 1 second

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, [timeRemaining]);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full  p-4 shadow-md z-50 bg-[#e6cc07] ">
        <div className="flex justify-between items-center ">
          <button className="button-56" role="button" onClick={submitHandler}>
            END
          </button>
        
          <div className="timer">
            Time Remaining: {Math.floor(timeRemaining / 60)}:
            {(timeRemaining % 60).toString().padStart(2, "0")} minutes
          </div>
          <h1 className="text-6xl text-white font-semibold absolute left-[620px]">Quiz App</h1>
          <button className="button-6" role="button" onClick={submitHandler}>
            Log in
          </button>
        </div>
      </div>

      <div className="pt-20"> {/* Add padding-top to push content below the fixed header */}
        {!showResults ? (
          <div className="flex flex-wrap w-[11/12] gap-10">
            {apiData.map((element, index) => (
              <div key={index}>
                <Card
                  func={pull_data}
                  index={index}
                  question={element.question}
                  category={element.category}
                  difficulty={element.difficulty}
                  correct_answer={element.correct_answer}
                  incorrect_answers={element.incorrect_answers}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex text-[40px] text-[#d8b8b8] justify-center items-center">
            Percentage: {((count / apiData.length) * 100).toFixed(2)}%
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;

