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

const SideNavbarAdmin = () => {
  const [layoutMobile,setLayoutMobile]=useState(false)
const router = useRouter()
  return (
    <motion.div 
    className='bg-gradient-to-r from-black from-20%  via-slate-900 to-slate-700 
    lg:bg-gradient-to-b lg:from-slate-900 lg:from-50%  lg:via-slate-800 lg:via-80% lg:to-slate-800
     flex items-center relative lg:flex-col lg:w-full h-max lg:min-h-screen w-full '>

    
    <AnimatePresence>

    { layoutMobile &&

    <motion.div  key='sidebar'    
    exit={{x:'200%'}}
    animate={{opacity:1,x:'0'}} initial={{opacity:0,x:'100%'}}
     transition={{duration:0.5}}
    className="flex  h-screen  w-screen    inset-0  z-20 absolute ">
<motion.div  onClick={()=> setLayoutMobile(prev=>prev=!prev)}
className=" bg-slate-700 bg-opacity-5 w-full  relative h-full z-50 ">
      
</motion.div>
   
    <motion.div  className="w-5/6 lg:hidden"
   
   
    
>
    <ul className=" relative w-full  z-50 flex self-start  text-lg flex-col text-slate-700 font-semibold
   bg-slate-100 lg:hidden
      w-screen h-screen  items-start p-4 pl-10 pt-20 gap-8   ">
   
   <Link href="/admin/dashboardAdmin">
        <li className="  w-full gap-3  self-start flex " onClick={()=>{   window.scrollTo(0,0)
          setLayoutMobile(false) 
         } }>                <span>   <AiOutlineDashboard size={25}/></span>
        <span> dashboard</span></li>
         <span>
                  </span>
        </Link>

      
        <Link href='/admin/client'  >
      <li className="  n gap-3 self-start flex " 
       onClick={()=>setLayoutMobile(false) } ><span>
        <HiOutlineUserGroup   size={25}/></span>
        <span> Clients</span></li>
      </Link>
        
      <Link href='/admin/coach'  >
      <li className="  n gap-3 self-start flex " 
       onClick={()=>setLayoutMobile(false) } ><span>
        <HiOutlineUserGroup   size={25}/></span>
        <span> Coach</span></li>
      </Link>
      <Link href='/admin/comptabilite'  >
      <li className="   gap-3 self-start flex "
        onClick={()=>setLayoutMobile(false) } >
          <span>
       <FaFileInvoiceDollar  size={25}/></span>
        <span> facturation</span></li>
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
   
            <Link href='/admin/dashboardCoach' className="w-full items-center lg:justify-center flex h-full">
          
            <Image  width={110} height={40} className=' object-cover
             float-left relative'
            src={Logo} alt='logo'/>
            </Link>
        </div>
    <div className="flex lg:flex-col items-center justify-center w-full "> 
       <ul className=" text-white hidden   font-medium lg:flex flex-row  items-center lg:items-start
        w-full lg:flex-col  gap-2 ">
       <Link href="/admin/dashboardCoach" className=" w-full flex-grow "> 
      
       <div className={`flex items-center px-10 py-3  w-full gap-4 hover:bg-slate-700 ${router.pathname=='/admin/dashboardCoach'? ' bg-gradient-to-r from-slate-50 to-slate-500 font-bold text-slate-800' : ''}`}  >
                 <span>
                  <AiOutlineDashboard size={25}/>
                  </span>
                  <li className=" text-sm   py-2
                  ">Dashboard</li>
            </div>
      
      </Link>


       



        <Link href='/admin/coach' className=" w-full ">
          
          
          
        <div className={`flex items-center px-10  w-full gap-4 hover:bg-slate-700 py-3  ${router.pathname=='/admin/coach'?' bg-gradient-to-r from-slate-50 to-slate-500 font-bold text-slate-800 ' : ''}`}>
            <span><HiOutlineUserGroup size={25}/></span><li className="  text-sm    py-2 ">Coach</li>
            </div>
          
          </Link>
          <Link href='/admin/client' className=" w-full ">
          
          
          
          <div className={`flex items-center px-10  w-full gap-4 hover:bg-slate-700 py-3  ${router.pathname=='/admin/client'?' bg-gradient-to-r from-slate-50 to-slate-500 font-bold text-slate-800 ' : ''}`}>
              <span><HiOutlineUserGroup size={25}/></span><li className="  text-sm    py-2 ">Client</li>
              </div>
            
            </Link>
        <Link href='/admin/comptabilite' className=" w-full ">
          
        <div className={`flex items-center px-10  w-full gap-4 hover:bg-slate-700 py-3  ${router.pathname=='/coach/facturation'?' bg-gradient-to-r from-slate-50 to-slate-500 font-bold text-slate-800 ' : ''}`}>
            <span><FaFileInvoiceDollar size={25}/></span>
            <li className=" text-sm  py-2 ">Facturation</li>
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



<div className="w-full flex items-center justify-end pr-5 ">  <motion.a   
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
export default SideNavbarAdmin