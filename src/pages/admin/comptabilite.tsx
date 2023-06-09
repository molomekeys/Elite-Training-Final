import AddClient from "~/components/fonctionality/AddClient"
import { useSession, } from "next-auth/react"
import { useDispatch } from "react-redux"
import { api } from "~/utils/api"
import { motion } from "framer-motion"
import { useState } from "react"
import {MdRoom, MdWhereToVote} from 'react-icons/md'

import {HiUser} from 'react-icons/hi2'
import {MdEmail,MdCall} from 'react-icons/md'
import {BsFillCalendarPlusFill} from 'react-icons/bs'
import {AiOutlineFilePdf,AiFillCheckCircle,AiFillCheckSquare} from 'react-icons/ai'
import {FaMoneyBillWave} from 'react-icons/fa'
import { loadStripe } from "@stripe/stripe-js"
import { env } from "~/env.mjs"; // On client - same import!

const momo  =  loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

import {v4} from 'uuid'

import { useRouter } from "next/router"
type ClientDataType={
  name: string;
        email: string;
        id: string;
        createdAt:Date
}
const Comptabilite = () => {


  async function fetchKeysStripe(billId:number): Promise<void>{



    try {
      const response = await fetch('/api/payement/stripe',{
        method:'POST',body:JSON.stringify(billId),headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      // Process the received data here
     
      const stripe = await momo.then((e)=>{
     
        console.log(data?.sessionId)
    
        // return e?.redirectToCheckout({sessionId:data?.sessionId})
      })
    
    
    console.log(data)
    
      
    
    } catch (error) {
     console.log(error)
    }
    
    
     }



  const {data}=useSession()
  const dispatch = useDispatch()
  console.log(data?.user)
const [client,setClient]=useState<ClientDataType[]>([])
const router = useRouter()
const billFetched=api.example.fetchAllBillsAdmin.useQuery().data
console.log(billFetched)


// if(data?.user)
// {
// console.log('render')
// // const dataCoach =api.example.fetchDataLoginCoach.useQuery()

// const momo =dataCoach.data
// const {refetch}=dataCoach

// async function  handleRefetch(){
// refetch()
// }
// if(dataCoach.isLoading==true)
// {
//  return 
// }



// const testmomo=dataCoach.data&&dataCoach.data.map((e)=>{
//   return {...e.UserIdPrisma,createdAt:e.created_at}
// })

 
  const allFetchedClient=billFetched!='access denied'&&billFetched?.map((e)=>{
   return(  <tr key={v4()} className=" py-4  text-center w-full grid grid-cols-4 lg:grid-cols-8  ">
      <td key={v4()}   className=" text-xs font-semibold italic pl-4 ">{e?.createdAt?.toLocaleDateString()}</td>
      <td key={v4()} className=" font-bold text-xs  flex justify-center">{e.client_name}</td>
      <td key={v4()} className=" font-bold text-xs flex justify-center">{e.coach_name}</td>
      <td key={v4()} className=" font-bold text-xs hidden lg:flex justify-center">{e.place}</td>

      <td key={v4()} className=" font-bold text-xs hidden lg:flex justify-center">{e.bill_invoice_pdf}</td>
      <td key={v4()}  className="  w-full hidden lg:flex justify-center font-bold text-xs text-center">{e.hours*e.client_price}</td>
      <td key={v4()}  className="  w-full hidden lg:flex justify-center font-bold text-xs  text-center">{e.hours*e.coach_price}</td>
      <td key={v4()}  className={`  w-full flex justify-center font-bold text-xs flex text-center ${e.isPaid==true? 'text-cyan-800':'text-red-400'}`}>{e.isPaid? <AiFillCheckCircle size={'25px'}/> : 'non payée'}</td>

    </tr>)

  })
  console.log(client)
if(billFetched=="access denied"){
  router.push('/')

}



  return (
   <main className="flex flex-col w-full gap-10 ">

     
     <section className="flex flex-col px-2 lg:px-10 w-full pt-20  ">
     <section className="flex flex-col w-full border-2 rounded-lg bg-slate-200  pt  shadow-md  border-y-slate-50 ">


    <motion.table animate={{opacity:1,y:0}} initial={{opacity:0}} transition={{duration:0.5,delay:0.1}}
     className="table-auto rounded-xl flex flex-col  bg-slate-200  w-full   text-center ">
      <thead className=" text-sm   w-full bg-slate-200  flex   px-2 items-center justify-center  ">
      <tr className="  bg-slate-200 grid grid-cols-4 lg:grid-cols-8 text-xl  w-full ">

      <th className=" flex  items-center justify-center w-full  "><BsFillCalendarPlusFill width={25}/></th>
      <th className=" flex  items-center justify-center w-full text-xs  ">client</th>
      <th className=" flex  items-center justify-center w-full  text-xs ">coach</th>
      <th className=" flex  items-center justify-center w-full hidden lg:flex  "><MdWhereToVote/></th>


      <th className="flex  items-center justify-center w-full hidden lg:flex  "><AiOutlineFilePdf width={25}/></th>

      <th className=" lg:flex  items-center justify-center w-full  text-xs hidden ">tarif client</th>

      <th className=" lg:flex  items-center justify-center w-full  text-xs  hidden ">tarif coach</th>

     <th className="py-4 text-center justify-center flex  "><FaMoneyBillWave width={25}/></th>



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
  
export default Comptabilite