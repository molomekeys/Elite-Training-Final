
import { useForm } from 'react-hook-form';
import {
    Modal,
    ModalOverlay,
    ModalContent,ModalBody,
    ModalHeader,useMediaQuery,
    ModalFooter,
   
    ModalCloseButton,Button
  } from '@chakra-ui/react'

  import {useRef, useState} from 'react'

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ClientDataType } from '~/pages/admin/coach';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '~/firebaseConfig';

import {api} from '../../utils/api'
import Reset from '~/pages/reset';
interface ModalCoachType{
isOpen:boolean
onOpen:()=>void 
onClose:()=>void

}
type FormVal={
  
        actualPassword:string,newPassword:string,confirmNewPassword:string
  
}
const validationSchemaPassword=z.object({
    actualPassword:z.string().nonempty('Veuillez indiquez une valeur').min(6,'Minimun 6 caractères'),
    newPassword:z.string().nonempty('Veuillez indiquez une valeur').min(6,'Minimun 6 caractères'),
    confirmNewPassword:z.string().nonempty('Veuillez indiquez une valeur').min(6,'Minimun 6 caractères')
}).refine((e)=>{
    return e.confirmNewPassword===e.newPassword
},{message:'les deux mots de passes ne correspondent pas',path:['confirmNewPassword']})
const ModalProfile = ({isOpen,onClose,onOpen}:ModalCoachType) => {
   
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
    const modalSize = isLargerThan768 ? "2xl" : "full";
    const [isChangeEvent,setChangeEvent]=useState(false)
const changePassword=api.example.updatePassword.useMutation()


//function pour affcher la photo

async function handleValidateLicence(val:FormVal){


const updateData = await changePassword.mutateAsync({newPassword:val.newPassword,password:val.actualPassword})
if(updateData=='succes')
{
setChangeEvent(false)
onClose()
}
else if(updateData=='mot de passe incorrect'){
    setError('actualPassword',{message:'mot de passe inccorect'})
}

}
const {setError,register,handleSubmit,reset,formState:{errors}}=useForm({resolver:zodResolver(validationSchemaPassword),defaultValues:{
    actualPassword:'',newPassword:'',confirmNewPassword:''
},})
  return (
  
      <>
       
  
        <Modal isOpen={isOpen} onClose={()=>{
            onClose()
            reset()}} size={modalSize}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modification de votre mot de passe </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <section>

            <form className='flex flex-col gap-4 p-4 my-10' onSubmit={handleSubmit(handleValidateLicence)}>
            <label  className='font-bold text-slate-900 text-xs'>Mot de passe actuel : </label>
        <input className=' bg-slate-50 border-slate-400 
         rounded-md  py-3 pl-4 form-input' {...register('actualPassword')} placeholder="Mot de passe actuel "/>
      <p className='text-xs font-semibold text-red-500'>{errors?.actualPassword?.message}</p>

        <label className='font-bold text-slate-900 text-xs'>Nouveau mot de passe  : </label>
        <input className=' bg-slate-50 border-slate-400 
         rounded-md  py-3 pl-4 form-input' {...register('newPassword')} placeholder="Nouveau mot de passe actuel "/>
            <p className='text-xs font-semibold text-red-500'>{errors?.newPassword?.message}</p>

        <label className='font-bold text-slate-900 text-xs'>Confirmer votre nouveau mot de passe actuel : </label>
        <input className=' bg-slate-50 border-slate-400 
         rounded-md  py-3 pl-4 form-input' {...register('confirmNewPassword')} placeholder="Confirmer votre nouveau mot de passe actuel "/>
             <p className='text-xs font-semibold text-red-500'>{errors?.confirmNewPassword?.message}</p>

        <button type='submit'
         className='bg-slate-800 px-6 py-3  font-semibold self-center rounded-xl text-slate-50  max-w-fit'> Confirmer </button>
            </form>

           </section>
            </ModalBody>
  
            <ModalFooter>
              <Button className='text-slate-800' mr={3} onClick={onClose}>
               Fermer
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    
  )
}
export default ModalProfile