import {useForm} from 'react-hook-form'
import { useRouter } from 'next/router'


//react function
const changePassword = () => {
    const {register}=useForm({defaultValues:{
        password:'',confirmPassword:''
    }})

    const router = useRouter()
    console.log(router)
  return (
 <section className='flex items-center justify-center flex-col pt-10 gap-4  w-full'>
    <h3>Mot de passe oublier </h3>
    <form className='flex flex-col  bg-slate-100 gap-4 w-full '>
        <label  className="font-bold text-sm">Mot de passse : </label>
    <input  className='w-full form-input bg-slate-100   rounded-md py-3'
    placeholder='inscrivez votre mot de passe ' {...register('password')}/>
    <label  className="font-bold text-sm">Confirmer votre mot de passe :  </label>

        <input  className='w-full form-input bg-slate-100  rounded-md py-3'
        placeholder='inscrivez votre mot de passe ' {...register('confirmPassword')}/>
        <button>confirmer </button>
    </form>
 </section>
  )
}
export default changePassword