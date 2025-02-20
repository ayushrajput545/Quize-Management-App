import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { openDB } from 'idb';
import { MdOutlineDeleteForever } from 'react-icons/md';

const QuizeHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const db = await openDB('QuizDB', 1);
            const tx = db.transaction('quizResults', 'readonly');
            const store = tx.objectStore('quizResults');
            const allResults = await store.getAll();
            setHistory(allResults);
        };

        fetchHistory();
    }, []);

    const deleteAttempt = async (id) => {
        const db = await openDB('QuizDB', 1);
        const tx = db.transaction('quizResults', 'readwrite');
        const store = tx.objectStore('quizResults');
        await store.delete(id);
        await tx.done;

        // Ensure correct item is removed
        setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
    };

    return (
        <div>
            <NavBar />
            <div className='md:w-[80%] w-full mx-auto bg-white min-h-[200px] mt-10 p-5'>
                <h1 className='text-center text-3xl p-2'>Quiz History</h1>
                {history.length > 0 ? (
                    <div className='flex flex-col gap-5'>
                        {history.map((item, index) => (
                            <div key={item.id} className='border p-4 rounded-lg flex justify-between shadow-md bg-gray-100'>
                                <div>
                                    <p className='text-lg font-semibold'>Attempt ID: {item.id}</p>
                                    <p>Correct Answers: {item.countCorrect}</p>
                                    <p>Incorrect Answers: {item.countIncorrect}</p>
                                    <p>Skipped Questions: {item.skipped}</p>
                                    <p className='font-semibold'>Final Score: {item.countCorrect}/{item.totalQuestions}</p>
                                    <p className='text-sm text-gray-500'>Date: {new Date(item.timestamp).toLocaleString()}</p>
                                </div>
                                <MdOutlineDeleteForever 
                                    className='mt-10 text-3xl bg-slate-300 hover:bg-slate-400 cursor-pointer rounded-md' 
                                    onClick={() => deleteAttempt(item.id)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-center text-xl text-gray-500'>No quiz history available.</p>
                )}
            </div>
        </div>
    );
};

export default QuizeHistory;
