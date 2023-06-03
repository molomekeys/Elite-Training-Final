import Link from "next/link"
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useState } from "react";
import Logo from '../../../public/logo.png';

const Navbar = () => {
  const router=useRouter()
  const [toggleNavigationBar,setToggleNavigationBar]=useState(false)
  return (

    <div className="flex w-full  relative h-full font-sans text-slate-800
     justify-between  flex-row items-center bg-gradient-to-r from-black  via-black to-slate-700    ">
        <div className="w-full h-full bg-transparent items-center
         relative flex ">

            <Link href='/'>
          
            <Image  width={110} height={85} className=' object-cover
             float-left relative'
            src={Logo} alt='logo'/>
            </Link>
            <h3 className="text-slate-100 font-semibold text-lg ">Version beta</h3>

        </div>
        <div className="text-slate-50 
        
        items-center justify-center hidden lg:flex 
         h-full  font-semibold w-full  pr-10 gap-10">
            <Link href='/'> <button className={`  ${router.pathname =='/'? "border-b-2 text-slate-200 border-white  font-semibold" : "text-slate-400 hover:text-slate-50"}`}>Connexion</button></Link>
            <Link href='/signIn'> <button className={`  ${router.pathname =='/signIn'? "border-b-2 border-white text-slate-200 font-semibold" : " text-slate-400 hover:text-slate-50"}`}>Inscription</button></Link>
            <a target={'_blank'}
            href='https://elite-training.fr' className="hover:font-semibold text-slate-400 hover:text-yellow-100">Elite Training</a>
        </div>
        <div className="flex lg:hidden  relative z-50 pr-10 w-full h-full justify-end">
       <button onClick={()=>{
        setToggleNavigationBar((prev)=>!prev)
       }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8  ${toggleNavigationBar? 'text-slate-800':'text-slate-50'}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
</button>
        </div>

        {/**Speciale menu navigation mobile  */}
      {toggleNavigationBar&&  <div 
      className="w-screen h-screen flex flex-col  inset-0 
         bg-opacity-25 z-20 bg-slate-800  absolute ">
        <div className={` 
        flex relative flex-col w-4/5 bg-slate-50 h-full
         z-30 self-end ${toggleNavigationBar&&''}`}>
         <ul className="flex flex-col w-full text-slate-800 font-semibold gap-8 p-10">
          <li className="hover:bg-slate-200 w-4/5 p-2">
            <Link href={'/login'} className='w-full'>Connexion</Link>
          
          </li>
          <li className="hover:bg-slate-200 w-4/5 p-2">
          <Link href={'/signIn'} className='w-full'>Inscription</Link>
          </li>
          <li className="hover:bg-slate-200 w-4/5 p-2">
          <a target={'_blank'}
            href='https://elite-training.fr' className="hover:font-semibold w-full ">Notre site web</a>
          </li>

         </ul>
          </div>
        </div>}
    </div>
  )
}
export default Navbar