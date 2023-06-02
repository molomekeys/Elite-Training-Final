import { useSession } from "next-auth/react"

import { api } from "~/utils/api"
import {  useDispatch } from 'react-redux'

import { PDFDownloadLink,BlobProvider} from '@react-pdf/renderer';
import { useEffect, useState } from "react";
import InvoiceComponent from "~/components/fonctionality/InvoiceComponent";

const DashboardCoach = () => {
 
  const[isInClient,SetIsInClient]=useState(false)
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
const dataCoach =api.example.fetchDataLoginCoach.useQuery()

const momoTest=api.example.addEventsCalendar.useMutation()
console.log(momoTest)
    console.log('render')
   
    const momo =dataCoach.data
    const testmomo=momo?.map((e)=>{
      return {...e.UserIdPrisma,createdAt:e.created_at}
    })
    console.log(testmomo)
    // const offerToUser=api.example.findOffer.useQuery({name:'fitness park'}).data
    // console.log(offerToUser)

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


async function fetchData(){
  const momo = await momoTest.mutateAsync()
  console.log(momo)
}
  return (
  <main className="flex flex-col lg:flex-row   w-full   ">
   
    <section className=" relative flex flex-col  w-full relative">
     

     
   
    <div className="flex flex-col">
   
  <button onClick={fetchData}>Test momo</button>
    </div>
    <div>
   {/* {isInClient&& <PDFDownloadLink document={<InvoiceComponent dateRange={{dateEnd:futureDate,dateStart:today}}  />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>} */}

  { isInClient&& <BlobProvider document={<InvoiceComponent hours={40} dateRange={{dateEnd:futureDate,dateStart:today}}/>}>
      {({ blob, url, loading, error }) => {
        // Do whatever you need with blob here

        
        return url&&<a href={url}  target="_blank">There's something going on on the fly</a>;
      }}
    </BlobProvider>}
    </div>
</section>

  </main>
  )
    }
}
export default DashboardCoach