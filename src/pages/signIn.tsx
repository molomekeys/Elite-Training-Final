import React from "react";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from ".././utils/api";


type LoginFormType={
  firstName:string
  lastName: string
  email: string
  password: string
  confirmPassword:string
phoneNumber:string
  sirenNumber:string
}
const validationSchema = z.object({
  firstName: z.string().nonempty("Le prénom est requis").min(3,"Prénom non valide, minimun 3 caractères"),
  lastName: z.string().nonempty("Le nom est requis").min(3,"Nom non valide, minimun 3 caractères"),
  email: z.string().nonempty("L'adresse email est requise ").email("Adresse email invalide"),
  phoneNumber:z.string().nonempty("Veuillez insérez le numéro de votre athlète").length(10,'Numéro non valide'),
  password: z.string().min(6,"Le mot de passe doit contenir au moins 6 caractères "),
  confirmPassword:z.string().min(6,"Le mot de passe doit contenir au moins 6 caractères "),
  sirenNumber:z.string().nonempty("Le numéro SIREN est requis").length(9,"Le Numéro SIREN invalide, 9 caracthères")
}).refine((data)=>{ return (data.confirmPassword===data.password)},{message:'Le champs indiquée ne correspond pas à votre mot de passe ',path:['confirmPassword']})
import Link from "next/link";
import { useRouter } from "next/router";
import {useForm} from 'react-hook-form'
import { useState } from "react";






//react function 
const SignIn = () => {
  const [displayErrorLogin,setDisplayErrorLogin]=useState(false)
  const createdUser =  api.example.signInUser.useMutation()

  const router = useRouter()
  const {register,handleSubmit,formState:{errors}}=useForm({defaultValues:{firstName:'',
  lastName:'',email:'',password:'',phoneNumber:''
  ,confirmPassword:'',sirenNumber:''},resolver:zodResolver(validationSchema)})

//function pour creer le coach

async function onSubmit(values:LoginFormType)  {

    
  const createdUsertest = await createdUser.
  mutateAsync({email:values.email,password:values.password,name:`${values.lastName +' '+ values.firstName}`,sirenNumber:values.sirenNumber,phoneNumber:values.phoneNumber}).
  then((e)=>{
    console.log(e)
    if(e!='user already existe')
    {
    router.push('/')
}
  })
// if(createdUsertest=='user already existe')
// {

// }
// else if(createdUsertest!=undefined){

// }


}

  return (
    <main className="w-screen flex relative flex-col   
    items-center justify-center h-max  bg-slate-100">
      {displayErrorLogin&& <div onClick={()=>{
            setDisplayErrorLogin(false)
            
          }}
     className='absolute bg-opacity-30 inset-0   w-screen 
      z-40 bg-slate-800  flex items-center  justify-center  
        border-slate-800 p-10 rounded-lg'>
         <div className='flex relative 
         flex-col  lg:gap-8 bg-white  border-none shadow-md
         p-4  rounded-lg lg:w-2/5 lg:h-1/5 h-2/6 min-h-fit  w-4/5'> 
         <div className='flex gap-10 flex-col w-full h-full items-center justify-center '>
        <h2 className=' text-xl font-bold text-slate-800'>Erreur :</h2>
         <h2 className='text-red-800 text-lg font-semibold '>Adresse email déjà utiliser veuillez indiquez une autre adresse</h2>
        <div className='h-full flex w-full items-center justify-center'>         
           <button  className='  w-max-48 self-center 
          text-slate-50 bg-slate-800 px-8 rounded-lg  py-3'
          onClick={()=>{
            setDisplayErrorLogin(false)
          }}>Compris</button>
          </div>
          </div>

          </div>
      </div>}
     
  
    <section className="  h-full bg-slate-100  justify-center 
     lg:px-4 items-center md:p-10
    w-full flex flex-col   ">  
{/**Formulaire avec validation de donner */}



<form  onSubmit={handleSubmit(onSubmit)}
className="flex w-full 
flex-col gap-4 p-5  md:w-4/5 lg:w-3/5 lg:p-10 bg-slate-50 shadow-2xl
rounded-xl  ">
      
<h3 className="font-bold text-2xl lg:text-4xl py-4 text-center">Page d&rsquo; inscription</h3>

<label className="font-semibold">Numéro SIREN :</label>
<input {...register('sirenNumber')} type={'text'} placeholder="Veuillez inscrire votre numéro SIREN"
 className='w-full form-input bg-slate-200 rounded-md  py-3'/>
 <p className='text-xs font-semibold text-red-500'>{errors.sirenNumber?.message}</p>

  <label className="font-semibold">Nom :</label>
<input {...register('lastName')} type={'text'} placeholder="Veuillez inscrire votre nom"
 className='w-full form-input bg-slate-200  rounded-md py-3'/>
<p className='text-xs font-semibold text-red-500'>{errors.lastName?.message}</p>

  <label className="font-semibold">Prénom : </label>
<input {...register('firstName')} 
placeholder="Veuillez inscrire votre prénom" type={'text'}
 className='w-full form-input bg-slate-200 rounded-md py-3 '/>
 <p className='text-xs font-semibold text-red-500'>{errors.firstName?.message}</p>

  <label className="font-semibold">Adresse e-mail : </label>
<input {...register('email')} type={'email'} placeholder="Veuillez inscrire votre adresse e-mail"
 className='w-full form-input bg-slate-200 rounded-md py-3'/>
 <p className='text-xs font-semibold text-red-500'>{errors.email?.message}</p>
 <label htmlFor='phoneNumber' className='font-semibold  text-sm' >Numéro de télphone :</label>

<input placeholder='Veuillez inscrire le numero de votre athlète'  
id='firstName' type={'tel'}   className='form-input rounded-md  border-2 border-slate-400 py-2 px-2 bg-slate-100'
  {...register('phoneNumber')}/>
          <p className='text-xs font-semibold text-red-500'>{errors.phoneNumber?.message}</p>
  <label className="font-semibold">Mot de passe : </label>
<input {...register('password')}    placeholder="Veuillez indiquez un mot de passe (minimum 6 caractères)"
 type={'password'}
 className='w-full form-input bg-slate-200  rounded-md py-3'/>
 <p className='text-xs font-semibold text-red-500'>{errors.password?.message}</p>

  <label className="font-semibold">Confirmer votre mot de passe : </label>
<input {...register('confirmPassword')} type={"password"} 
 placeholder="Veuillez confirmez votre mot de passe"
 className='w-full form-input bg-slate-200  rounded-md py-3'/>
<p className='text-xs font-semibold text-red-500'>{errors.confirmPassword?.message}</p>
<div className="w-full form-input bg-slate-200 py-3 rounded-md   flex flex-col
ext-center">
<label htmlFor="fileInput" className="font-semibold w-full text-center text-slate-600 ">Ajouter votre licence de coach : </label>

<input type={'file'}  placeholder="Veuillez ajouter votre carte sportif"
 id="fileInput"
 className='w-full border-2 text-center hidden' />
 </div>
 <p className='text-xs font-semibold text-red-500'>{errors.email?.message}</p>
<button type="submit" className="bg-slate-800 max-w-fit px-4 py-2 my-4
 rounded-lg text-slate-50 font-semibold self-center">Créer votre compte</button>

<div className='flex gap-2 font-semibold w-full items-center flex-row justify-center '>        
            <p>Vous avez déjà un compte?</p>
            <Link href='/'><span className='text-violet-900 font-semibold'>Connectez vous </span></Link>
        </div>
</form>
    </section>
    </main>

  );
};

export default SignIn;
