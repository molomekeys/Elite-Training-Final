import { useState } from "react"
import {useForm} from 'react-hook-form'
import { useSession } from "next-auth/react"
import ModalProfile from "~/components/fonctionality/ModalProfile"
import { useDisclosure } from "@chakra-ui/react"
const ClientProfile = () => {
    const [updatePassword,setUpdatePassword]=useState(false)
    const {isOpen,onClose,onOpen}=useDisclosure()
    const {register}=useForm({defaultValues:{
        actualPassword:'',newPassword:'',confirmNewPassword:''
    }})
    const {data}=useSession()
  return (
   <main className="flex flex-col w-full items-center bg-slate-200 justify-center">

    <section className="flex flex-col w-full bg-white border-2 p-10 gap-4
    ">
        <h2 className="font-semibold text-lg pb-20">Profile</h2>
        <p className="border-b-2  font-semibold">Nom : {data?.user.name} </p>
        <p className="border-b-2  font-semibold">Email : {data?.user.email} </p>

        <div className="flex  flex-col  items-center  gap-4 lg:flex-row ">

        <h3 className="text-lg font-semibold self-start">Mot de passe </h3>
        <button onClick={onOpen} className='bg-cyan-900 px-6 py-2 text-slate-100 rounded-md'>modifier </button>
        </div>
    </section>
    <ModalProfile  isOpen={isOpen}  onClose={onClose} onOpen={onOpen}/>
   </main>

  )
}
export default ClientProfile