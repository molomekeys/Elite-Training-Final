import Link  from "next/link"
import {motion,AnimatePresence, delay} from 'framer-motion'
import {useState} from 'react'
import Image from "next/image"
import Logo from '../../../public/logo.png';
import { useRouter } from "next/router";

import { signOut } from "next-auth/react"
import {BsCalendar3} from 'react-icons/bs'
import {AiOutlineDashboard} from 'react-icons/ai'
import {HiOutlineUserGroup} from 'react-icons/hi'
import {FaFileInvoiceDollar} from 'react-icons/fa'
import {RiLogoutCircleRLine} from 'react-icons/ri'
import { CgProfile } from "react-icons/cg";
const SideNavbarClient = () => {
  const [layoutMobile,setLayoutMobile]=useState(false)
const router = useRouter()
  return (
    <motion.div  
    className='bg-gradient-to-r from-black from-20%  via-slate-900 to-slate-700  
    lg:bg-gradient-to-b lg:from-slate-900 lg:from-50%  lg:via-slate-800 lg:via-80% lg:to-slate-800
     flex items-center  lg:flex-col lg:w-full  lg:min-h-screen w-full overflow-hidden '>

    
    <AnimatePresence>

    { layoutMobile &&

    <motion.div  key='sidebar'    
    
  
     transition={{duration:0.4}}
    
    className="flex     w-full   inset-0  z-50  h-screen  absolute   ">
<motion.div  onClick={()=> setLayoutMobile(prev=>prev=!prev)}
className="  bg-opacity-25 w-1/5  relative  bg-slate-800 z-50">
      
</motion.div>
   
    <motion.div  className="w-4/5 h-screen   relative z-50 bg-slate-200 flex flex-col"
   
   
    
>
    <ul className=" relative w-full relative  flex self-start z-50  text-lg flex-col text-slate-700 font-semibold
   bg-slate-100 lg:hidden
       h-screen  items-start p-4 pl-10 pt-20 gap-8   ">
   
  

        <Link href='/client/planning'>
      <li className="   w-full gap-3  self-start flex  "  onClick={()=>setLayoutMobile(false) } >
      <span>  <BsCalendar3  size={25}/></span>
        <span> planning</span></li>
      </Link>
       
      <Link href='/client/facturation'  >
      <li className="   gap-3 self-start flex "
        onClick={()=>setLayoutMobile(false) } >
          <span>
       <FaFileInvoiceDollar  size={25}/></span>
        <span> facturation</span></li>
      </Link>
    
  <Link href='/client/clientProfil'  >
      <li className="   gap-3 self-start flex "
        onClick={()=>setLayoutMobile(false) } >
        
          <span><CgProfile size={25}/></span>
        <span> Profil</span></li>
      </Link>
      <div   onClick={()=>signOut({callbackUrl:'/'})}
    className="  cursor-pointer my-auto hover:bg-slate-200 p-3 rounded-lg 
       text-slate-800 from-slate-600 to-cyan-700  
    lg:hidden flex    w-4/5 justify-center">
   
        < RiLogoutCircleRLine size={30} className='  flex lg:hidden  -rotate-90'/>

</div>
    </ul>
    </motion.div>
    </motion.div>
   
 }
 </AnimatePresence>
   <motion.div key='sideBar' 
    animate={{opacity:1,y:0}} initial={{opacity:0}} transition={{duration:0.5,delay:0.25}} 
    exit={{x:'100%'}}
    className="w-full flex flex-col  lg:gap-10  justify-center items-center">
 


 <div className="w-full h-full  items-center lg:justify-center min-w-fit
         relative flex  ">
   
            <Link href='/coach/dashboardCoach' className="w-full items-center lg:justify-center flex h-full">
          
            <Image  width={110} height={40} className=' object-cover
             float-left relative'
            src={Logo} alt='logo'/>
            </Link>
        </div>
    <div className="flex lg:flex-col items-center justify-center w-full "> 
       <ul className=" text-white hidden   font-medium lg:flex flex-row  items-center lg:items-start
        w-full lg:flex-col  gap-2 ">
      


        <Link href='/client/planning' className=" w-full ">
          <div className={`flex items-center px-10 py-3 w-full gap-4 hover:bg-slate-700 ${router.pathname=='/coach/planning'? ' bg-gradient-to-r from-slate-50 to-slate-500 font-bold text-slate-800' : ''}`}>
            <span><BsCalendar3 size={20}/></span><li className="hover:font-semibold  text-sm    py-2 ">Planning</li>
            </div>
            </Link>



      
        <Link href='/client/facturation' className=" w-full ">
          
        <div className={`flex items-center px-10  w-full gap-4 hover:bg-slate-700 py-3  ${router.pathname=='/coach/facturation'?' bg-gradient-to-r from-slate-50 to-slate-500 font-bold text-slate-800 ' : ''}`}>
            <span><FaFileInvoiceDollar size={25}/></span>
            <li className=" text-sm  py-2 ">Facturation</li>
            </div>
</Link>


<Link href='/client/clientProfile' className=" w-full ">
          
          <div className={`flex items-center px-10  w-full gap-4 hover:bg-slate-700 py-3  ${router.pathname=='/coach/coachProfile'?' bg-gradient-to-r from-slate-50 to-slate-500 font-bold text-slate-800 ' : ''}`}>
              <span><CgProfile size={25}/></span>
              <li className=" text-sm  py-2 ">Profil</li>
              </div>
  </Link>
       </ul>
      
       
    </div>
  
        <div   onClick={()=>signOut({callbackUrl:'/'})}
    className=" my-10 p-3 cursor-pointer 
      hover:bg-gradient-to-r text-slate-50 from-slate-600 to-cyan-700  
    hidden lg:flex  w-full justify-center">
   
        < RiLogoutCircleRLine size={30} className='scale-y-2  hidden lg:flex  -rotate-90'/>

</div>
      
   
 
  </motion.div>



<div className="w-full flex justify-end items-center pr-5 ">  <motion.a   
  onClick={()=> setLayoutMobile((prev)=> {
   return  prev= !prev
 }
  )}
  
  animate={{opacity:1,x:0}} initial={{opacity:0,x:'100%'}} transition={{duration:0.75}}
  className={`relative z-50 lg:hidden cursor-pointer ${layoutMobile? 'text-slate-900':'text-white'}`}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

  </motion.a>
  </div>

 



    </motion.div>
   
  )
}
export default SideNavbarClient