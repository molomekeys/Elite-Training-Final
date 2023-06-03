
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
const Reset = () => {
 

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
     



     


   <main className="flex  p-4  lg:p-10 items-center
    justify-center  w-full  ">
   
    <motion.section  ref={refTest}
   
    
    className="flex border-2 gap-6  lg:rounded-2xl lg:shadow-2xl
     border-slate-100 border-none  
    flex-col w-full  md:w-4/5 lg:w-3/5 justify-center   
    p-1 h-full lg:m-0 md:p-10 bg-white pt-10    ">
    <h3 className='text-slate-800 text-2xl min-h-fit min-w-fit lg:text-3xl font-bold text-center relative '>
    Réinitialisation du mot de passe
</h3>
<p className=' text-sm font-semibold text-slate-700'>
          Saisissez l&apos;adresse e-mail associée à votre compte et
           nous vous enverrons un code à usage unique pour réinitialiser votre mot de passe.

          </p>
        <form  onSubmit={handleSubmit(handleLogin)}
        className='flex flex-col gap-4 
         text-slate-50 font-semibold bg-white  p-4 text-slate-700 '>
         
          <div className='flex flex-col   gap-4   w-full    '>
           <label htmlFor="email" className='text-slate-900  text-sm font-semibold 
             min-w-fit '>E-mail * </label>
          <input {...register('email')}  className="border-2  py-3 w-full bg-slate-100
           border-slate-200  rounded-md text-slate-700"
          name="email" type="email"  />
       <p className='text-xs font-semibold text-red-500'>{errors.email?.message}</p>

         </div>
        
          <div className='flex flex-col gap-2 m-4 w-full'>
          <button type="submit"    className='bg-slate-700  self-center py-3 min-w-fit w-3/5 lg:w-3/5 rounded-lg text-slate-50'
        >
          Continuer
          </button>
         <div className='w-full flex justify-center'> 
         <Link href={'/'}> <button type='button' className='text-xs text-center font-bold text-slate-500 hover:text-slate-800'>
          Revenir à la page de connexion
          </button></Link>
            </div> 
          </div>
        </form>
        
      
        <div className='flex gap-1 font-semibold w-full items-center flex-col md:flex-row justify-center '>        
            <p>Vous n&apos;avez pas de compte ?</p>
            <Link href='signIn'><span className='text-cyan-800 font-semibold'>S'inscrire </span></Link>
        </div>
   
 </motion.section>

   </main>
   </main>
  )
}
}

export default Reset


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