
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
interface ModalCoachType{
isOpen:boolean
onOpen:()=>void 
onClose:()=>void
coachInfo:ClientDataType
refetchData:()=>void
}
type FormVal={
    isValid:string
}
const ModalCoach = ({isOpen,onClose,onOpen,coachInfo,refetchData}:ModalCoachType) => {
   
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
    const modalSize = isLargerThan768 ? "2xl" : "full";
    const [isChangeEvent,setChangeEvent]=useState(false)

const changeDataLicence=api.example.validationLicenceCoach.useMutation()


//function pour affcher la photo
async function openData(){
try {
    if(coachInfo.licence_sportif)
    {
const pathUrl=ref(storage,coachInfo.licence_sportif)

const downLoad= await getDownloadURL(pathUrl).then((url)=>{
    return url
})
console.log(downLoad)
window.open(downLoad,'_blank')

}


} catch (error) {
    console.log(error)
}
}
async function handleValidateLicence(val:FormVal){

const newVal=await changeDataLicence.mutateAsync({idCoach:String(coachInfo.id),validate:val.isValid=='true'? true : false })

refetchData()
setChangeEvent(false)
onClose()


}
const {register,handleSubmit}=useForm({defaultValues:{isValid:coachInfo.isValid? 'true' : '0'}})
  return (
  
      <>
       
  
        <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{coachInfo.name} </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
           {isChangeEvent? <section>

            <form className='flex flex-col gap-4 p-4 my-10' onSubmit={handleSubmit(handleValidateLicence)}>
                <label className="font-bold text-slate-900 text-xs">Licence  : </label>
                <select {...register('isValid')} className='bg-slate-50  border-slate-400 
          py-3  w-full  rounded-md'>
                    <option value=''>Selectionner un choix </option>
                    <option value='0'>non valide</option>
                    <option value='true'>Validée</option>
                </select>
                <button  className='bg-slate-800 px-6 py-3 font-semibold text-center rounded-lg text-slate-100 self-center w-4/5 lg:w-2/5'
                type='submit'>Confirmer</button>
            </form>

           </section>: <section className='font-semibold gap-2 flex flex-col'>

                <p>Numero : {coachInfo.phone_number}</p>
                <p>Clients : {coachInfo.clients}</p>
                <p>Email : {coachInfo.email}</p>
                <p>Numero Siren : {coachInfo.numero_siren}</p>
                <div className='flex items-center gap-4'>
                <p>Carte  : </p>
                <p onClick={openData} className='cursor-pointer font-semibold text-sm hover:text-blue-800'>consulter la licence</p>
                </div>
             </section>}
            </ModalBody>
  
            <ModalFooter>
              <Button className='text-slate-800' mr={3} onClick={onClose}>
               Fermer
              </Button>
              <Button variant='ghost' type='button' onClick={()=>setChangeEvent((prev)=>!prev)}>Licence</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    
  )
}
export default ModalCoach