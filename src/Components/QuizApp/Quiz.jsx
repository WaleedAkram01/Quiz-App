import React from "react";
import "./Quiz.css";
import { useState, useRef } from "react";
// This is being imported.
import { data } from "../../assets/data";

function Quiz() {
  // Here we have set initially 0 means we are on first question.
  let [index, setIndex] = useState(0);
  //   Here we will initially provide question object for that import data array
  let [question, setQuestion] = useState(data[index]);
  //   Here we will store  the correct answer.
  let [score, setScore] = useState(0);
  //   now,when we will are On last question Now if we click next then the quiz app will disappear.
  //  To fix that:
  let [result, setResult] = useState(false);
  //   *********************************
  // Now there is problem is that We can click on all the option either its true or false for that:
  // Here we will create lock state so that we can lock Our answers.
  let [lock, setLock] = useState(false);
  //   Now Further we will add functionality that if we click on wrong answer the correct answer would be hilighted.
  // For that we will create 4 reference varibales.
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  // Now we will add one array for these options
  let option_array = [Option1, Option2, Option3, Option4];
  // Now Using the option_array we will hilight the correct answer when we click on wrong answer.
  // If the answer is wrong that is in else condition
  //   ********************************
  //Now we will add fuctionality to click on these options.
  //For that we will create arrow function.
  //   Here we have two parameters one is eleemnt and other is answer.
  let checkAns = (e, ans) => {
    // If lock is false then we will b otherwise these statemensts  if lock is true then the constions will not be executed.
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        // Whenever the answer will be correct we will increase the score by 1.
        setScore((s) => s + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        // Here we will get the answer of the question[question.ans]
        // But we will do minus 1
        //        Bcz
        //Index starts from 0 but question answer starts from 1.
        // Question starts from 1 means ky jo question ka answer hai wo hm ny 1 sy start kia na lakin data array ki form mai iss liay ussay 0 karna ho ga.
        // So we will get refrence of correct answer.
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };
  // Now we will create functionaity for next button.
  //   Before that we will create one score state.
  const next = () => {
    //Here first we will add functionality that if we have not clciked On any of the option the next button would be disabled.
    // If lock is true means we have clicked on any of the button.
    if (lock === true) {
      // We will provide the condion of result here:
      if (index === data.length - 1) {
        setResult(true);
        // Now wewill retirn 0 so that it will not execute remaining statements.
        // Now with this when we re on last questn and try to clcik on next then nothing will happen.
        return 0;
      }
      // By this we will increment the index and next question would be displayed.
      setIndex(++index);
      // Now to update the question.
      setQuestion(data[index]);
      //   Then we to also update setLock so that it is clickable
      setLock(false);
      //   When we were clicking on next button the previous selection of class wrong and correct was already there.To remove that
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        // Dont understand the purpose of this:
        return null;
      });
    }
  };

  let reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <div>
          <p>
            You scored {score} out of {data.length}
          </p>
          <button onClick={reset} className="reset">
            Reset
          </button>
        </div>
      ) : (
        <>
          {/* <p>1.Which device is required for the internet connection?</p>
           */}
          {/* The upper code Now we will do with React. */}
          <p>
            {index + 1}.{question.question}
          </p>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          {/* <div className="index">1 of 5 questions</div> */}
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
      {/* We can also write this in first diiv */}
    </div>
  );
}

export default Quiz;
