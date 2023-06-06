import Link  from "next/link"
import {motion,AnimatePresence, useAnimate} from 'framer-motion'
import {useState} from 'react'
import Image from "next/image"
import Logo from '../../../public/logo.png';
import { useRouter } from "next/router";
const Navbar = () => {
  const [layoutMobile,setLayoutMobile]=useState(false)
const router = useRouter()
const [refTest,animate]=useAnimate()
function handleAnimate(){
animate(refTest.current,{x:'0%'},{duration:0.1})

}
function endAnimate(){
  animate(refTest.current,{x:'100%'},{duration:0.1})
}
  return (
    <motion.div 
    className='w-full flex  text-center  z-10 p-4  overscroll-none   overflow-none 
      shadow-sm lg:flex-row gap-4 bg-black  w-full  ov    items-center  lg:px-20'>

    
    <AnimatePresence>

    {layoutMobile&& <motion.div   exit={{opacity:[1,0],x:['0%','100%'],transition:{duration:0.5}}}
    key='sidebar'  animate={{opacity:'1',x:'0'}} transition={{duration:0.1}}
    initial={{opacity:'0',x:'100%'}} ref={refTest}  
   
    className={`flex  overflow-x-hidden  transition-all duration-200 delay-150  
       inset-0  absolute z-20`}>



<motion.div  onClick={()=>setLayoutMobile(false)}
className="   w-1/5 overscroll-none relative   bg-slate-800 z-50">
      
</motion.div>
   
    <motion.div  className="w-full h-screen relative  bg-slate-200 flex flex-col "
   
   
    
>
    <ul className="  w-full   z-40 flex self-start  text-lg flex-col  
     text-slate-800    items-start  p-10 gap-4  font-semibold">
   
   <Link href="/">
        <li className=" hover:bg-white   self-start flex py-2 px-1" onClick={()=>{   window.scrollTo(0,0)
          setLayoutMobile(false) 
         } }>connexion</li>
        </Link>

        <Link href='/signIn'>
      <li className="  hover:bg-white   self-start flex py-2 px-1 "  onClick={()=>setLayoutMobile(false) } >inscription</li>
      </Link>
        <Link href='https://elite-training.fr' target={'_blank'} >
      <li className="  hover:bg-white   self-start flex py-2 px-1 "  onClick={()=>setLayoutMobile(false) } >Visitez notre site </li>
      </Link>
    </ul>
    </motion.div>
    </motion.div>
   
 }
 </AnimatePresence>



   <motion.div 
   
  
    className="w-full  flex  gap-10 justify-end items-center relative">
 


        <div className="w-full h-full bg-black items-center
         relative flex ">

            <Link href='/'>
          
            <Image  width={110} height={85} className=' object-cover
             float-left relative'
            src={Logo} alt='logo'/>
            </Link>
            <h3 className="text-slate-100 font-semibold text-sm lg:text-lg ">Version beta</h3>

        </div>
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




<motion.a  onClick={layoutMobile?()=>{
 
  setLayoutMobile(false)
} :()=> {
 
    setLayoutMobile(true)
  
  
  }}

  className={`relative z-50 lg:hidden cursor-pointer
   ${layoutMobile? 'text-slate-800' :'text-slate-100'}`}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

  </motion.a>
 
 



    </motion.div>
   
  )
}
export default Navbar