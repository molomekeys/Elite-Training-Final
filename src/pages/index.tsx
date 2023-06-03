
import Link from 'next/link'
import {useRouter} from 'next/router'

import { signIn, useSession } from "next-auth/react";
import { useAnimate,motion } from 'framer-motion';

import {useEffect} from 'react'

import { useState } from 'react';
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'
import { GetServerSidePropsContext } from 'next';
import { getServerAuthSession } from '~/server/auth';
const validationSchemaLogin=z.object({
  email:z.string().nonempty('Veuillez indiquez votre email').email('Adresse e-mail non valide'),
  password:z.string().nonempty('Veuillez saisir votre mot de passe').min(6,'Veuillez indiquez votre mot de passe (Le mot de passe doit contenir au moins 6 caractères)')
})
const Index = () => {
 

const [errorDisplay,setErrorDisplay]=useState(false)
    const router = useRouter()

    //avec ça je peux verifier si l'utilisateur est sign in
    const {data:session,status}=useSession()
 

    const {register,formState:{errors},setError,handleSubmit}=useForm({defaultValues:{email:'',password:''},resolver:zodResolver(validationSchemaLogin)})

    async function handleLogin(values:{password:string,email:string}){
      
      
      console.log(values)
      const signInStatus= await signIn('credentials',
      {username:values.email,password:values.password,redirect:false})
      
      if(signInStatus?.error){
        handleAnimate()
      }
    }

    useEffect(()=>{


      //function qui permet de redigirer la bonne perosnne conencter
      async function handleUserLoged(){
     
        if(session?.user) {
          if(session.user.role=='admin')
          {
            router.push('admin/dashboardAdmin',)
          }
          else if(session.user.role=='coach')
          {
            console.log('slt')
            router.push('/coach/dashboardCoach')

          }
          else if(session.user.role=='client')
          {
            console.log('slt')
            router.push('/client/planning')

          }
        }
      }
      handleUserLoged()
    },[session,router])
console.log(session)

const [refTest,animate]=useAnimate()
function handleAnimate(){
animate(refTest.current,{x:['3%','-3%','3%','-3%','0%']},{duration:0.6})
setError('password',{message:'* Email ou mot de passe incorrect'})
}

 if(status==="unauthenticated")
{
  return (
    <main className='flex flex-col   bg-slate-50  gap-10 '>
     



     {errorDisplay&& <div onClick={()=>{
            setErrorDisplay(false)
          }}
     className='absolute bg-opacity-30  z-40 bg-slate-800 inset-0 flex items-center 
     justify-center  w-full h-full lg:border-slate-800 p-10 rounded-lg'>
         <div className='flex relative 
         flex-col  lg:gap-8 bg-slate-200  border-slate-600 shadow-md
         p-4 border-2 rounded-lg lg:w-2/5 lg:h-2/5 h-2/5 w-4/5'> 
         <div className='flex gap-10 flex-col w-full h-full items-center justify-center '>
        <h2 className=' text-xl font-bold text-slate-800'>Erreur :</h2>
         <h2 className='text-red-800 text-lg font-semibold '>Mots de passe incorrecte veuillez reessayer</h2>
        <div className='h-full flex w-full items-center justify-center'>         
           <button  className='  w-max-48 self-center 
          text-slate-50 bg-slate-800 px-8 rounded-lg  py-3'
          onClick={()=>{
            setErrorDisplay(false)
          }}>Compris</button>
          </div>
          </div>

          </div>
      </div>}


   <main className="flex    lg:p-10 items-center
    justify-center  w-full ">
   
    <motion.section  ref={refTest}
   
    
    className="flex border-2 gap-8 lg:rounded-2xl lg:shadow-2xl
     border-slate-100 border-none  
    flex-col w-full  md:w-4/5 lg:w-3/5 justify-center   
    p-1 h-full lg:m-0 md:p-10 bg-white   ">
    <h3 className='text-slate-800 text-3xl min-h-fit min-w-fit lg:text-5xl font-bold text-center relative '>Connexion</h3>
   
        <form  onSubmit={handleSubmit(handleLogin)}
        className='flex flex-col gap-4 text-lg 
         text-slate-50 font-semibold bg-white  p-4 text-slate-700 '>
          
          <div className='flex flex-col   gap-4   w-full    '>
           <label htmlFor="email" className='text-slate-900  text-sm font-semibold 
             min-w-fit '>Adresse e-mail * </label>
          <input {...register('email')}  className="border-2  py-3 w-full bg-slate-200
           border-slate-200  rounded-md text-slate-700"
          name="email" type="email" placeholder="Inscrire votre adresse e-mail" />
       <p className='text-xs font-semibold text-red-500'>{errors.email?.message}</p>

         </div>
         <div className='flex flex-col  gap-4   w-full'>
          <label htmlFor="password" className='text-slate-700  min-w-fit text-sm '>Mot de passe *</label>
          <input {...register('password')}  className="border-2 w-full py-3
           border-slate-200 rounded-md bg-slate-100 text-slate-400"
           name="password" type="password" placeholder="Mot de passe" />
           <p className='text-xs font-semibold text-red-500'>{errors.password?.message}</p>

        </div>
          <div className='flex flex-col gap-2 m-4'>
          <button type="submit"   className='bg-slate-800 w-40 self-center py-2 rounded-lg text-slate-50'
        >
           Se connecter
          </button>
          <button className='text-xs text-slate-500 hover:text-slate-800'>
           Mot de passe oublié ?
          </button>
          </div>
        </form>
        
      
    <div className='flex gap-2 font-semibold w-full items-center flex-col md:flex-row justify-center '>        
            <p>Vous avez pas encore de compte ?</p>
            <Link href='signIn'><span className='text-violet-900 font-semibold'>Inscrivez vous </span></Link>
        </div>
   
 </motion.section>

   </main>
   </main>
  )
}
}

export default Index


export async function getServerSideProps(ctx:GetServerSidePropsContext) {
  // Perform your logic to determine the redirect destination
  const shouldRedirect = true;
  
const session =await getServerAuthSession(ctx)
console.log(session)
if(session?.user){
  let redirectUrl=''
if(session.user.role=='admin')
{
redirectUrl='/admin/dashboardAdmin'
}
else if(session.user.role=='coach')
{
  redirectUrl='/coach/dashboardCoach'

}
else if(session.user.role=='client')
{
  redirectUrl='/client/dashboardClient'

}
return {
  redirect: {
    destination: redirectUrl,
    permanent: false, // Set to true for permanent redirects (HTTP 301)
  },
};
}

return{
  props:{

  }
}
  
   
  
}