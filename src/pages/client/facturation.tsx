import AddClient from "~/components/fonctionality/AddClient"
import { useSession, } from "next-auth/react"
import { useDispatch } from "react-redux"
import { api } from "~/utils/api"
import { motion } from "framer-motion"
import { useState } from "react"
import {HiUser} from 'react-icons/hi2'
import {MdEmail,MdCall} from 'react-icons/md'
import {BsFillCalendarPlusFill} from 'react-icons/bs'
import {AiOutlineFilePdf,AiFillCheckCircle} from 'react-icons/ai'
import {FaMoneyBillWave} from 'react-icons/fa'
import { loadStripe } from "@stripe/stripe-js"
import { MdWhereToVote} from 'react-icons/md'
import { env } from "~/env.mjs"; // On client - same import!

const momo  =  loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

import {v4} from 'uuid'
type ClientDataType={
  name: string;
        email: string;
        id: string;
        createdAt:Date
}
const FactureClient = () => {


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
    
        return e?.redirectToCheckout({sessionId:data?.sessionId})
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

const billFetched=api.example.fetchBillingClient.useQuery().data
console.log(billFetched)




 
  const allFetchedClient=billFetched?.map((e)=>{
   return(  <tr key={v4()} className=" py-4  text-center w-full grid grid-cols-4 lg:grid-cols-5  ">
      <td key={v4()}   className="py-3 text-xs font-semibold italic pl-4 ">{e?.createdAt?.toLocaleDateString()}</td>
      <td key={v4()} className="py-3 font-bold text-xs hidden lg:flex justify-center">{e.roomName}</td>

      <td key={v4()} className="py-3 font-bold text-xs flex justify-center">{e.bill_invoice_pdf}</td>
      <td key={v4()}  className="py-3  w-full flex justify-center font-bold text-xs flex text-center">{e.price}</td>
{e.isPaid==false?<td key={v4()}  onClick={()=>fetchKeysStripe(e.id)} className="py-3   flex justify-center  cursor-pointer  text-xs  font-semibold  flex rounded-xl bg-slate-200 mx-4 lg:mx-12">{'effectué un payement'}</td>
: <td key={v4()}  className="py-3   flex justify-center  cursor-pointer  font-bold  text-cyan-800  lg:flex"><AiFillCheckCircle size={'25px'}/></td>}
    </tr>)

  })
  console.log(client)
  return (
   <main className="flex flex-col w-full gap-10 ">

     
     <section className="flex flex-col px-2 lg:px-10 w-full pt-20  ">
     <section className="flex flex-col w-full border-2 rounded-lg bg-slate-200  pt  shadow-md  border-y-slate-50 ">


    <motion.table animate={{opacity:1,y:0}} initial={{opacity:0}} transition={{duration:0.5,delay:0.1}}
     className="table-auto rounded-xl flex flex-col  bg-slate-200  w-full   text-center ">
      <thead className="text-2xl  text-center w-full bg-slate-200  flex   px-2  ">
      <tr className="  bg-slate-200 grid grid-cols-4 lg:grid-cols-5  w-full ">

      <th className="py-4 px-2   pl-4 text-center flex self-center items-center justify-center "><BsFillCalendarPlusFill width={25}/></th>
      <th className=" flex  items-center justify-center w-full hidden lg:flex "><MdWhereToVote/></th>

     <th className="py-4  text-center flex  justify-center  "><AiOutlineFilePdf width={25}/></th>
     <th className="py-4 text-center justify-center flex  "><FaMoneyBillWave width={25}/></th>

     <th className="py-4  text-center flex  justify-center hidden lg:flex "> </th>


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
  
export default FactureClient