import { useForm } from 'react-hook-form';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,useMediaQuery,
    ModalFooter,useDisclosure,
   
    ModalCloseButton,Button
  } from '@chakra-ui/react'
  import {useRef, useState} from 'react'
import { v4 } from 'uuid';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {api} from '../../utils/api'
import CoachAlerteValidation from './CoachAlerteValidation';
import InvoiceElite from './InvoiceElite';
import { BlobProvider} from '@react-pdf/renderer';
import DatePickerComponent from '../calendarComponents/DatePicker';

// ce qui sera transmis au formulaire par react hook form 

type ClientData={
  monthSelected:string
  rommName:string
}

//validation de donner à travers Zod
const validationSchema = z.object({
  monthSelected:z.string().nonempty('Vous devez sélectionner un mois'),
  rommName:z.string().nonempty('Vous devez sélectionner votre salle '),
})



//function qui affiche à l'ecran


export default function BilanElite() {
const [isFetchedData,setIsFetchData]=useState({roomName:''})
const [isPdfDone,setIsPdfDone]=useState('')
const [isSaveBilan,setSaveBilan]=useState(false)
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const modalSize = isLargerThan768 ? "5xl" : "full";
  const allSalle = api.example.availaibleRoom.useQuery(undefined,{staleTime:20000,refetchOnWindowFocus:false}).data
    const { isOpen, onOpen, onClose } = useDisclosure()
    const fetchBills = api.coachRouter.allBillsPaidClient.useMutation()

    const {data}=fetchBills
    const {isOpen:isOpenValidate,onOpen:onOpenValdate,onClose:onCloseValidate}=useDisclosure()

    const allElement=fetchBills.data!='non valide '&&fetchBills.data!=undefined&&fetchBills?.data?.billingData?.map((e)=>{
return (<tr  key={v4()}
className='grid grid-cols-5 w-full text-center'>

  <td  key={v4()}>{e.createdAt.toLocaleDateString()}</td>
  <td  key={v4()}>{e.place}</td>
  <td key={v4()}>{e.type_offer}</td>
  <td  key={v4()}>{e.hours}</td>
  <td  key={v4()}>{e.price_coach}</td>
</tr>
  )
})
const allRoom=allSalle&&allSalle?.map((e)=>{
 return <option value={e.id} key={e.id}>{e.room_name}</option>
})
    const initialRef = useRef(null)
   
    const finalRef = useRef(null)
  const [isFetched,setIsFetched]=useState(false)
  const eliteBilan=api.coachRouter.bilanCoachElite.useMutation()
    const { register, handleSubmit, formState:{errors},getValues,reset,setValue} = useForm(
      
      {defaultValues:{monthSelected:"",rommName:""
    
    
    
    }, resolver: zodResolver(validationSchema),});


//function async pour creer un client au niveau de firebase

async function createClient(data:ClientData) {


  console.log(data)


  let DayVal= new Date(data.monthSelected)

  let dayStart=new Date(DayVal.getFullYear(),DayVal.getMonth()+1,1)
  let dayEnd=new Date(DayVal.getFullYear(),DayVal.getMonth()+2,0,23,59,59)

  console.log(dayEnd,dayStart)
   const momo = await fetchBills.mutateAsync({ 
    dateEnd:dayEnd,dateSart:dayStart,roomName:data.rommName })


   if(momo=="non valide ")
{

  onOpenValdate()
}
else if(momo){
  console.log(momo)
  const roomInfo=allSalle?.filter((e)=>{
   return e.id===Number(data.rommName)
  })
  if(roomInfo!=undefined&&roomInfo[0]?.room_name!=undefined)
  {
  setIsFetchData((prev)=>{
    return {...prev,roomName:roomInfo[0]?.room_name!=undefined? roomInfo[0].room_name : ''}
  })
}
setIsFetched(true)
}
}
  
 async function sendBillingData(){

  setSaveBilan(true)
  if(fetchBills.data!='non valide ')
  {
    const idBilling= fetchBills.data?.billingData.map(e=>{
      return {id:e.id}})
    const idPlace=getValues('rommName')
    const totalPrice=fetchBills.data?.billingData.reduce((acc,current)=>{
      return acc+current.price_coach
    },0)

if(totalPrice!=undefined&&idPlace!=undefined&&idBilling!=undefined)
{
    const newBillElite= await eliteBilan.mutateAsync({price:totalPrice,
      billingId:idBilling,placeId:idPlace,billToSend:isPdfDone, monthSelected:getValues('monthSelected')})
      console.log(newBillElite)

    }
  }
  setSaveBilan(false)

 }
//fin de la function fermeture de l'appp

function saveDateFunction(dateToSet:string){
  setValue('monthSelected',dateToSet)

}

    return (
      <>
      <CoachAlerteValidation isOpen={isOpenValidate} onClose={onCloseValidate} 
      onOpen={onOpenValdate}/>
        <button onClick={onOpen} className="relative  bg-slate-800 py-3 text-slate-50 font-semibold py-2 px-6 rounded-lg">

        Bilan mensuel 

        </button>
       

        
       
        <Modal  size={modalSize}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={()=>{
            reset()
            setIsFetched(false)
            onClose()}
        }
        >
          
  <ModalOverlay />

         <ModalContent className='w-full'>
         <ModalHeader className='text-center
          text-slate-800'>Vous faites votre bilan mensuel à Élite</ModalHeader>
          <ModalCloseButton />

          <form className='flex flex-col gap-4 p-2 lg:p-10 bg-white w-full' onSubmit={
   

          handleSubmit(createClient)}>
         <div className='flex flex-col w-full gap-3'>
              <label htmlFor='lastName'  className='font-semibold text-sm'>Selectionner le mois :</label>
              <DatePickerComponent  
              saveDate={saveDateFunction}/>
           <p className='text-xs font-semibold text-red-500'>{errors.monthSelected?.message}</p>
           
           
           <label htmlFor='firstName' className='font-semibold text-sm' >Selectonner votre salle : </label>

            <select  disabled={isFetched}
            placeholder='Selectionner votre salle'  id='firstName'  
             className='form-input rounded-md py-3 px-3 bg-slate-50'
              {...register('rommName')}>
                <option value={''}>Selectonner votre salle </option>
                {allRoom}
              </select>


                      <p className='text-xs font-semibold text-red-500'>{errors.rommName?.message}</p>
              
              
                   
              
           {isFetched==false&& <button  
                
                
                type={'submit'}  className='py-2 px-8 bg-slate-800 text-slate-50 rounded-lg 
                max-w-fit self-center'>Confirmer</button>}
                
                {isFetched&&<button   className='py-2 px-8 bg-slate-800 text-slate-50 rounded-lg max-w-fit self-center'  onClick={()=>{
                 
                    setIsFetched(false)
                   
                }} type='button'>Annuler</button>}
                 </div>
          
{/**Tarif une seance par semaine
 * 
 * cela feras partie de la step 2
 */}

      {isFetched&&
      <section className='w-full pt-10 flex flex-col'>
      <table className='table-auto'>
            <thead className='w-full'>
                  <tr className='grid grid-cols-5 w-full text-center'>
                    <th className='text-center flex justify-center flex-row w-full'>
                      date de creation
                    </th>
                    <th className='w-full text-center'>
                     salle
                    </th>
                    <th className='w-full text-center'>
                     type
                    </th>
                    <th>
                      heures
                    </th>
                    <th>
                      total
                    </th>
                  </tr>
            </thead>
            <tbody className=' border-t-2 w-full flex flex-col gap-4 pt-2 '>
              {allElement}
            </tbody>
          </table>

          <div className='flex items-center justify-center w-full pt-10'>
  { isFetched&& data!='non valide '&& data!=undefined&&<BlobProvider document={<InvoiceElite roomName={isFetchedData.roomName}
   billInfo={data.billingData} coachData={data.coachData}/>}>
      {({ blob, url, loading, error }) => {
        // Do whatever you need with blob here

        if(blob!=null)
        {        
          const reader = new FileReader();
reader.readAsDataURL(blob);
reader.onloadend = function() {
  const base64data = reader.result?.toString().replace('data:', '')
  .replace(/^.+,/, '');


  base64data!=undefined&&setIsPdfDone(base64data)}
}
        return url&&<a href={url}  className="max-w-fit bg-cyan-800 text-slate-50 font-semibold rounded-lg px-8 py-2" target="_blank">Prévisualiser la facture </a>;
      }}
    </BlobProvider>}
    </div>
          </section>}

{       isFetched&&fetchBills.data!='non valide '&&fetchBills.data?.billingData!=undefined&&fetchBills.data?.billingData?.length>0&&<button onClick={sendBillingData} disabled={isSaveBilan}
type='button' className='bg-slate-800 px-8 mt-10 py-3 w-fit text-slate-100 self-center rounded-lg font-bold'
>{'Transmettre à Elite'}</button>
}        
          <ModalFooter >
          
       
          <Button  onClick={
           ()=> {   setIsFetched(false)
            reset()
                onClose()}}>Annuler</Button>

         </ModalFooter>
         </form>
         </ModalContent>
        
        </Modal>
        
      
      </>
    )
  }