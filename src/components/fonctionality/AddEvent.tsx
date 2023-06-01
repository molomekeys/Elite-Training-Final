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
interface PropsAddEvent{
  updateData:(e:Events[])=>void
  allClient:AllClientType[]

}
interface ContextEventInterface{
  client:{ createdAt: Date;
    name: string;
    email: string;
    id: string;
    phone_number: string;}[],
events:EventsTypeAgenda[], saveEvent:(e:Events[])=>void,
functionEvent:(eventData:EventsType[])=>void
functionAddSubEvent:(eventData:EventsType[])=>void
clearEventData:()=>void

}

// react context

export const AddEventContext=createContext<ContextEventInterface>(
  {functionAddSubEvent:()=>{
    return 
  },clearEventData:()=>{
    return 
  },client:[],saveEvent:(e:Events[])=>{},
  events:
  [{end:new Date(),hours:5,id:'1',start:new Date()}] ,functionEvent:()=>{}})



  // react function 
const AddEvent = ({updateData,allClient}:PropsAddEvent) => {
//cela permet d'utiliser chakra ui
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
    const modalSize = isLargerThan768 ? "5xl" : "full";
const dispatch=useDispatch()

const stepForm=useSelector((state:RootState)=>state.eventReducer.stepForm)

    //le stat qui controler les étapes du forms
    const [isEventAdded,setIsEventAdded]=useState<EventsType[]>([])


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
      <AddEventContext.Provider value={{saveEvent:updateData,client:allClient? allClient : [],clearEventData:clearEventData,functionAddSubEvent:saveSubEventData,
        events:isEventAdded,functionEvent:saveEventData}}>
        <button  className='text-slate-50 px-3 py-2 w-min-fit 
          bg-[#3C486B] rounded-lg font-bold   '
        onClick={onOpen}>Facturation client</button>
  
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
          {stepForm==3&&<DateFormSelect/>}
          {stepForm==4&& <RecapitulatifCalendar/>}
            </ModalBody>
  
            <ModalFooter>
           {stepForm==1&& <Button colorScheme='gray' mr={3} onClick={onClose}>
              Fermer
              </Button>}

              
{stepForm>1&&<Button variant='solid' onClick={()=>{

  dispatch(backStepForm())}}>Précedent</Button>}
              
            </ModalFooter>
          </ModalContent>
        </Modal>
        </AddEventContext.Provider>
      </>
    )
}
export default AddEvent