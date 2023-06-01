
import { PDFDownloadLink, Document, Page,PDFViewer,BlobProvider } from '@react-pdf/renderer';
import { useState } from "react"
import {v4} from 'uuid'

import { useContext } from 'react';
import {AddEventContext} from '../fonctionality/AddEvent'
import {useDispatch,useSelector} from 'react-redux'
import {RootState } from '../../app/store'
import {FirstStepState,setSecondStepForm} from '../../features/event/eventSlice'
import {AiOutlineUser} from 'react-icons/ai'
import {MdRoom} from 'react-icons/md'
import { useSession } from 'next-auth/react';
type specClient={
  id:string
  fullName:string
}
interface Props {
 backStepForm:()=>void
 nextStepForm:()=>void
  allClient:specClient[]
    
}

//fonction réaction

const RecapitulatifCalendar = () => {
const {data}=useSession()
  const {events,client,saveEvent}=useContext(AddEventContext)
  const firstStepInfo=useSelector((state:RootState)=>state.eventReducer.firstStep)
  const secondStepInfo=useSelector((state:RootState)=>state.eventReducer.secondStep)
  console.log(client)
console.log(client)
  console.log(events)
const findClientName=client?.find(user => user.id === firstStepInfo.clientId);
  const allDataClient=events?.map((e)=>{

    return (<div key={e.id}
           className="flex flex-col  gap-2 pt-2 lg:w-4/5 py-1
              items-center justify-center 
                  ">
              
              <p className="text-slate-600 text-sm font-bold no-italic"> {`${new Date(e?.end).toLocaleDateString()}`}</p>
              <div className="flex items-center justify-center gap-1">
              <p className="text-slate-500 text-xs font-semibold italic">{`${new Date(e?.start).getHours().toLocaleString()+" H:"+new Date(e.start).getMinutes().toString().padStart(2,'0')}`}</p>
            <p className='text-slate-50 text-xs font-bold italic'>-</p>
              <p className="text-slate-500 text-xs font-semibold">{`${new Date(e?.end).getHours().toLocaleString()+" H:"+new Date(e.end).getMinutes().toString().padStart(2,'0')}`}</p>
              </div>
        
          </div>)
  })
// const [totalPriceToSave,setTotalPriceToSave]=useState({totalPrice:0,totalHours:0,clientName:''})
// console.log(userLoged)
// let totalPrice=0
// let totalPriceForElite=0

// console.log(manualyEvent)

// const nameClientIndex=allClient?.findIndex((e)=>{
//   return firstStepForm.client===e.id
// })
// console.log(nameClientIndex)

// const nameClient=allClient[nameClientIndex]?.fullName
// const allIdEvent:string[]=[]

// let allPrice=0

// let totalHours=0
// const allEventsElements=manualyEvent.map((e)=>{
//   totalPrice+=e?.price
//   totalHours+=e?.hours
//   console.log(e.hours)
//   console.log(firstStepForm.typeOfSeance)
// if(firstStepForm.typeOfSeance=='1' ||firstStepForm.typeOfSeance=='2'){
// totalPriceForElite=40
// }
// else if(firstStepForm.typeOfSeance==="3" ){
// totalPriceForElite=39
// }
// else if(firstStepForm.typeOfSeance=='4' ){
// totalPriceForElite=38
// }
// allPrice+=totalPriceForElite*e.hours
//   allIdEvent.push(e.id)
//     return (<div key={e.id}
//      className="flex flex-col gap-2  items-center justify-center  ">
        
//         <p className="text-slate-700 font-semibold">Le {`${new Date(e?.end).toLocaleDateString()}`}</p>
//         <div className="flex items-center justify-center gap-2">
//         <p className="text-slate-500 text-sm font-semibold">De {`${new Date(e?.start).getHours().toLocaleString()+" H:"+new Date(e.start).getMinutes().toString().padStart(2,'0')}`}</p>
//         <p className="text-slate-500 text-sm font-semibold">À {`${new Date(e?.end).getHours().toLocaleString()+" H:"+new Date(e.end).getMinutes().toString().padStart(2,'0')}`}</p>
//         </div>
  
//     </div>)
// })
// if(allEventsElements){
// {
//   if(totalPriceToSave.totalPrice==0)
//   {
//   setTotalPriceToSave((prev)=>{
//     if(prev.totalPrice!=totalPrice)
//     {
//       return ({...prev,totalPrice:totalPrice,totalHours:totalHours,clientName:nameClient})
//     }
//   else {
//     return prev
//   } 
  
//   })
// }
// }
// }
async function handleAddData(){

// const momo=events.map(({end,start,...rest})=>{

//   return {...rest}
// })
const momoTest=events.map((eventData)=>{
  const {id,...rest}=eventData
  return( {...rest,title:firstStepInfo.title,room:secondStepInfo.programmeName,
    client:firstStepInfo.clientId,coachId:data?.user.id})
})
console.log(momoTest)

//   manualyEvent.map(async(e)=>{
//     const docBatch =  batch.set(doc(collection(db, 'users',userLoged,'events')), {
//      ...e,clientName:nameClient,clientId:firstStepForm.client,type:firstStepForm.type
//     })
//   })
//   batch.set(doc(collection(db,'facturation')),{

//     id:v4(),
//     price:totalPrice,
//     clientId:firstStepForm.client,
//     madeAt:new Date(),
//     eventId:allIdEvent,
//     salle:firstStepForm.salle,
//     isPaid:false,
//     priceElite:allPrice,
   
//     coachId:userLoged,details:{clientName:nameClient,typeDeProgramme:firstStepForm.type,
//       coachName:userLogedInfo.firstName}

//   })
//   console.log(manualyEvent)
//   await batch.commit().then(()=>nextStepForm())

 
// }
// console.log(firstStepForm)
// console.log(totalPriceToSave)
}
  return (
    <section className="flex flex-col w-full gap-10 ">
      <h2 className="text-xl font-semibold text-slate-800 ">Titre : {firstStepInfo.title}</h2>
    <div className="flex flex-row gap-8 w-full justify-between items-center ">

      <div className=''>
    {secondStepInfo.programmeName=='classique'? <p className=''>Formule : <span className='font-semibold'>classique</span></p>: 
    <p className='flex items-center gap-4 font-semibold'><span>          <MdRoom className='inline' size={20 } color='black'/>
</span>{secondStepInfo.programmeName}</p>}
</div>
    <div className='flex gap-4 ' >
    <AiOutlineUser size={20} color='black'/>
    <p className='font-semibold '>{findClientName?.name}</p>
    </div>
    
       
    </div>
    <h3 className="font-bold text-xl text-center text-slate-700">Vos séances inscrites :  </h3>

    <div className="grid grid-cols-3  lg:grid-cols-4 gap-6  place-content-center place-items-center
        lg:my-10 lg:border-none  py-3 px-1   bg-slate-200 shadow-sm rounded-md  border-slate-800  
        lg:p-4 w-full lg:w-full ">
        {allDataClient}

        </div>
    <div className="border-b-2 border-slate-400 pb-10">
      <p className="text-lg text-right">Total : 
      <span  className="font-semibold"> {}€</span>
      </p>
    </div>
    <div className="flex flex-col w-full items-center justify-center">
   
    {/* { totalPriceToSave&& 
    <BlobProvider document={<InvoiceClient dataCoach={firstStepForm}
      dataForBilling={{coachName:userLogedInfo.lastName
   ,...totalPriceToSave}}/>}>
      {({ blob, url, loading, error }) => {
        // Do whatever you need with blob here

        if(url){
       return( <a  className="bg-green-600 py-3 px-4 max-w-[300px] text-slate-50 rounded-lg font-bold"
       href={url} target="_blank" rel="noopener noreferrer ">
        Previsualiser la facture 
      </a>)}
      }}
      </BlobProvider>} */}
  
    </div>
    <div className="flex flex-col items-center justify-center gap-8  justify-self-end">
      <button onClick={handleAddData}
      className="p-2 bg-slate-700 font-semibold px-4 text-slate-50 rounded-lg">Confirmer et sauvegarder</button>
      {/* <StepFormBack backForm={backStepForm}/> */}
    </div>
    </section>
  )

}
export default RecapitulatifCalendar