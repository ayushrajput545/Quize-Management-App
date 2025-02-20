import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdStart } from "react-icons/md";

const NavBar = () => {
  const navigate = useNavigate()
  return (
    <div className='bg-slate-200'>
       <div className='w-11/12 max-w-maxContent mx-auto  py-5 flex justify-between'>
          <h1 onClick={()=>navigate('/')} className='text-3xl md:text-4xl font-bold cursor-pointer'>Interactive Quize</h1>
          
            <Link to='/quize' className='bg-slate-300 p-2 hover:bg-slate-400 rounded-md font-semibold flex items-center gap-1 border border-slate-500'>
               {/* <FaHistory className='hidden md:block'/>   */}
               <p>Let's Start</p>
               <MdStart className='hidden md:block' />
            </Link>
         

        </div>
    
    </div>
  )
}

export default NavBar