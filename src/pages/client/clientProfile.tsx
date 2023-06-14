import { useState } from "react"
import {useForm} from 'react-hook-form'
import { useSession } from "next-auth/react"
import ModalProfile from "~/components/fonctionality/ModalProfile"
import { useDisclosure } from "@chakra-ui/react"
const clientProfile = () => {
    const [updatePassword,setUpdatePassword]=useState(false)
    const {isOpen,onClose,onOpen}=useDisclosure()
    const {register}=useForm({defaultValues:{
        actualPassword:'',newPassword:'',confirmNewPassword:''
    }})
    const {data}=useSession()
  return (
   <main className="flex flex-col w-full items-center justify-center">

    <section className="flex flex-col w-full bg-slate-100 border-2 p-10
    ">
        <h2 className="font-semibold text-lg">Profile</h2>
        <p className="border-b-2 ">Nom : {data?.user.name} </p>
        <h3>Mot de passe </h3>
        <button onClick={onOpen}>modifier </button>
  
    </section>
    <ModalProfile  isOpen={isOpen}  onClose={onClose} onOpen={onOpen}/>
   </main>

  )
}
export default clientProfile