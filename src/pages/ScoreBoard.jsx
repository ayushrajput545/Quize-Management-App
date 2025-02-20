import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { openDB } from 'idb';
import { useLocation, Link } from 'react-router-dom';
import { questionMCQs } from '../data/questions';
import Progress from '../components/Progress';
import { FaHistory } from "react-icons/fa";


const ScoreBoard = () => {
    const location = useLocation();
    const countCorrect = location.state?.countCorrect;
    const countIncorrect = location.state?.countIncorrect;
    const skipped = location.state?.skipped;
    const totalQuestions = questionMCQs.length;

    useEffect(() => {
        const initDB = async () => {
            const db = await openDB('QuizDB', 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains('quizResults')) {
                        db.createObjectStore('quizResults', { keyPath: 'id', autoIncrement: true });
                    }
                }
            });
            return db;
        };

        const saveQuizResult = async () => {
            if (countCorrect !== undefined && countIncorrect !== undefined && skipped !== undefined) {
                const db = await initDB();
                const tx = db.transaction('quizResults', 'readwrite');
                const store = tx.objectStore('quizResults');
                await store.add({ countCorrect, countIncorrect, skipped, totalQuestions, timestamp: new Date() });
                await tx.done;
            }
        };

        saveQuizResult();
    }, [countCorrect, countIncorrect, skipped, totalQuestions]);

    return (
        <div>
            <NavBar />

            <div className='md:w-[80%] w-full mx-auto bg-white min-h-[200px] mt-10 flex flex-col'>
                <h1 className='text-center text-3xl p-2'>Quiz Complete!</h1>
                <p className='text-center mt-5 text-xl'>Your Score: {countCorrect}/{totalQuestions} </p>
                <Link to='/quize' className='bg-slate-300 hover:bg-slate-400 p-2 w-fit mx-auto mt-5 px-5 rounded-md font-semibold flex items-center gap-1 border border-slate-500'>
                    <p>Try Again</p>
                </Link>
            </div>

            <Progress countCorrect={countCorrect} countIncorrect={countIncorrect} skipped={skipped} />

            <div className='md:w-[80%] w-full mx-auto bg-white p-4'>
                <Link to='/quizehistory' className='bg-slate-300 p-2 w-fit mx-auto hover:bg-slate-400 rounded-md font-semibold flex items-center gap-1 border border-slate-500'>
                    <FaHistory /> 
                    <p className='w-fit'>Quiz History</p>
                </Link>
            </div>
        </div>
    );
};

export default ScoreBoard;
