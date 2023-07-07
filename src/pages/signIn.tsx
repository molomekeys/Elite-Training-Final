import React from "react";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from ".././utils/api";
import {motion} from 'framer-motion'
import {storage,app} from '.././firebaseConfig'
import {  ref, uploadBytes } from "firebase/storage";

import {useAnimate} from 'framer-motion'
type LoginFormType={
  firstName:string
  lastName: string
  email: string
  password: string
  confirmPassword:string
phoneNumber:string
  sirenNumber:string
  picture_image:string
}
const validationSchema = z.object({
  firstName: z.string().nonempty("Le prénom est requis").min(3,"Prénom non valide, minimun 3 caractères"),
  lastName: z.string().nonempty("Le nom est requis").min(3,"Nom non valide, minimun 3 caractères"),
  email: z.string().nonempty("L'adresse email est requise ").email("Adresse email invalide"),
  phoneNumber:z.string().nonempty("Veuillez insérez le numéro de votre athlète").length(10,'Numéro non valide'),
  password: z.string().min(6,"Le mot de passe doit contenir au moins 6 caractères "),
  confirmPassword:z.string().min(6,"Le mot de passe doit contenir au moins 6 caractères "),
  picture_image:z.string().nonempty('Vous devez ajouter votre licence'),
  sirenNumber:z.string().nonempty("Le numéro SIREN est requis").length(9,"Le Numéro SIREN invalide, 9 caracthères")
}).refine((data)=>{ return (data.confirmPassword===data.password)},{message:'Le champs indiquée ne correspond pas à votre mot de passe ',path:['confirmPassword']})



import Link from "next/link";
import { useRouter } from "next/router";
import {useForm} from 'react-hook-form'
import { useState } from "react";
import FileUploader from "~/components/forms/FileUploader";






