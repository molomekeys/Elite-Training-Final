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


// ce qui sera transmis au formulaire par react hook form 

type ClientData={
  monthSelected:string
  rommName:string
}

//validation de donner à travers Zod
const validationSchema = z.object({
  monthSelected:z.string(),
  rommName:z.string()
})



//function qui affiche à l'ecran


export default function BilanElite() {


  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const modalSize = isLargerThan768 ? "5xl" : "full";
  const allSalle = api.example.availaibleRoom.useQuery().data
    const { isOpen, onOpen, onClose } = useDisclosure()
    const fetchBills = api.example.billEliteForCoach.useMutation()
    const {isOpen:isOpenValidate,onOpen:onOpenValdate,onClose:onCloseValidate}=useDisclosure()
console.log(fetchBills.data)
const allElement=fetchBills.data!='non valide '&&fetchBills.data!=undefined&&fetchBills?.data?.map((e)=>{
return (<tr  key={v4()}
className='grid grid-cols-4 w-full text-center'>

  <td  key={v4()}>{e.createdAt.toLocaleDateString()}</td>
  <td  key={v4()}>{e.place}</td>
  <td  key={v4()}>{e.hours}</td>
  <td  key={v4()}>{e.hours*e.price}</td>
</tr>
  )
})
const allRoom=allSalle&&allSalle?.map((e)=>{
 return <option value={e.id} key={e.id}>{e.room_name}</option>
})
    const initialRef = useRef(null)
   
    const finalRef = useRef(null)
  const [isFetched,setIsFetched]=useState(false)
    const { register, handleSubmit ,formState:{errors,defaultValues},reset} = useForm(
      
      {defaultValues:{monthSelected:"",rommName:""
    
    
    
    }, resolver: zodResolver(validationSchema),});


//function async pour creer un client au niveau de firebase

async function createClient(data:ClientData) {


  console.log(data)
   const momo = await fetchBills.mutateAsync({ dateEnd:new Date(data.monthSelected),dateSart:new Date(data.monthSelected),roomName:data.rommName })
if(momo=="non valide ")
{

  onOpenValdate()
}
else if(momo){
  console.log(momo)
setIsFetched(true)
}
}
  
 
//fin de la function fermeture de l'appp


    return (
      <>
      <CoachAlerteValidation isOpen={isOpenValidate} onClose={onCloseValidate} onOpen={onOpenValdate}/>
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

         <ModalContent>
         <ModalHeader className='text-center text-slate-800'>Vous faites votre bilan mensuel à Élite</ModalHeader>
          <ModalCloseButton />

          <form className='flex flex-col gap-4 p-2 lg:p-10 bg-white' onSubmit={
   

          handleSubmit(createClient)}>
         <div className='flex flex-col w-full gap-3'>
              <label htmlFor='lastName'  className='font-semibold text-sm'>Selectionner le mois :</label>
            <input  disabled={isFetched}
             type={'month'}  className='form-input py-2 px-3  rounded-md bg-slate-50  py-3' id='lastName'
       {...register('monthSelected')}
            
           />
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
              
              
                   
              
                <button  disabled={isFetched}
                
                
                type='submit' className='py-2 px-8 bg-slate-800 text-slate-50 rounded-lg max-w-fit self-center'>{isFetched? 'confirmez vos dates' :'Suivant'}</button> </div>

{/**Tarif une seance par semaine
 * 
 * cela feras partie de la step 2
 */}

      {isFetched&&
      <section className='w-full pt-10 flex flex-col'>
      <table className='table-auto'>
            <thead className='w-full'>
                  <tr className='grid grid-cols-4 w-full text-center'>
                    <th className='text-center flex justify-center flex-row w-full'>
                      date de creation
                    </th>
                    <th className='w-full text-center'>
                     salle
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
          </section>}
        
          <ModalFooter >
          
       
          <Button  onClick={
           ()=> {   reset()
                onClose()}}>Annuler</Button>

         </ModalFooter>
         </form>
         </ModalContent>
        
        </Modal>
        
      
      </>
    )
  }