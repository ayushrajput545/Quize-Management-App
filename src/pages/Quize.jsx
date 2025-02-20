import React, { useState , useEffect } from 'react'
import NavBar from '../components/NavBar'
import { BsClockHistory } from "react-icons/bs";
import { questionMCQs } from '../data/questions';
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Progress from '../components/Progress';
import { questionIntegerType } from '../data/questions';

const Quize = () => {

  
    const[currentQuestion , setCurrentQuestion] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null);
    const[timer , setTimer] = useState(30);
    const[countCorrect , setCountCorrect] = useState(0);
    const[countIncorrect , setCountInorrect] = useState(0);
    const[skipped , setSkipped] = useState(0);
    const [userAnswer, setUserAnswer] = useState(null); 
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigate = useNavigate();
   

    const currentQues = questionMCQs.find((item) => item.id === currentQuestion);
    const currentQuesInt = questionIntegerType.find((item) => item.id === currentQuestion)

    function clickHandler(option){
        setSelectedOption(option)
        if(option === currentQues.correct){
            setCountCorrect(countCorrect+1);
        }
        else if(option !== currentQues.correct){
            setCountInorrect(countIncorrect+1);
        }
       
        handleTime();     
    }

    function handleTime(){
        setTimeout(()=>{
            setSelectedOption(null)
            setCurrentQuestion(currentQuestion+1)
            setTimer(30)
        },1000) 
    }


    
  useEffect(() => {
    if (timer === 0) {
        handleTime();
        setSkipped(skipped+1)
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);  
  }, [timer]);


  if(currentQuestion===questionMCQs.length+questionIntegerType.length+1){
    navigate("/scoreboard", { state: { countCorrect: countCorrect, countIncorrect:countIncorrect ,skipped :skipped } });
  }


  const submitHandler = (event) => {
    event.preventDefault();  
    setIsSubmitted(true);

    const enteredAnswer = parseInt(event.target.answer.value, 10);  

    if (enteredAnswer === currentQuesInt?.correct) {
        setCountCorrect(countCorrect + 1);
    } else {
        setCountInorrect(countIncorrect + 1);
    }

    setUserAnswer(null);  

    setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setTimer(30);
        setIsSubmitted(false);
    }, 1000);

    event.target.reset();
};

 
  return (
    <div>

        <NavBar/>

        <div className='md:w-[80%] w-full bg-white mx-auto min-h-[200px] pb-8 mt-5'>

           <div className='w-[80%] flex flex-col mx-auto gap-6'>

            <div className='flex flex-col gap-3'>
                <div className='flex justify-between mt-10 text-xl '>
                    <p>Question <span>{currentQuestion}</span>/<span>10</span> </p>
                    <p className='flex items-center gap-2'>
                        <BsClockHistory />
                        {timer}
                    </p>
                </div>

                <div className="text-2xl font-semibold">
                 {
                    questionMCQs.find((item) => item.id === currentQuestion)?.data ||
                    questionIntegerType.find((item) => item.id === currentQuestion)?.data ||
                    "Question not found"
                  }
               </div>

                 
            </div>

            <div className='flex flex-col w-full'>
                {
                    questionMCQs.filter((item) => item.id === currentQuestion).map((item,i)=>(
                        <p key={i} className='flex flex-col gap-3' >
                           {
                            item.options.map((option,i) =>(
                                <p onClick={()=>clickHandler(option)}
                                 className={`border flex items-center justify-between rounded-md p-5 transition-all duration-100
                                    ${selectedOption ? 
                                    option=== currentQues.correct ? 
                                    "bg-green-300 hover:bg-green-300  text-white" : 
                                    option===selectedOption ? "bg-red-300 hover:bg-red-300 text-white" :
                                    "bg-white" :"bg-white hover:bg-slate-200"}`}>

                                     <span>{option}</span>

                                    <span>
                                        {
                                            selectedOption && (
                                                option=== currentQues.correct 
                                                ?
                                                <FaCheck  className="text-white text-2xl" />
                                                :
                                                option=== selectedOption 
                                                ?
                                                <ImCross className="text-white text-xl" />
                                                :
                                                null
                                            )
                                        }

                                    </span>
                                      
                                </p>
                            ))
                           }
                        </p>
                      
                    ))
                }
                 
            </div>
            {/* parseInt(userAnswer, 10) === currentQuesInt.correct */}
            {
                currentQuestion >5 &&(
                    <form onSubmit={submitHandler} className='flex flex-col w-full md:w-[70%]'>
                        <input type="number" name='answer' onChange={(e) => setUserAnswer(e.target.value)}  placeholder='Write Answer here' className= {`border p-3 rounded bg-slate-100 outline-none  border-slate-400 mb-4 `} />
                                   
                        <p className={`bg-green-300 border ${isSubmitted ? "block" : "hidden"}  rounded-md p-3 transition-all duration-100 mb-4`}> 
                             Correct Answer : {currentQuesInt?.correct}  
                        </p>

                        <button type='submit' className='bg-slate-300 p-2 w-fit mx-auto px-5 hover:bg-slate-400 rounded-md font-semibold flex items-center gap-1 border border-slate-500'>Submit</button>
                    </form>
                    

                )
            }
             
             
           </div>

        </div>

         <Progress countCorrect={countCorrect} countIncorrect={countIncorrect} skipped={skipped}/>
        

    </div>
  )
}

export default Quize