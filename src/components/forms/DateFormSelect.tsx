import SmartFormAutoEvent from "./SmartFormAutoEvent"
import { createContext, useState } from "react"
import { useSelector } from "react-redux"
import {eventSlice,} from '../../features/event/eventSlice'
import {RootState} from '../../app/store'
import ManualySelectEvent from "./ManualySelectEvent"
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai'
import { useContext } from 'react';
import {AddEventContext} from '../fonctionality/AddEvent'
let defaultValue={  dateFirstWeek: "",
dateSecondWeek:"",
dateThreeWeek:"",
dateFourthWeek:"",

hourStartFirstWeek:"",
hourEndFirstWeek:"",

hourStartSecondtWeek:"",
hourEndSecondWeek:"",

hourStartThirdWeek:"",
hourEndThirdWeek:"",

hourStartFourthWeek:"",
hourEndFourthWeek:"",
}

const DateFormSelect = () => {
    const {secondStep}=useSelector((state:RootState)=>state.eventReducer)
    const [firstManualyForm,setFirstManualyForm]=useState(defaultValue)
    const [secondManualyForm,setSecondManualyForm]=useState(defaultValue)
    const [thirdManualyForm,setThirdManualyForm]=useState(defaultValue)
const {events,clearEventData}=useContext(AddEventContext)
console.log(events)
    function saveFirstSubEvent (events:typeof defaultValue){
      setFirstManualyForm(events)
    }
    function saveSecondSubEvent (events:typeof defaultValue){
      setSecondManualyForm(events)
    }
    function saveThirdSubEvent (events:typeof defaultValue){
      setThirdManualyForm(events)
    }
   console.log('render from dateformselect')

    const [subStepForm,setSubStepForm]=useState(1)
    function nextStepSubForm(){
      setSubStepForm((prev)=>prev+=1)
    }
    function stepBackSubForm(){
      setSubStepForm((prev)=>{
        if(prev==1){
          return prev
        }

        return prev-=1})
    }
    console.log(firstManualyForm)
    console.log(secondManualyForm)
    console.log(thirdManualyForm)
  return (
    <section>

   
{secondStep.typeOfDate=='auto'&& 
<SmartFormAutoEvent numberOfSeance={secondStep.seanceWeekNumber}/>
}       
{secondStep.typeOfDate=='manualy'&&
<section>
  {subStepForm>1&&<button onClick={()=>{
    clearEventData()
    stepBackSubForm()}}><AiOutlineArrowLeft size={30}/></button>}
{secondStep.seanceWeekNumber=='1'&&subStepForm==1&&
<section>
  <ManualySelectEvent  saveStepForm={saveFirstSubEvent}
  defaultValueForm={firstManualyForm} nextStepSubEvent={nextStepSubForm}/>
  <p className="text-right font-semibold text-lg p-10">{subStepForm}/{secondStep.seanceWeekNumber}</p>

  </section>}


{secondStep.seanceWeekNumber=='2'&&<section> 

{subStepForm==1&&<ManualySelectEvent   saveStepForm={saveFirstSubEvent}
defaultValueForm={firstManualyForm}  nextStepSubEvent={nextStepSubForm}/>}
{subStepForm==2&&<ManualySelectEvent  saveStepForm={saveSecondSubEvent}
 defaultValueForm={secondManualyForm}  nextStepSubEvent={nextStepSubForm}/>}
<button onClick={stepBackSubForm}>go back </button>
</section> }



{secondStep.seanceWeekNumber=='3' &&<section> 
{subStepForm==1&&<ManualySelectEvent  saveStepForm={saveFirstSubEvent}
defaultValueForm={firstManualyForm}  nextStepSubEvent={nextStepSubForm}/>}
{subStepForm==2&&<ManualySelectEvent saveStepForm={saveSecondSubEvent}
 nextStepSubEvent={nextStepSubForm} defaultValueForm={secondManualyForm}/>}
{subStepForm==3&&<ManualySelectEvent saveStepForm={saveThirdSubEvent}
nextStepSubEvent={nextStepSubForm} defaultValueForm={thirdManualyForm}/>}
</section> }


<button onClick={nextStepSubForm}>next</button>
<p className="text-right font-semibold text-lg p-10">{subStepForm}/{secondStep.seanceWeekNumber}</p>
  </section>}
    </section>
  )
}
export default DateFormSelect