//react function 
const SignIn = () => {
  const [displayErrorLogin,setDisplayErrorLogin]=useState(false)
  const createdUser =  api.example.signInUser.useMutation()
console.log(app)
  const router = useRouter()
  const {register,handleSubmit,getValues,setFocus,formState:{errors,},setValue,clearErrors,trigger,setError}=useForm({defaultValues:{firstName:'',
  lastName:'',email:'',password:'',phoneNumber:'', picture_image:'',
  confirmPassword:'',sirenNumber:''},resolver:zodResolver(validationSchema)})

//function pour creer le coach


function updateValForm(val:string){

  setValue('picture_image',val)
  clearErrors('picture_image')


}

async function onSubmit(values:LoginFormType)  {

    console.log(values)
  const createdUsertest = await createdUser.
  mutateAsync({email:values.email,password:values.password,licence_sportif:values.picture_image,
    name:`${values.lastName +' '+ values.firstName}`,sirenNumber:values.sirenNumber,
    phoneNumber:values.phoneNumber})
if(createdUsertest=='user already existe')
{
  handleAnimate()
  setError('email',{message:'email déjà existant, veuillez choisir une autre adresse'})
  setFocus('email')
}
else if(createdUsertest!=undefined&&createdUsertest!="error"){

router.push('/')
}


}
const [refTest,animate]=useAnimate()
function handleAnimate(){
animate(refTest.current,{x:['3%','-3%','0%','3%',"0%","-3%","0%"]},{duration:0.75})
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
         <h2 className='text-red-800 text-lg font-bold text-sm '>Adresse email déjà utiliser veuillez indiquez une autre adresse</h2>
        <div className='h-full flex w-full items-center justify-center'>         
           <button  className='  w-max-48 self-center 
          text-slate-100 bg-slate-800 px-8 rounded-lg  py-3'
          onClick={()=>{
            setDisplayErrorLogin(false)
          }}>Compris</button>
          </div>
          </div>

          </div>
      </div>}
     
  
    <motion.section ref={refTest}
     className="  h-full bg-slate-100  justify-center 
     lg:px-4 items-center md:p-10
    w-full flex flex-col   " animate={{opacity:1,y:0}} initial={{opacity:0,y:'2%'}} transition={{duration:0.6,delay:0.1,ease:'easeIn'}}>  
{/**Formulaire avec validation de donner */}



<form  onSubmit={handleSubmit(onSubmit)}
className="flex w-full 
flex-col gap-4 p-5  md:w-4/5 lg:w-3/5 lg:p-10 bg-white shadow-2xl
rounded-xl  ">
      
<h3 className="font-bold text-xl lg:text-xl py-4 text-center">Page d&rsquo;inscription</h3>

<label className="font-bold text-sm">Numéro SIRET :</label>
<input {...register('sirenNumber')} type={'text'} placeholder="Veuillez inscrire votre numéro SIRET"
 className='w-full form-input bg-slate-100 rounded-md  py-3'/>
 <p className='text-xs font-bold text-sm text-red-500'>{errors.sirenNumber?.message}</p>

  <label className="font-bold text-sm">Nom :</label>
<input {...register('lastName')} type={'text'} placeholder="Veuillez inscrire votre nom"
 className='w-full form-input bg-slate-100  rounded-md py-3'/>
<p className='text-xs font-bold text-sm text-red-500'>{errors.lastName?.message}</p>

  <label className="font-bold text-sm">Prénom : </label>
<input {...register('firstName')} 
placeholder="Veuillez inscrire votre prénom" type={'text'}
 className='w-full form-input bg-slate-100 rounded-md py-3 '/>
 <p className='text-xs font-bold text-sm text-red-500'>{errors.firstName?.message}</p>

  <label className="font-bold text-sm">Adresse e-mail : </label>
<input {...register('email')} type={'email'} placeholder="Veuillez inscrire votre adresse e-mail"
 className='w-full form-input bg-slate-100 rounded-md py-3'/>
 <p className='text-xs font-bold text-sm text-red-500'>{errors.email?.message}</p>
 <label htmlFor='phoneNumber' className='font-bold text-sm  text-sm' >Numéro de télphone :</label>

<input placeholder='Veuillez inscrire le numéro de votre athlète'  
id='firstName' type={'tel'}   className='w-full form-input bg-slate-100 rounded-md py-3 '
  {...register('phoneNumber')}/>
          <p className='text-xs font-bold text-sm text-red-500'>{errors.phoneNumber?.message}</p>
  <label className="font-bold text-sm">Mot de passe : </label>
<input {...register('password')}    placeholder="Veuillez indiquez un mot de passe (minimum 6 caractères)"
 type={'password'}
 className='w-full form-input bg-slate-100  rounded-md py-3'/>
 <p className='text-xs font-bold text-sm text-red-500'>{errors.password?.message}</p>

  <label className="font-bold text-sm">Confirmer votre mot de passe : </label>
<input {...register('confirmPassword')} type={"password"} 
 placeholder="Veuillez confirmez votre mot de passe"
 className='w-full form-input bg-slate-100  rounded-md py-3'/>
<p className='text-xs font-bold text-sm text-red-500'>{errors.confirmPassword?.message}</p>
{/* <div className="w-full form-input bg-slate-100 py-3 rounded-md   flex flex-col
ext-center">
  
<label htmlFor="fileInput" className="font-bold text-sm w-full text-center text-slate-600 ">Ajouter votre carte professionnelle : </label>

<input type={'file'}  onChange={(e)=>handleLicenceUpload(e)} 
 placeholder="Ajouter votre carte professionnelle "
 id="fileInput"
 className='w-full border-2 text-center hidden' />
 </div> */}
 <div>
  <FileUploader saveLicence={updateValForm}/>
  <p className='text-xs font-bold text-sm text-red-500'>{errors.picture_image?.message}</p>

 </div>

<button type="submit"  className='bg-slate-700  self-center py-3 min-w-fit w-3/5 lg:w-3/5 rounded-lg text-white font-semibold my-6'>Créer votre compte</button>

<div className='flex gap-2 font-bold text-sm w-full items-center flex-row justify-center '>        
            <p>Vous avez déjà un compte?</p>
            <Link href='/'><span className='text-violet-900 font-bold text-sm'>Connectez vous </span></Link>
        </div>
</form>
    </motion.section>
    </main>

  );
};

export default SignIn
