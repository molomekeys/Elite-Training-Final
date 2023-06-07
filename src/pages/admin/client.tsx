import AddClient from "~/components/fonctionality/AddClient"
import { useSession, } from "next-auth/react"
import { useDispatch } from "react-redux"
import { api } from "~/utils/api"
import { motion } from "framer-motion"
import { useState } from "react"
import {HiUser} from 'react-icons/hi2'
import {MdEmail,MdCall} from 'react-icons/md'
import {BsFillCalendarPlusFill} from 'react-icons/bs'
import {v4} from 'uuid'
type ClientDataType={
  name: string;
        email: string;
        id: string;
        createdAt:Date
}
const Client = () => {

  const {data}=useSession()
  const dispatch = useDispatch()
  console.log(data?.user)
const [client,setClient]=useState<ClientDataType[]>([])

if(data?.user)
{
console.log('render')
const {data,refetch,isLoading} =api.example.fetchAllClient.useQuery()



async function  handleRefetch(){
refetch()
}
if(isLoading==true)
{
 return 
}



  const allFetchedClient=data!='no client'&&data?.map((e)=>{
   return(  <tr key={v4()} className=" py-4  w-full grid grid-cols-4 lg:grid-cols-5  ">
      <td key={v4()}   className="py-3 text-xs font-semibold italic pl-4 ">{e?.created_at.toLocaleDateString()}</td>
      <td key={v4()} className="py-3 font-bold text-xs ">{e?.name}</td>
      <td key={v4()} className="py-3 font-bold text-xs ">{e?.coachName}</td>

      <td key={v4()} className="py-3  font-bold text-xs hidden lg:flex text-center justify-center">{e?.email}</td>

      <td key={v4()} className="py-3 font-bold text-xs">{e?.phone_number}</td>
    </tr>)

  })
  console.log(client)
  return (
   <main className="flex flex-col w-full gap-10  ">

  
     <section className="flex flex-col px-2 lg:px-10 w-full pt-20 ">
     <section className="flex flex-col w-full border-2 rounded-lg bg-slate-200   shadow-md  border-y-slate-50 ">


    <motion.table animate={{opacity:1,y:0}} initial={{opacity:0}} transition={{duration:0.5,delay:0.1}}
     className="table-auto rounded-xl flex flex-col  bg-slate-200  w-full   text-center ">
      <thead className="text-2xl  text-center w-full bg-slate-200  flex   px-2  ">
      <tr className="  bg-slate-200 grid grid-cols-4 lg:grid-cols-5 w-full ">

      <th className="py-4 px-2   pl-4 text-center flex self-center items-center justify-center "><BsFillCalendarPlusFill width={25}/></th>
      <th className="py-4 text-center justify-center flex  "><HiUser width={25}/></th>
      <th className="py-4 text-center justify-center flex text-sm font-bold items-center ">coach</th>

     <th className="py-4  text-center flex  justify-center hidden lg:flex "><MdEmail width={25}/></th>
     <th className=" py-4 px-2   text-center flex self-center items-center justify-center "><MdCall width={25}/></th>


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
export default Client