import React from 'react'
import NavBar from '../components/NavBar'
import { instructions } from '../data/instruction'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <NavBar/>

        <div className='md:w-[80%] w-full mt-16  flex flex-col gap-5 justify-center items-center min-h-[500px] bg-white mx-auto'>
           <p className=' font-semibold text-3xl'>
              Instructions
           </p>

           <div className='flex flex-col text-sm gap-2 items-start '>
                {
                instructions.map((item , i)=>{
                    return <p>{item.data}</p>
                })
                }
           </div>

           <Link to='/quize' className='bg-slate-300 p-2 px-4 hover:bg-slate-400 rounded-md font-semibold flex items-center gap-1 border border-slate-500'>
             <p> Start Quize</p>
           </Link>

            


        </div>
       
    
    </div>
     
  )
}

export default Home