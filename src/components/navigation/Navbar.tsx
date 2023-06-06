import { Link } from "react-router-dom"
import {motion,AnimatePresence, delay} from 'framer-motion'
import {useState} from 'react'
const Navbar = () => {
  const [layoutMobile,setLayoutMobile]=useState(false)

  return (
    <motion.div 
    className='w-full flex absolute text-center relative z-10 p-4   shadow-sm lg:flex-row gap-4   justify-between w-screen  bg-white    items-center  lg:px-20'>
  <motion.div  animate={{opacity:1,x:0}} initial={{opacity:1,x:'-100%'}} transition={{duration:0.75}}
  className="w-full  h-full text-left">
   <Link to='/'>
    <p className='font-semibold   text-emerald-600 text-3xl  inline  cursor-pointer z-20 relative' onClick={()=> window.scrollTo(0,0)}>Food Easy</p>
    </Link>
    </motion.div>
    
    <AnimatePresence>

    { layoutMobile &&

    <motion.div  key='sidebar'    
    exit={{x:'200%'}}
    animate={{opacity:1,x:'0'}} initial={{opacity:0,x:'100%'}}
     transition={{duration:0.5}}
    className="flex  h-screen  w-screen    inset-0  z-20 absolute">
<motion.div  onClick={()=> setLayoutMobile(prev=>prev=!prev)}
className=" bg-slate-700 bg-opacity-5 w-full  relative h-full z-50">
      
</motion.div>
   
    <motion.div  className="w-4/6"
   
   
    
>
    <ul className=" relative w-full h-full z-50 flex self-start  text-lg flex-col bg-slate-100 text-slate-800 w-screen h-screen  items-start  p-10 gap-4  font-semibold">
   
   <Link to="/meal">
        <li className=" hover:bg-white w-screen  self-start flex py-2 px-1" onClick={()=>{   window.scrollTo(0,0)
          setLayoutMobile(false) 
         } }>All meals</li>
        </Link>
        <Link to='/recipe'>
      <li className="  hover:bg-white w-screen  self-start flex py-2 px-1 "  onClick={()=>setLayoutMobile(false) } >Discover a meal</li>
      </Link>
       
    </ul>
    </motion.div>
    </motion.div>
   
 }
 </AnimatePresence>
   <motion.div key='sideBar' 
    animate={{opacity:1,y:0}} initial={{opacity:0,y:'-100%'}} transition={{duration:0.5,delay:0.25}} 
    exit={{x:'100%'}}
    className="w-full flex  gap-10 items-end justify-end items-center">
    <Link to='/meal'>
  <motion.button className='p-2 px-4 hidden lg:block lg:px-12 cursor-pointer bg-emerald-600 text-slate-100 border-2 font-semibold border-emerald-600 text-base text-slate-700 text-md rounded-lg text-center  '>Discover our recipes</motion.button>

  </Link>
  
  <Link to='/recipe'>
  <motion.button className='p-2 hidden lg:block  px-4 lg:px-12 cursor-pointer  bg-white font-semibold text-slate-800 text-md rounded- text-base  border-slate-800 rounded-lg lg text-center  border-2   shadow-sm ' onClick={()=> window.scrollTo(0,0)}>Explore a new flavor</motion.button>

  </Link>
 
  </motion.div>




  <motion.a  onClick={()=> setLayoutMobile((prev)=> {
   return  prev= !prev
 }
  )}
  
  animate={{opacity:1,x:0}} initial={{opacity:0,x:'100%'}} transition={{duration:0.75}}
  className=" relative z-50 lg:hidden cursor-pointer">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

  </motion.a>
 
 



    </motion.div>
   
  )
}
export default Navbar