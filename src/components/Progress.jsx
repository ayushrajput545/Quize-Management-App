import React from 'react'

const Progress = ({countCorrect,countIncorrect, skipped}) => {
  return (
    <div>

        <div className='md:w-[80%] w-full bg-white mx-auto min-h-[100px] mt-5'>
            <div className='w-[80%] flex flex-col gap-2 mx-auto'>
               <p className='mt-2 text-xl'>Your Progress</p>
               <div className='flex flex-col gap-2 p-2'>
                  <p>Correct : {countCorrect}</p>
                  <p>Incorrect : {countIncorrect} </p>
                  <p>Skipped : {skipped} </p>
               </div>
            </div>
        </div>

    </div>
  )
}

export default Progress