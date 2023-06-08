import AddClient from "~/components/fonctionality/AddClient"
import { useSession, } from "next-auth/react"
import { useDispatch } from "react-redux"
import { api } from "~/utils/api"
import { motion } from "framer-motion"
import { MouseEventHandler, ReactEventHandler, useState } from "react"
import {HiUser} from 'react-icons/hi2'
import {MdEmail,MdCall} from 'react-icons/md'
import {BsFillCalendarPlusFill} from 'react-icons/bs'
import {v4} from 'uuid'
import { useDisclosure } from "@chakra-ui/react"
import ModalCoach from "~/components/AdminComponents/ModalCoach"
export type ClientDataType={
  id: number;
    licence_sportif: string | null;
    created_at: Date;
    name: string;
    email: string;
    phone_number: string;
    clients: number;
    numero_siren :string
}
import { storage } from "~/firebaseConfig"
import { ref,getDownloadURL } from "firebase/storage"
import {useDownloadURL} from 'react-firebase-hooks/storage'
const Coach = () => {


  const {data}=useSession()
  const dispatch = useDispatch()
  console.log(data?.user)
const [client,setClient]=useState<ClientDataType[]>([])
const {isOpen,onClose,onOpen}=useDisclosure()
const [specifiqueCoach,setSpecifiqueCoach]=useState<ClientDataType>()



if(data?.user)
{
console.log('render')
const {data,refetch,isLoading} =api.example.fetchAllCoach.useQuery()

console.log(data)

async function  handleRefetch(){
refetch()
}
if(isLoading==true)
{
 return 
}

async function hundleSpecifiqueCoach(idCoach:number){
//   if(data!='no client')
//   {
//   const specifique=data?.filter((e)=>{
//       return e?.id===idCoach
//   })
//   if(specifique&&specifique[0]){
//       setSpecifiqueCoach(specifique[0])
//       onOpen()
//   }
// }

console.log('slt')
const pathReference = ref(storage, '/momo/bg.pdf');

console.log(pathReference)
try {
  const pathurl = await getDownloadURL(pathReference).then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   const blob = xhr.response;
    // };
    // xhr.open('GET', url);


    // Or inserted into an <img> element
    return url
    
  }).then((e)=>{
    window.open(e,'_blank')
  })
  

  console.log(pathurl);
  // Update state or perform any other logic with the path URL
} catch (error) {
  console.log("Error fetching download URL:", error);
  // Handle the error appropriately (e.g., display an error message)
}



}

 
  const allFetchedClient=data!='no client'&&data?.map((e)=>{
   return(  <tr key={v4()} className=" py-4  w-full grid grid-cols-4 lg:grid-cols-6  ">
      <td key={v4()}   className="py-3 text-xs font-semibold italic pl-4  hidden lg:flex">{e?.created_at.toLocaleDateString()}</td>
      <td key={v4()} className="py-3 font-bold text-xs ">{e?.name}</td>
      <td key={v4()} className="py-3 font-bold text-xs ">{e?.clients}</td>


      <td key={v4()} className="py-3 font-bold text-xs hidden lg:flex justify-center">{e?.phone_number}</td>
      <td key={v4()} className="py-3 font-bold text-xs whitespace-nowrap text-red-400">en attente </td>

      <td key={v4()} className="py-3 font-bold text-xs"><button onClick={()=>{
        hundleSpecifiqueCoach(e.id,)
      }
        }>consulter</button></td>

    </tr>)

  })
  console.log(client)
  return (
   <main className="flex flex-col w-full gap-10  ">
 
{specifiqueCoach&& <ModalCoach isOpen={isOpen} onClose={onClose} onOpen={onOpen} coachInfo={specifiqueCoach}/>
}  
     <section className="flex flex-col px-2 lg:px-10 w-full pt-20 ">
     <section className="flex flex-col w-full border-2 rounded-lg bg-slate-200   shadow-md  border-y-slate-50 ">


    <motion.table animate={{opacity:1,y:0}} initial={{opacity:0}} transition={{duration:0.5,delay:0.1}}
     className="table-auto rounded-xl flex flex-col  bg-slate-200  w-full   text-center ">
      <thead className="text-2xl  text-center w-full bg-slate-200  flex   px-2  ">
      <tr className="  bg-slate-200 grid grid-cols-4 lg:grid-cols-6 w-full ">

      <th className="py-4 px-2   pl-4 text-center flex self-center items-center justify-center hidden lg:flex "><BsFillCalendarPlusFill width={25}/></th>
      <th className="py-4 text-center justify-center flex  "><HiUser width={25}/></th>
      <th className="py-4 text-center justify-center flex text-sm font-bold items-center ">clients</th>

     <th className=" py-4 px-2   text-center flex self-center items-center justify-center hidden lg:flex "><MdCall width={25}/></th>


    </tr>

      </thead>
      <tbody className="bg-slate-50  bg-slate-100 w-full ">
        {allFetchedClient}
      </tbody>
     </motion.table>
     </section>
     </section>
   </main>
  )}
  }
export default Coach