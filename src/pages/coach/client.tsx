import AddClient from "~/components/fonctionality/AddClient"
import { useSession, } from "next-auth/react"
import { useDispatch } from "react-redux"
import { api } from "~/utils/api"
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
const dataCoach =api.example.fetchDataLoginCoach.useQuery()

const momo =dataCoach.data
const {refetch}=dataCoach

async function  handleRefetch(){
refetch()
}
if(dataCoach.isLoading)
{

}


const testmomo=dataCoach.data&&dataCoach.data.map((e)=>{
  return {...e.UserIdPrisma,createdAt:e.created_at}
})

 
  const allFetchedClient=testmomo?.map((e)=>{
   return(  <tr key={e.id} className=" py-4   ">
      <td key={v4()}   className="py-3 text-xs font-semibold italic pl-4 ">{e.createdAt.toLocaleDateString()}</td>
      <td key={v4()} className="py-3 font-semibold text-sm ">{e.name}</td>
      <td key={v4()} className="py-3 font-semibold text-sm">{e.phone_number}</td>
      <td key={v4()} className="py-3  font-semibold text-sm">{e.email}</td>
    </tr>)

  })
  console.log(client)
  return (
   <main className="flex flex-col w-full">

     <div className="w-full flex  justify-end  p-10 ">
     
     <AddClient refetchData={handleRefetch}/>
     </div>
     <section className="flex flex-col px-2 lg:px-10 w-full  ">
     <section className="flex flex-col w-full border-2 rounded-lg bg-slate-200   shadow-md  border-y-slate-50 ">


    <table className="table-auto rounded-xl   lg:px-4  ">
      <thead className="text-2xl  text-center  ">
      <tr className=" border-collapse bg-slate-200 text-center">
      <th className="py-4 px-2   pl-4 text-center "><BsFillCalendarPlusFill width={25}/></th>
      <th className="py-4 text-center "><HiUser width={25}/></th>
   
     <th className="py-4  text-center "><MdCall width={25}/></th>
     <th className="py-4  text-center  "><MdEmail width={25}/></th>
    </tr>
      </thead>
      <tbody className="bg-slate-50 rounded-xl">
        {allFetchedClient}
      </tbody>
     </table>
     </section>
     </section>
   </main>
  )}
  }
export default Client