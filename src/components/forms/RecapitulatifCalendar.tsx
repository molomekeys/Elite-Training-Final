
import { PDFDownloadLink, Document, Page,PDFViewer,BlobProvider } from '@react-pdf/renderer';
import { useEffect, useState } from "react"
import {v4} from 'uuid'
import InvoiceComponent from '../fonctionality/InvoiceComponent';
import { useContext } from 'react';
import {AddEventContext} from '../fonctionality/AddEvent'
import {useDispatch,useSelector} from 'react-redux'
import {RootState } from '../../app/store'
import {FirstStepState,setSecondStepForm} from '../../features/event/eventSlice'
import {AiOutlineUser} from 'react-icons/ai'
import {MdRoom} from 'react-icons/md'
import { useSession } from 'next-auth/react';
import { api } from "~/utils/api"
import { clearTheStore} from '~/features/event/eventSlice'

type specClient={
  id:string
  fullName:string
}
interface Props {
 backStepForm:()=>void
 nextStepForm:()=>void
  allClient:specClient[]
    
}

//fonction react

const RecapitulatifCalendar = ({close}:{close:()=>void}) => {

  const addEvents=api.example.addEventsCalendar.useMutation()
const dipatch =useDispatch()
  const {events,client,saveEvent,allOffert,saveEventCalendarContext,clearEventData}=useContext(AddEventContext)
  const firstStepInfo=useSelector((state:RootState)=>state.eventReducer.firstStep)
  const secondStepInfo=useSelector((state:RootState)=>state.eventReducer.secondStep)
  const [selectedPriceOffer,setSelectedPriceOffer]=useState({price_client:0,price_coach:0,
    roomName:'',type:'',hours:0,id:0})
    const [isFetched,setIsFetched] =useState(false)

// useEffect permet lors de l'affichage du premier render de faire les calcules des prix

useEffect(()=>{


// le calcul des heures
  const totalHours=events.reduce((accumulator, currentValue) => accumulator + currentValue.hours, 0);

  //ici je filtre pour trouver la salle correspondante 
  const selectedOffer=allOffert.filter((e)=>{
    return String(e.id)===secondStepInfo.programmeName
   })
   //ici je fait le filtre pour mettre dans le state après avoir filtré pour le coaching 
  if(firstStepInfo.productCategory=='coaching'){
    const selectedOfferTest=selectedOffer[0]?.pricing?.filter((e)=>{
   
      return e.seance_week ===(secondStepInfo.seanceWeekNumber)
    
  
    
  })
// ici je  sauvegarde les info dans le state

  if(selectedOfferTest){
    setSelectedPriceOffer((prev)=> {
      if(selectedOfferTest[0]?.client_price!=undefined &&selectedOffer[0]?.room_name!=undefined)
      {
        return {id:selectedOfferTest[0].id,price_coach:selectedOfferTest[0].coach_price,
          hours:totalHours,price_client:selectedOfferTest[0]?.client_price,roomName:selectedOffer[0]?.room_name,type:firstStepInfo.productCategory}

      }
      else {
        return prev
      }
    })
  }
  }
  else if(firstStepInfo.productCategory=='programme')
  {
    //ici je filtre pour faire le calcul pour trouver le bon prix pour le programme que je met 
    //après dans un state
    const selectedProgrammeTest=selectedOffer[0]?.programme
    if(selectedProgrammeTest!=undefined && selectedProgrammeTest!=null)
    {
     
      setSelectedPriceOffer((prev)=> {
        if(selectedOffer[0]?.room_name!=undefined)
        {
          return {price_client:selectedProgrammeTest.client_price,price_coach:selectedProgrammeTest.coach_price,id:selectedProgrammeTest.id,hours:totalHours,price:selectedProgrammeTest.client_price,roomName:selectedOffer[0]?.room_name,type:firstStepInfo.productCategory}

        }
        else {
          return prev
        }
      })
    
    }
    
  }

},[firstStepInfo,secondStepInfo,setSelectedPriceOffer,setSelectedPriceOffer])


//fin du useEffect


const {data}=useSession()



  const selectedOffer=allOffert.filter((e)=>{
   return String(e.id)===secondStepInfo.programmeName
  })

  const selectedOfferTest=selectedOffer[0]?.pricing?.filter((e)=>{
   
      return e.seance_week ===(secondStepInfo.seanceWeekNumber)
    
  
    
  })

 


  // ici pour définir les dates d'écheance
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
const [isPdf,setIsPdf]=useState('')
const findClientName=client?.filter(user => user.idClient === firstStepInfo.clientId);
  const allDataClient=events?.map((e)=>{
    
    return (<div key={e.id}
           className="flex flex-col  gap-2 pt-2 w-full  py-1
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


  // function pour sauvegarder dans la db

async function handleAddData(){

// const momo=events.map(({end,start,...rest})=>{

//   return {...rest}
// })
if(isPdf!=null)
{
  setIsFetched(true)
const momoTest=events.map((eventData)=>{
  const {id,...rest}=eventData
 
  return( {...rest,title:firstStepInfo.title,salle_id:Number(secondStepInfo.programmeName),
    client_id:Number(firstStepInfo.clientId),coach_id:Number(data?.user.coach_table?.id)})

})

if((momoTest!=undefined &&data?.user.coach_table?.id!=undefined)&&
selectedOfferTest!=undefined&&findClientName[0]!=undefined)
{
  
const testMomo= await addEvents.mutateAsync({eventData:[...momoTest],
  billingData:{bill_invoice_pdf:isPdf,price_coach:selectedPriceOffer.price_coach,
  price_client:selectedPriceOffer.price_client,clientEmail:findClientName[0]?.email,clientName:findClientName[0]?.name,
  type:firstStepInfo.productCategory,
  prisma_client_id:Number(firstStepInfo.clientId),
  prisma_coach_id:Number(data?.user.coach_table?.id)
,hours:selectedPriceOffer.hours,prisma_place_id:Number(secondStepInfo.programmeName),
offer_prisma_id:selectedPriceOffer.id}})

dipatch(clearTheStore())

clearEventData()
saveEventCalendarContext()

close()
}
//   

 
}
}

  return (
    <section className="flex flex-col w-full gap-10 ">
      <h2 className="text-xl font-semibold text-slate-800 ">Titre : {firstStepInfo.title}</h2>
    <div className="flex flex-col lg:flex-row gap-8 w-full justify-between lg:items-center ">

      <div className=''>
    {secondStepInfo.programmeName=='classique'? <p className=''>Formule : <span className='font-semibold'>classique</span></p>: 
    <p className='flex items-center gap-4 font-semibold'><span>          <MdRoom className='inline' size={20 } color='black'/>
</span>{selectedOffer[0]?.room_name}</p>}
</div>
    <div className='flex gap-4 ' >
    <AiOutlineUser size={20} color='black'/>
    <p className='font-semibold '>{findClientName[0]?.name +' ('+(findClientName[0]?.email+")")}</p>
    </div>
    
       
    </div>
    <h3 className="font-bold lg:text-xl lg:text-center text-slate-700">Vos séances inscrites :  </h3>

    <div className={`grid grid-cols-2  ${firstStepInfo.productCategory=='coaching'? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-2 lg:gap-6  
    lg:place-content-center lg:place-items-center
        lg:my-10 lg:border-none  py-3 px-1   bg-slate-100 shadow-sm rounded-md  border-slate-800  
        lg:p-4 w-full lg:w-full `}>
        {allDataClient}

        </div>
    <div className="border-b-2 border-slate-400 gap-4 pb-10 flex flex-col lg:flex-row  w-full text-right justify-end ">
 
      <p className="lg:text-lg text-right font-semibold"><span>Le client paiera : </span>{firstStepInfo.productCategory=='programme'? selectedPriceOffer.price_client : 
      selectedPriceOffer.price_client*selectedPriceOffer.hours}
       <span className='font-semibold '>&euro;</span>
     </p>
    
      
    </div>
    <div className="flex flex-col w-full items-center justify-center">
   

  
    </div>
    <div className='flex items-center justify-center w-full'>
    <BlobProvider document={<InvoiceComponent billInfo={selectedPriceOffer}
    
    eventInfo={{clientName:findClientName[0]?.name? findClientName[0].name : '',salleName:selectedOffer[0]?.room_name? selectedOffer[0]?.room_name : '',
    hours:selectedPriceOffer.hours,unitPrice:selectedPriceOffer.price_client,category:firstStepInfo.productCategory,coachName:data?.user.name? data.user.name : ''}}  dateRange={{dateEnd:futureDate,dateStart:today}}/>}>
      {({ blob, url, loading, error }) => {
        // Do whatever you need with blob here
        if(blob!=null)
        {        
          const reader = new FileReader();
reader.readAsDataURL(blob);
reader.onloadend = function() {
  const base64data = reader.result?.toString().replace('data:', '')
  .replace(/^.+,/, '');


  base64data!=undefined&&setIsPdf(base64data)}
}
        

        return url&&<a href={url}  className="max-w-fit bg-cyan-800 text-slate-50 font-semibold rounded-lg px-8 py-2" target="_blank">Prévisualiser la facture </a>;
      }}
    </BlobProvider>
    </div>
    <div className="flex flex-col items-center justify-center gap-8  justify-self-end">
      <button onClick={handleAddData}  disabled={isFetched}
      className="p-2 bg-slate-700 font-semibold px-4 text-slate-50 rounded-lg">Confirmer et sauvegarder</button>
      {/* <StepFormBack backForm={backStepForm}/> */}
    </div>
    </section>
  )

}
export default RecapitulatifCalendar