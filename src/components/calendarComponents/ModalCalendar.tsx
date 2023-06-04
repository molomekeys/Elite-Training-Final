import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,Button,
    ModalCloseButton,useMediaQuery
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import {useForm} from 'react-hook-form'



  type ModifiedEventDat={
    dateEvent:string 
    hourStart:string 
    hourEnd:string
    customNote?:string
   
  }
  type inFo={
    title:string
    start : Date
    end : Date
    salle:string
    id:string
    clientName:string
   
        customNote?:string
  }
  interface Props{
informationData:inFo
openModal:boolean
updateScreen?:()=>void
changeTheModal:()=>void
  }
  import { GoNote } from 'react-icons/go';
  import { AiOutlineUser } from 'react-icons/ai';
  import { BsFillCalendarWeekFill } from 'react-icons/bs';
  import {MdRoom, MdWhereToVote} from 'react-icons/md'
export default function ModelCalendrier({informationData,openModal,updateScreen,changeTheModal}:Props) {
   

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const modalSize = isLargerThan768 ? "3xl" : "full";
  const options = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const defaultTime= new Date().setMilliseconds(0)

  const { register, handleSubmit, watch, formState: { errors },reset } = useForm(
    {defaultValues:{dateEvent:'',hourStart:'',hourEnd:
  '',customNote:informationData?.customNote
  }});

const [isChangeEvent,setIsChangeEvent]=useState(true)



console.log(watch('customNote'))







//function pour modifier les dates
async function handleChangeDate(val:ModifiedEventDat){
  console.log(val)






  //avec ça je ferme le model une fois que tout est realiser
changeTheModal()


  //fin de la function 
}

//debut de la function react pour afficher a l'ecran

    return (
      <>

        <Modal isOpen={openModal}   
        onClose={
         ()=>{ 
          reset()
          setIsChangeEvent(true)
          changeTheModal()}} size={modalSize}>
          <ModalOverlay className='' />
          <ModalContent className='flex flex-col  lg:pt-0   shadow-xl'>
            <form className='w-full flex flex-col   ' onSubmit={handleSubmit(handleChangeDate)}>
            <ModalHeader className={` ${isChangeEvent? 'text-left g text-slate-800' :'text-center text-slate-50 bg-cyan-800'}`}>{isChangeEvent? informationData.title : 'Vous modifier les dates'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody className='w-full h-full flex flex-col  items-center justify-center'>
           <section className='flex flex-col gap-4  w-full h-full pt-4 '>
        
        
            
            
            <div className='flex gap-10
             lg:flex-row flex-col  w-full h-full '>

          
           
        

<div className='flex flex-col   w-full gap-0'>


{/**cec
i 

c'est pour afficher l'agenda et non pas la page pour la modifier
*/}

{ isChangeEvent?  <div className='flex gap-6 '>
<BsFillCalendarWeekFill size={20} color='black'/>

  <p className='text-left
            font-semibold text-slate-700 
             '> {informationData?.start?.toLocaleDateString()}</p>
           <p className=' border-slate-500 '>
             {informationData.start.getHours().toLocaleString() +':'+ informationData.start.getMinutes().toLocaleString().padStart(2,'0')} -</p> 
             <p className=''>{informationData.end.getHours().toLocaleString() +':'+ informationData.start.getMinutes().toLocaleString().padStart(2,'0')}</p> 
             </div> :
          <div className='flex flex-col w-full gap-6   text-left'> 
            <label className='font-semibold text-sm'>Indiquez la nouvelle date d&apos;entrainement</label>
            <input type={'date'} className=" form-input w-full
               bg-slate-50  py-3  rounded-lg"
         {...register('dateEvent')}
          
            disabled={isChangeEvent} 
            />
            </div>}



          
           
          </div>
            </div>

     
           <div className='flex items-center w-full  justify-center'>            
           {!isChangeEvent&&<div className=' flex flex-col w-full  lg:px-4 lg:flex-row gap-8 w-full lg:w-2/5'>
            <div className=' w-full flex flex-col 
            lg:flex-row lg:items-center justify-center '>
          <label className='lg:w-1/5 font-semibold text-sm'>De :</label>
          <div className='flex items-center gap-8 w-full'>
         
          <input  type={'time'} placeholder="test bro"
         {...register('hourStart')}
           className=' w-full  form-input bg-slate-50 py-3  rounded-lg'
            disabled={isChangeEvent} />
            </div>
            
            </div>
            <div className='gap-3 w-full flex lg:items-center justify-center flex-col lg:flex-row'>
            <label className='w-1/5 font-semibold text-sm'>À :</label>
          <input type={'time'} className=" w-full bg-slate-50 form-input py-3 rounded-lg"
{...register('hourEnd') } 

disabled={isChangeEvent} 
            />
          </div>
          </div>}
            </div>
            <div className='flex w-full   h-full gap-10  lg:items-center lg:justify-between'>
        <div className='w-full flex gap-6 lg:justify-center'>
       <AiOutlineUser size={20} color='black'/>
          <span className='font-bold text-slate-600 text-sm'>{informationData?.clientName}</span>

        </div>
        <div className='w-full flex gap-6 lg:justify-center'>
          <MdRoom size={20 } color='black'/>
          <span className='font-bold text-sm text-slate-600'>{informationData.salle}</span>
        </div>
        </div>

            <div className='flex  border-slate-200 flex-col lg:flex-row  h-full gap-6  pt-4  items-center min-h-[50px] w-full'>
           
         
            <GoNote size={20} color='rgb(36,36,36)' className='self-start lg:self-center'/>
               
                {isChangeEvent?  
                <p className=' border-t-2 border-slate-400  pt-2
                 border-b-0 border-x-0 w-full'>{informationData.customNote? informationData.customNote : "Il n'y a aucune note pour cette évenement "} </p> :

                <textarea className='resize-none outline-none  w-full
                form-textarea rounded-md border-2 border-slate-300 ' {...register('customNote')}placeholder='Indiquez la note que vous voulez ajouter à cette agenda'></textarea>}
                </div>
                </section>
            </ModalBody>
  
            <ModalFooter>
              {isChangeEvent&& 
              
              
              <button   type='button'
              className='bg-slate-800 text-slate-50 px-4 mr-3 py-2 rounded-lg'
              onClick={()=>{
                setIsChangeEvent(true)
                reset()
                changeTheModal()
                }}>
                Fermer
              </button>}

             {!isChangeEvent&& <button type='submit' 
              className='bg-cyan-800 text-slate-50 mr-5 px-3 py-2 rounded-lg'>Enregistrer </button>}
              
              <button type='button'
               className='bg-slate-100 hover:bg-slate-800 hover:text-slate-50 text-slate-800 px-3 py-2 rounded-lg font-semibold'
              
              onClick={()=>setIsChangeEvent((prev)=>(prev=!prev))}>{isChangeEvent? 'Modifier' : 'Réviser'}</button>
            </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    )
  }