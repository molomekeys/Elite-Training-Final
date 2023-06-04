
import { useRouter } from "next/router"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { signOut } from "next-auth/react"
import {BsCalendar3} from 'react-icons/bs'
import {AiOutlineDashboard} from 'react-icons/ai'
import {HiOutlineUserGroup} from 'react-icons/hi'
import {FaFileInvoiceDollar} from 'react-icons/fa'
import {RiLogoutCircleRLine} from 'react-icons/ri'
import Logo from '../../../public/logo.png';

const SideNavbarCoach = () => {
    const router=useRouter()
  
    const [toggleNavigationBar,setToggleNavigationBar]=useState(false)
async function signOutTest(): Promise<void> {
 
 try {
  await signOut({callbackUrl:'http://localhost:3000'})
  // Process the received data here
} catch (error) {
 
}
    }
  return (
    <section className="bg-gradient-to-r from-black from-20%  via-slate-900 to-slate-700 
    lg:bg-gradient-to-b lg:from-slate-900 lg:from-50%  lg:via-slate-800 lg:via-80% lg:to-slate-800
     flex items-center relative lg:flex-col lg:w-full h-max lg:min-h-screen w-full ">

<div className="w-full h-full items-center justify-center min-w-fit
         relative flex  ">
   
            <Link href='/coach/dashboardCoach'>
          
            <Image  width={120} height={85} className=' object-cover
             float-left relative'
            src={Logo} alt='logo'/>
            </Link>
        </div>
    <div className="flex lg:flex-col items-center justify-center w-full "> 
       <ul className=" text-white hidden   font-medium lg:flex flex-row  items-center lg:items-start
        w-full lg:flex-col  gap-2 ">
       <Link href="/coach/dashboardCoach" className=" w-full flex-grow "> 
      
       <div className={`flex items-center px-10 py-3  w-full gap-4 hover:bg-slate-700 ${router.pathname=='/coach/dashboardCoach'? ' bg-gradient-to-r from-slate-50 to-slate-500 font-bold text-slate-800' : ''}`}  >
                 <span>
                  <AiOutlineDashboard size={25}/>
                  </span>
                  <li className=" text-sm   py-2
                  ">Dashboard</li>
            </div>
      
      </Link>


        <Link href='/coach/planning' className=" w-full ">
          <div className={`flex items-center px-10 py-3 w-full gap-4 hover:bg-slate-700 ${router.pathname=='/coach/planning'? ' bg-gradient-to-r from-slate-50 to-slate-500 font-bold text-slate-800' : ''}`}>
            <span><BsCalendar3 size={20}/></span><li className="hover:font-semibold  text-sm    py-2 ">Planning</li>
            </div>
            </Link>



        <Link href='/coach/client' className=" w-full ">
          
          
          
        <div className={`flex items-center px-10  w-full gap-4 hover:bg-slate-700 py-3  ${router.pathname=='/coach/client'?' bg-gradient-to-r from-slate-50 to-slate-500 font-bold text-slate-800 ' : ''}`}>
            <span><HiOutlineUserGroup size={25}/></span><li className="  text-sm    py-2 ">Client</li>
            </div>
          
          </Link>
        <Link href='/coach/facturation' className=" w-full ">
          
        <div className={`flex items-center px-10  w-full gap-4 hover:bg-slate-700 py-3  ${router.pathname=='/coach/facturation'?' bg-gradient-to-r from-slate-50 to-slate-500 font-bold text-slate-800 ' : ''}`}>
            <span><FaFileInvoiceDollar size={25}/></span>
            <li className=" text-sm  py-2 ">Facturation</li>
            </div>
</Link>



       </ul>
      
       
    </div>
    <div className="flex lg:hidden   relative z-50 pr-10 w-full h-full justify-end">
       <button onClick={()=>{
        setToggleNavigationBar((prev)=>!prev)
       }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8  ${toggleNavigationBar? 'text-slate-800':'text-slate-50'}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
      </button>
        </div>
        <div   onClick={()=>signOut({callbackUrl:'/'})}
    className=" my-10 p-3 cursor-pointer  hover:bg-gradient-to-r text-slate-50 from-slate-600 to-cyan-700  hidden lg:flex self-center w-full justify-center bottom-0 absolute">
   
        < RiLogoutCircleRLine size={30} className='scale-y-2  hidden lg:flex  -rotate-90'/>

</div>
    
  {/**Speciale menu navigation mobile  */}
  {toggleNavigationBar&&  <div 
      className="w-screen h-screen flex flex-col lg:hidden inset-0 
         bg-opacity-25 z-40 bg-slate-800  absolute ">
       
       <div className="flex flex-col
       lg:flex-col bg-white w-full 
        h-full text-slate-800  justify-center w-full "> 
       <ul className=" flex  font-medium lg:flex flex-col h-screen  
           justify-start pt-10  lg:items-start gap-4
         lg:flex-col  ">
       <Link href="/coach/dashboardCoach" className=" w-full "> 
      
       <div className={`flex items-center px-10 py-2  w-full gap-4 ${router.pathname=='/coach/dashboardCoach'? '' : ''}`}  >
                 <span>
                  <AiOutlineDashboard size={25}/>
                  </span>
                  <li className="hover:font-semibold hover:text-black    py-2
                  ">Dashboard</li>
            </div>
      
      </Link>


        <Link href='/coach/planning' className=" w-full ">
          <div className={`flex items-center px-10  w-full gap-4 hover:bg-slate-700 ${router.pathname=='/agenda'? 'bg-slate-700' : ''}`}>
            <span><BsCalendar3 size={25}/></span><li className=" py-2 ">Planning</li>
            </div>
            </Link>



        <Link href='/coach/client' className=" w-full ">
          
          
          
        <div className={`flex items-center px-10  w-full gap-4 hover:bg-slate-700 ${router.pathname=='/coach/client'? 'bg-slate-700' : ''}`}>
            <span><HiOutlineUserGroup size={25}/></span><li className="rounded-md  hover:px-2 py-2 ">Client</li>
            </div>
          
          </Link>
        <Link href='/coach/facture' className=" w-full ">
          
        <div className={`flex items-center px-10  w-full gap-4 hover:bg-slate-700 ${router.pathname=='/client'? 'bg-slate-700' : ''}`}>
            <span><FaFileInvoiceDollar size={25}/></span>
            <li className="rounded-md  hover:px-2 py-2">Facturation</li>
            </div>
</Link>

<div   onClick={()=>signOut({callbackUrl:'/'})}
    className=" my-10 h-20 p-3 cursor-pointer text-slate-800
     hover:bg-gradient-to-r  hover:text-slate-100 from-slate-600 to-cyan-700   flex self-center w-full justify-center  ">
   
        < RiLogoutCircleRLine  size={30} className='scale-y-2   lg:flex  -rotate-90  '/>

</div>

       </ul>
      
       
    </div>

        </div>}
    </section >
  )
}
export default SideNavbarCoach