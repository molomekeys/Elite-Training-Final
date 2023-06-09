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
const Facturation= () => {


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
const billFetched=api.example.fetchAllBillsCoach.useQuery().data
console.log(billFetched)




 
  const allFetchedClient=billFetched!='access denied'&&billFetched?.map((e)=>{
   return(  <tr key={v4()} className=" py-4  text-center w-full grid grid-cols-4 lg:grid-cols-4  ">
      <td key={v4()}   className=" text-xs font-semibold italic pl-4 ">{e?.createdAt?.toLocaleDateString()}</td>
      <td key={v4()} className=" font-bold text-xs  flex justify-center">{e.client_name}</td>
      <td key={v4()} className=" font-bold text-xs flex justify-center">{e.place}</td>


      <td key={v4()}  className={`  w-full flex justify-center font-bold text-xs flex text-center ${e.isPaid==true? 'text-cyan-800':'text-red-300'}`}>{e.isPaid? <AiFillCheckCircle size={'25px'}/> : <p>en attente de paiement</p>}</td>

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
      <tr className="  bg-slate-200 grid grid-cols-4 lg:grid-cols-4 text-xl  w-full ">

      <th className=" flex  items-center justify-center w-full  "><BsFillCalendarPlusFill width={25}/></th>
      <th className=" flex  items-center justify-center w-full text-xs  ">client</th>
      <th className=" flex  items-center justify-center w-full  "><MdWhereToVote/></th>



    

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
  
export default Facturation