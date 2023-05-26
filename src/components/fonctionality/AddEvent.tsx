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
import {useState} from 'react'
import SecondStepAddEvent from '../forms/SecondStepAddEvent'
import SmartFormInput from '../forms/SmartFormAutoEvent'
import DateFormSelect from '../forms/DateFormSelect'
import { backStepForm } from '~/features/event/eventSlice'
import { useDispatch,useSelector } from 'react-redux'
import type { RootState } from '~/app/store'
const AddEvent = () => {
//cela permet d'utiliser chakra ui
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
    const modalSize = isLargerThan768 ? "5xl" : "full";
const dispatch=useDispatch()
const stepForm=useSelector((state:RootState)=>state.eventReducer.stepForm)
    //le stat qui controler les étapes du forms
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



function saveFirstStep(e:typeof formDataSteps.firstStep){
  setFormDataSteps((prev)=>{
    return({...prev,firstStep:e})
  })

}
function saveSecondStep(e:typeof formDataSteps.secondStep){
  setFormDataSteps((prev)=>{
    return({...prev,secondStep:e})
  })

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
        <button  className='text-slate-50 px-3 py-2  bg-cyan-900 rounded-lg font-bold   '
        onClick={onOpen}>Facturation client</button>
  
        <Modal isOpen={isOpen} onClose={()=>{
          onClose()
          setIsStepForm(1)
        }} size={modalSize} >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Facturation de votre client </ModalHeader>
            <ModalCloseButton />
            <ModalBody className='flex flex-col gap-10 mt-10'>
              <section>
            <Progress  size={'xs'}
     value={stepForm==1? 15 : stepForm==2? 30 : stepForm==3? 60 : 90} colorScheme='messenger' className='rounded-lg'/>
     </section>
             { stepForm==1&&<FirstStepAddEvent 
           />}
             { stepForm==2&&<SecondStepAddEvent  />}
          {stepForm==3&&<DateFormSelect/>}
            </ModalBody>
  
            <ModalFooter>
           {stepForm==1&& <Button colorScheme='gray' mr={3} onClick={onClose}>
              Fermer
              </Button>}

              
{stepForm>1&&<Button variant='solid' onClick={()=>dispatch(backStepForm())}>Précedent</Button>}
              
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}
export default AddEvent