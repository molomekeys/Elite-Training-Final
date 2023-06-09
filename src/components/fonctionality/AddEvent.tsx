import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,useMediaQuery,
    ModalFooter,
    ModalBody,useDisclosure,
    ModalCloseButton,Button,Progress
  } from '@chakra-ui/react'
import FirstStepAddEvent from '../forms/FirstStepAddEvent'
import { motion } from 'framer-motion'
import {useState,createContext} from 'react'
import SecondStepAddEvent from '../forms/SecondStepAddEvent'
import SmartFormInput from '../forms/SmartFormAutoEvent'
import DateFormSelect from '../forms/DateFormSelect'
import { backStepForm ,clearTheStore} from '~/features/event/eventSlice'
import { useDispatch,useSelector } from 'react-redux'
import RecapitulatifCalendar from '../forms/RecapitulatifCalendar' 
import { api } from '~/utils/api'

import type { RootState } from '~/app/store'
import { Events } from '~/pages/coach/planning'
export type AllClientType={
  
  createdAt: Date;
  id: string;
  name: string;
  email: string;
  idClient:string
  phone_number: string;

}
export type EventsType= {
  start: Date;
  id: string;
  end: Date;
 
  hours: number;
}
export type EventsTypeAgenda= {
  start: Date;
  id: string;
  end: Date;

  hours: number;
}

export type AllPrice={
  pricing: {
      id: number;
      stripe_id: string;
      seance_week: string;
      coach_price: number;
      client_price: number;
      type_offert: string;
  }[];
  id: number;
  room_name: string;
}
interface PropsAddEvent{
  updateData:(e:Events[])=>void
  allClient:AllClientType[]
  allRoom:AllPrice[]
  saveEventCalendar:()=>void

}
interface ContextEventInterface{
  client:AllClientType[],
events:EventsTypeAgenda[], saveEvent:(e:Events[])=>void,
functionEvent:(eventData:EventsType[])=>void
functionAddSubEvent:(eventData:EventsType[])=>void
clearEventData:()=>void
allOffert :AllPrice[]
saveEventCalendarContext:()=>void
subStepForm:number 
nextSubStepForm:(stepForm:number)=>void
backSubStepForm:()=>void
clearSubStep?:()=>void
}

// react context

export const AddEventContext=createContext<ContextEventInterface>(
  {subStepForm:1,clearSubStep:()=>{},backSubStepForm:()=>{
    return
  },nextSubStepForm:(momo)=>{
    return 
  }
    ,saveEventCalendarContext:()=>{
    return
  },functionAddSubEvent:()=>{
    return 
  },allOffert:[],clearEventData:()=>{
    return 
  },client:[],saveEvent:(e:Events[])=>{
    return
  },
  events:
  [{end:new Date(),hours:5,id:'1',start:new Date()}] ,functionEvent:()=>{
    return 
  }})



  export const defaultValue={  dateFirstWeek: "",
  dateSecondWeek:"",
  dateThirdWeek:"",
  dateFourthWeek:"",
  
  hourStartFirstWeek:"",
  hourEndFirstWeek:"",
  
  hourStartSecondWeek:"",
  hourEndSecondWeek:"",
  
  hourStartThirdWeek:"",
  hourEndThirdWeek:"",
  
  hourStartFourthWeek:"",
  hourEndFourthWeek:"",
  }

  // react function 


