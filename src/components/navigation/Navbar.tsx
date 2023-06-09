import Link  from "next/link"
import {motion,AnimatePresence, delay} from 'framer-motion'
import {useState} from 'react'
import { useRouter } from "next/router"
import Image from "next/image"
import Logo from '../../../public/logo.png';

const Navbar = () => {
  const [layoutMobile,setLayoutMobile]=useState(false)
const router = useRouter()
  return (
    <motion.div 
    className='w-full flex  text-center bg-black z-10 p-4   shadow-sm lg:flex-row gap-4   justify-between w-screen     items-center  lg:px-20'>
  <motion.div 
  className="w-full  h-full flex items-center ">

<div className="w-full h-full text-left   min-w-fit
         relative flex  ">
          
            <Link href='/coach/dashboardCoach' className="flex text-left justify-start items-center">
          
            <Image  width={110} height={40} className=' object-cover
             float-left relative'
            src={Logo} alt='logo'/>
             <p className='font-semibold  whitespace-nowrap text-left  text-slate-200 text-xs 
               cursor-pointer z-20 relative
    ' onClick={()=> window.scrollTo(0,0)}>BETA</p>
            </Link>
           
        </div>
      
  
    </motion.div>
    
    
 
    <AnimatePresence>

    { layoutMobile &&

    <motion.div  key='sidebar'    
    
  
     transition={{duration:0.4}}
    
    className="flex     w-full   inset-0  z-50  h-screen  absolute   ">
<motion.div  onClick={()=> setLayoutMobile(prev=>prev=!prev)}
className="  bg-opacity-25 w-1/5  relative  bg-slate-800 z-50">
      
</motion.div>
   
    <motion.div  className="w-4/5 h-screen   z-50 bg-slate-200 flex flex-col"
   
   
    
>
    <ul className=" relative w-full   flex self-start z-50  text-lg flex-col text-slate-700 font-semibold
   bg-slate-100 lg:hidden
       h-screen  items-start p-4 pl-10 pt-20 gap-8   ">
   
   <Link href="/">
        <li className="  w-full gap-3  self-start flex " onClick={()=>{   window.scrollTo(0,0)
          setLayoutMobile(false) 
         } }>             
        <span>Connexion</span></li>
         <span>
                  </span>
        </Link>

        <Link href='/signIn'>
      <li className="   w-full gap-3  self-start flex  "  onClick={()=>setLayoutMobile(false) } >
 
        <span>Inscription</span></li>
      </Link>
        <Link href='https://elite-training.fr/'  target={'_blank'} >
      <li className="  n gap-3 self-start flex " 
       onClick={()=>setLayoutMobile(false) } >
     
        <span> Notre site internet</span></li>
      </Link>
      
    </ul>
    </motion.div>
    </motion.div>
   
 }
 </AnimatePresence>



   <motion.div key='sideBar' 
   
    className="w-full flex  gap-10 items-end justify-end items-center">
  <div className="text-slate-50 
        
        items-center justify-center hidden lg:flex 
         h-full  font-semibold w-full  pr-10 gap-10">
            <Link href='/'> <button className={`  ${router.pathname =='/'? "border-b-2 text-slate-50 border-[#F2D388] font-semibold" : "text-slate-400 hover:text-slate-50"}`}>Connexion</button></Link>
            <Link href='/signIn'> 
            <button className={`  ${router.pathname =='/signIn'? "border-b-2 border-[#F2D388] text-slate-50 font-semibold" : " text-slate-400 hover:text-slate-50"}`}>Inscription</button></Link>
            <a target={'_blank'}
            href='https://elite-training.fr' className=" text-slate-400 hover:text-yellow-100 hover:font-bold">Elite Training</a>
        </div>
 
  </motion.div>




  <motion.a  onClick={()=> setLayoutMobile((prev)=> {
   return  prev= !prev
 }
  )}
  
  
  className={` relative   z-50 lg:hidden cursor-pointer`}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8  ${layoutMobile==true? 'text-slate-800' : 'text-white' }`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

  </motion.a>
 
 



    </motion.div>
   
  )
}
export default Navbar