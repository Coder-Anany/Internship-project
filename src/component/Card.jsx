
// import React, { useState, useEffect } from "react";
// import "./Card.css"; // Import your CSS file
// import { toast } from "react-toastify";

// function shuffleArray(array) {
//   const shuffledArray = [...array];
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//   }
//   return shuffledArray;
// }


// function Card(props) {
//   const { question, index, correct_answer, incorrect_answers } = props;
//   const [shuffledAnswers, setShuffledAnswers] = useState([]);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [count, setCount] = useState(0);
//   const [isAnswered, setIsAnswered] = useState(false);
  

//   useEffect(() => {
//     const allAnswers = [...incorrect_answers, correct_answer];
//     const shuffled = shuffleArray(allAnswers);
//     setShuffledAnswers(shuffled);
//   }, [correct_answer, incorrect_answers]);

//   function changeHandler(event) {
//     toast("Selected");
//     if (!isAnswered) {
//       setSelectedAnswer(event.target.value);
//       if (event.target.value === correct_answer) {
//         setCount(count+1);
//       }
//       setIsAnswered(true);
//     }
//   }
  
//   props.func(count);

//   return (
//     <div className="card-container w-[400px] break-normal">
//       <fieldset>
//         <legend className="text-xl font-semibold">
//           Question {index + 1}:
//         </legend>
//         <div className="mt-4">
//           <p className="text-lg">
//             <span className="question-number">Q{index + 1}:</span>{" "}
//             <span className="question-text">{question}</span>
//           </p>
//         </div>
//         <div className="mt-6">
//           {shuffledAnswers.map((ans, ansIndex) => (
//             <label
//               key={ansIndex}
//               className={`block mb-2 ${
//                 selectedAnswer === ans
//                   ? "selected-option" // Apply selected option class
//                   : "unselected-option" // Apply unselected option class
//               }`}
//             >
//               <input
//                 type="radio"
//                 value={ans}
//                 name={`question_${index}_answer`}
//                 checked={selectedAnswer === ans}
//                 onChange={changeHandler}
//                 className="mr-2"
//                 disabled={isAnswered}
//               />
//               {ans}
//             </label>
//           ))}
//         </div>
//       </fieldset>
//       {selectedAnswer !== null && (
//         <div className="mt-4">
//           {selectedAnswer === correct_answer ? (
//             <p className="text-green-500 font-semibold">
//               Correct! The answer is {correct_answer}.
//             </p>
//           ) : (
//             <p className="text-red-500 font-semibold">
//               Incorrect. The correct answer is {correct_answer}.
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Card;


import React, { useState, useEffect } from "react";
import "./Card.css"; // Import your CSS file
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";



function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function Card(props) {
  const { question, index, correct_answer, incorrect_answers } = props;
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [count, setCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    const allAnswers = [...incorrect_answers, correct_answer];
    const shuffled = shuffleArray(allAnswers);
    setShuffledAnswers(shuffled);
  }, [correct_answer, incorrect_answers]);

  function changeHandler(event) {
    toast("Selected");
    if (!isAnswered) {
      setSelectedAnswer(event.target.value);
      if (event.target.value === correct_answer) {
        setCount(count + 1);
      }
      setIsAnswered(true);
    }
  }

  props.func(count);

  return (
    <div className="card-container w-[400px] break-normal overflow-hidden">
      <button onClick={() => loginWithRedirect()}>Log In</button>;
      <fieldset>
        <legend className="text-xl font-semibold">
          Question {index + 1}:
        </legend>
        <div className="mt-4 break-words">
          <p className="text-lg">
            <span className="question-number">Q{index + 1}:</span>{" "}
            <span className="question-text">{question}</span>
          </p>
        </div>
        <div className="mt-6">
          {shuffledAnswers.map((ans, ansIndex) => (
            <label
              key={ansIndex}
              className={`block mb-2 ${
                selectedAnswer === ans
                  ? "selected-option" // Apply selected option class
                  : "unselected-option" // Apply unselected option class
              } break-words`}
            >
              <input
                type="radio"
                value={ans}
                name={`question_${index}_answer`}
                checked={selectedAnswer === ans}
                onChange={changeHandler}
                className="mr-2"
                disabled={isAnswered}
              />
              {ans}
            </label>
          ))}
        </div>
      </fieldset>
      {selectedAnswer !== null && (
        <div className="mt-4">
          {selectedAnswer === correct_answer ? (
            <p className="text-green-500 font-semibold">
              Correct! The answer is {correct_answer}.
            </p>
          ) : (
            <p className="text-red-500 font-semibold">
              Incorrect. The correct answer is {correct_answer}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Card;