const AddEvent = ({updateData,allClient,allRoom,saveEventCalendar}:PropsAddEvent) => {

  const [firstManualyForm,setFirstManualyForm]=useState(defaultValue)
  const [secondManualyForm,setSecondManualyForm]=useState(defaultValue)
  const [thirdManualyForm,setThirdManualyForm]=useState(defaultValue)

 
//cela permet d'utiliser chakra ui
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
    const modalSize = isLargerThan768 ? "5xl" : "full";
const dispatch=useDispatch()

const stepForm=useSelector((state:RootState)=>state.eventReducer.stepForm)

    //le stat qui controler les étapes du forms
    const [isEventAdded,setIsEventAdded]=useState<EventsType[]>([])
  const [subStepForm,setSubStepForm]=useState(1)


//pour clear le sous formulaire pour evitez les bugs
function clearSubStepForm(){

  setSubStepForm(1)

}




  //sous formulaire pour les dates manuel
 function nextSubStepForm(stepForm:number){
  setSubStepForm((prev)=>{
    if(prev==stepForm)
    {
      return prev
    }
    return prev+=1
  })
 }


 function backSubStepForm(){
  setSubStepForm((prev)=>{

    //si le numero ==1
  if(prev==1)
  {
    return prev
  }
  //pour les autres valeurs
  else {
  return prev-=1
}
 })
 }
 //pour les formulaire en manuel fonction

 function saveFirstSubEvent (events:typeof defaultValue){
  setFirstManualyForm(events)
}
function saveSecondSubEvent (events:typeof defaultValue){
  setSecondManualyForm(events)
}
function saveThirdSubEvent (events:typeof defaultValue){
  setThirdManualyForm(events)
}
 //fin des fonctions 


    const [isStepForm,setIsStepForm]=useState(1)
    console.log('render from add Event')

    const[formDataSteps,setFormDataSteps]=useState(
      {secondStep:{ programmeName:'',
     
      typeOfDate:'',seanceWeekNumber:''},
      firstStep:{title:'',clientId:'',affiliateGym:'',
      productCategory:''}})
    const[saveSecondStepForm,setSaveSecondStepForm]=useState({
       programmeName:'',

    typeOfDate:'',seanceWeekNumber:''})


//quand le calendar est fait manuelellement pour garder les valeurs 
//premier etape

function saveFirstStep(e:typeof formDataSteps.firstStep){
  setFormDataSteps((prev)=>{
    return({...prev,firstStep:e})
  })

}

//quand le calendar est fait manuelellement pour garder les valeurs 
//deuxieme etape

function saveSecondStep(e:typeof formDataSteps.secondStep){
  setFormDataSteps((prev)=>{
    return({...prev,secondStep:e})
  })

}

////quand le calendar est fait auto pour garder les valeurs 
//du calendrier avec use contexte 

function saveEventData(events:Events[]){
  setIsEventAdded(events)
}

//quand le calendar est fait manuelellement pour garder les valeurs 
//manuel de chaque etape

function saveSubEventData(event:EventsType[]){
  setIsEventAdded((prev)=>[...prev,...event])
}
function clearEventData(){
  setIsEventAdded([])
}
console.log(formDataSteps)

    //la function générale que je passe au 
    //sous formulaire c'est comme ça que react recommande
    function nextStepForm(){
      setIsStepForm((prev)=>prev+=1)
    }
      //la function générale pour revenir  que je passe au 
    //sous formulaire c'est comme ça que react recommande
    function StepBackForm(){
      setIsStepForm((prev)=>{
        if(prev<=1)
        {
          return prev
        }
        else {
         return prev-=1
        }
       })
    }
    console.log('rerender from add Event')

console.log(saveSecondStepForm)
//function réact qui affiche a a l'utilissalateur l'ui

    return (
      <>
      <AddEventContext.Provider value={{backSubStepForm:backSubStepForm,
        saveEventCalendarContext:saveEventCalendar,allOffert:allRoom,saveEvent:updateData,client:allClient? allClient : [],clearEventData:clearEventData,functionAddSubEvent:saveSubEventData,
        events:isEventAdded,functionEvent:saveEventData,subStepForm:subStepForm,nextSubStepForm:nextSubStepForm}}>
        <motion.button   whileHover={{scale:1.05}}
        className='text-slate-50 px-3 py-2 w-min-fit 
          bg-[#3C486B] rounded-lg font-bold   '
        onClick={onOpen}>Facturation client</motion.button>
  
        <Modal isOpen={isOpen} onClose={()=>{
          onClose()
          setIsStepForm(1)
          clearEventData()
          dispatch(clearTheStore())
        }} size={modalSize} >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Facturation de votre client </ModalHeader>
            <ModalCloseButton />
            <ModalBody className='flex flex-col lg:gap-10 mt-10'>
              <section className='pb-10 lg:pb-2'>
            <Progress  size={'xs'}
     value={stepForm==1? 15 : stepForm==2? 30 : stepForm==3? 60 : 90} colorScheme='yellow' className='rounded-lg'/>
     </section>
             { stepForm==1&&<FirstStepAddEvent 
           />}
             { stepForm==2&&<SecondStepAddEvent  />}

          {stepForm==3&& <DateFormSelect/>}

          {stepForm==4&& <RecapitulatifCalendar close={onClose}/>}
            </ModalBody>
  
            <ModalFooter>
           {stepForm==1&& <Button colorScheme='gray' mr={3} onClick={onClose}>
              Fermer
              </Button>}

              
{stepForm>1&&<Button variant='solid' onClick={()=>{
  clearSubStepForm()
  dispatch(backStepForm())}}>Précedent</Button>}
              
            </ModalFooter>
          </ModalContent>
        </Modal>
        </AddEventContext.Provider>
      </>
    )
}
export default AddEvent