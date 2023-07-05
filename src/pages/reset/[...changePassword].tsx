import {useForm} from 'react-hook-form'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import { useEffect, useState } from 'react'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import SuccescChange from '~/components/models_Layout/SuccescChange';

//react function

type formVal={
    password:string 
    confirmPassword:string
}
const validationSchema = z.object({
    
    password: z.string().min(6,"Le mot de passe doit contenir au moins 6 caractères "),
    confirmPassword:z.string().min(6,"Le mot de passe doit contenir au moins 6 caractères "),
  
  }).refine((data)=>{ return (data.confirmPassword===data.password)},{message:'Le champs indiquée ne correspond pas à votre mot de passe ',path:['confirmPassword']})



const ChangePassword = () => {
    const router = useRouter()
    const data =router.query.changePassword
    const {register,handleSubmit,formState:{errors}}=useForm({defaultValues:{
        password:'',confirmPassword:''
    },resolver:zodResolver(validationSchema)})


    const checkJeton= api.forgetPassword.delockJeton.useMutation()
    const changePassword=api.forgetPassword.changePassword.useMutation()

    const [isUpdatedPassowrd,setIsUpdatedPassoword]=useState(true)
    const [isActif,setIsActif]=useState(false)
    useEffect(()=>{

        async function fetchData(momo:string){
            const test = await checkJeton.mutateAsync(momo)
           
            return test
        }
          
        if(data!=undefined&&data[0]!=undefined){
            const momo = data[0]

           
                const testData = fetchData(momo).then((e)=>{
                    if(e==='invalide json')
                    {
                       router.push('/')
                    }
                    else {
                        setIsActif(true)
                        return e
                    }
           
                })
           
        
        
          
        }
    },[router,setIsActif])
   
   async function handleChangePassowrd(val:formVal){
    if(data!=undefined&&data[0]!=undefined)
    {
       const updatePassword =await changePassword.mutateAsync({newPassword:val.password,token:data[0]})
        
    }

    }
  return (
<section className='flex items-center justify-center flex-col lg:p-4 gap-4  w-full'>
{isActif&&isUpdatedPassowrd&&<form  onSubmit={handleSubmit(handleChangePassowrd)}
className='flex flex-col lg:border-2  border-slate-400 rounded-lg gap-10 lg:w-4/5 p-10'>
        <h3 className='text-center font-semibold text-xl'>Vous etes sur le point de modifier votre 
        mot de passe </h3>

        <label  className="font-bold text-sm">Mot de passse : </label>
    <input  className='w-full form-input bg-slate-100   rounded-md py-3'
    placeholder='inscrivez votre mot de passe ' {...register('password')}/>
     <p className='text-xs font-bold text-sm text-red-500'>{errors.password?.message}</p>

    <label  className="font-bold text-sm">Confirmer votre mot de passe :  </label>

        <input  className='w-full form-input bg-slate-100  rounded-md py-3'
        placeholder='inscrivez votre mot de passe ' {...register('confirmPassword')}/>
         <p className='text-xs font-bold text-sm text-red-500'>{errors.confirmPassword?.message}</p>

        <button className='bg-slate-700  self-center py-3 min-w-fit w-3/5 lg:w-1/5 rounded-lg text-white font-semibold my-6'>confirmer </button>
    </form>}

    {/* {isUpdatedPassowrd==false&&<SuccescChange/>

    } */}
 </section>
  )
}
export default ChangePassword