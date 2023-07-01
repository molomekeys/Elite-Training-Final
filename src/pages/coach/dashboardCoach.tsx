import { useSession } from "next-auth/react"

import { api } from "~/utils/api"
import {  useDispatch } from 'react-redux'
import { PDFDownloadLink,BlobProvider} from '@react-pdf/renderer';
import { useEffect, useState } from "react";
import InvoiceComponent from "~/components/fonctionality/InvoiceComponent";
const DashboardCoach = () => {
 
  const[isInClient,SetIsInClient]=useState(false)
  const {data:dashboardData}=api.dashboardInfo.fetchingDashboard.useQuery(undefined,{ staleTime:20000})
  console.log(dashboardData)
  useEffect(()=>{
    if(isInClient==false)
    {
    SetIsInClient(true)
  }
  },[isInClient,SetIsInClient])
    const {data}=useSession()
    const dispatch = useDispatch()
    console.log(data?.user)
    if(data?.user)
    {



    // const offerToUser=api.example.findOffer.useQuery({name:'fitness park'}).data
    // console.log(offerToUser)

    console.log(dashboardData)


async function fetchData(){

}
function getDates() {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);

  return {
    today,
    futureDate,
  };
}
const{futureDate,today}=getDates()
//je map pour trouver les infos
const dataDashboardScreen=dashboardData
  return (
  <main className="flex flex-col lg:flex-row   w-full   ">
   
    <section className=" relative flex flex-col  w-full relative">
     

     
   
    
    <div className="p-4 pt-10">
  
  <div className="grid grid-cols-2 gap-4 lg:flex lg:justify-between lg:p-4 lg:px-20">
  
   <div className="border-2 border-blue-900 rounded-lg p-1 flex items-center justify-center  p-4  gap-3">
   {dashboardData===0?<p></p>:<p className="text-xs lg:text-sm  whitespace-nowrap font-semibold">Nombre de clients : </p>}
    {dashboardData!=null&&dashboardData!=0?  <span className=" font-semibold text-center ">{dashboardData.client}</span> :<span>{"Vous n'avez pas encore ajouter de clients"}</span>}

   </div>
   <div className="border-2 border-blue-900 rounded-lg p-2 flex items-center justify-center p-4 gap-2">
   {dashboardData===0?<p></p>:<p className="text-xs lg:text-sm  font-semibold whitespace-nowrap">{"Nombre de facture émises :"} </p>}
    {dashboardData!=null&&dashboardData!=0?  <span className=" font-semibold text-center ">{dashboardData.bill}</span> :<span>{"Vous n'avez émis aucune facture"}</span>}

   </div>
   <div className="border-2 border-blue-900 rounded-lg py-3  flex items-center justify-center text-left px-4  gap-2">
   {dashboardData===0?<p></p>:<p className="text-xs lg:text-sm  whitespace-nowrap font-semibold">{"Total générer  :"} </p>}   
 {dashboardData!=null&&dashboardData!=0?  <span className="text-green-800 font-semibold ">{dashboardData.priceTotal}€</span> :<span>{"Vous n'avez émis aucune facture"}</span>}

   </div>
   <div className="border-2 border-blue-900 rounded-lg py-3  flex items-center justify-center text-left px-4  gap-2">
   {dashboardData===0?<p></p>:<p className="text-xs lg:text-sm  font-semibold whitespace-nowrap text-center">
    Non payée par les clients :</p>}
    {dashboardData!=null&&dashboardData!=0?  <span className="text-red-400 font-semibold text-center ">{dashboardData.totalBilling}€</span> :<span>{"Vous n'avez émis aucune facture"}</span>}
   

   </div>
   
  </div>

    </div>
</section>

  </main>
  )
    }
}
export default DashboardCoach