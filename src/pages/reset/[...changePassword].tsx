import {useForm} from 'react-hook-form'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import { useEffect } from 'react'


//react function
const ChangePassword = () => {
    const router = useRouter()
    const data =router.query.changePassword
    const {register}=useForm({defaultValues:{
        password:'',confirmPassword:''
    }})
    const checkJeton= api.forgetPassword.delockJeton.useMutation()

    useEffect(()=>{

        async function fetchData(momo:string){
            const test = await checkJeton.mutateAsync(momo)
           
            return test
        }
          
        if(data!=undefined&&data[0]!=undefined){
            const momo = data[0]
           const testData =fetchData(momo).then((e)=>{
            console.log(e)
            if(typeof e==='string'){
                
            }
            else {
                router.push('/')
            }
           })
          
        }
    },[router])
   

    
  return (
 <section className='flex items-center justify-center flex-col lg:p-4 gap-4  w-full'>
    <form className='flex flex-col lg:border-2  border-slate-400 rounded-lg gap-10 lg:w-4/5 p-10'>
        <h3 className='text-center font-semibold text-xl'>Vous etes sur le point de modifier votre 
        mot de passe </h3>

        <label  className="font-bold text-sm">Mot de passse : </label>
    <input  className='w-full form-input bg-slate-100   rounded-md py-3'
    placeholder='inscrivez votre mot de passe ' {...register('password')}/>
    <label  className="font-bold text-sm">Confirmer votre mot de passe :  </label>

        <input  className='w-full form-input bg-slate-100  rounded-md py-3'
        placeholder='inscrivez votre mot de passe ' {...register('confirmPassword')}/>
        <button className='bg-slate-700  self-center py-3 min-w-fit w-3/5 lg:w-1/5 rounded-lg text-white font-semibold my-6'>confirmer </button>
    </form>
 </section>
  )
}
export default ChangePassword