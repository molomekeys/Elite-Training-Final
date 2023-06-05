import SmartFormAutoEvent from "./SmartFormAutoEvent"
import {  useState } from "react"
import { useSelector } from "react-redux"
import {RootState} from '../../app/store'
import ManualySelectEvent from "./ManualySelectEvent"
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai'
import { useContext } from 'react';
import {AddEventContext} from '../fonctionality/AddEvent'
import ProgrammeFormDate from "./ProgrammeFormDate"
const defaultValue={  dateFirstWeek: "",
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
    const {secondStep,firstStep}=useSelector((state:RootState)=>state.eventReducer)
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

   
{secondStep.typeOfDate=='auto'&& firstStep.productCategory=='coaching'&&
<SmartFormAutoEvent numberOfSeance={secondStep.seanceWeekNumber}/>
}       
{ firstStep.productCategory=='programme'&&
<ProgrammeFormDate/>
}       
{secondStep.typeOfDate=='manualy'&&firstStep.productCategory!='programme'&&
<section >
  <section className="w-full justify-between flex ">
  {<button className=" cursor-pointer" onClick={()=>{
   
    stepBackSubForm()}}><AiOutlineArrowLeft size={30}/></button>}
    {
      <button onClick={
       
        nextStepSubForm}><AiOutlineArrowRight size={30}/></button>
    }
    </section>
{secondStep.seanceWeekNumber=='1'&&subStepForm==1&&
<section>
  <ManualySelectEvent  saveStepForm={saveFirstSubEvent}
  defaultValueForm={firstManualyForm} nextStepSubEvent={nextStepSubForm}/>
  <p className="text-right font-semibold text-lg p-10">{subStepForm}/{secondStep.seanceWeekNumber}</p>

  </section>}


{secondStep.seanceWeekNumber=='2'&&<section> 
{subStepForm==1&&
<ManualySelectEvent  
  saveStepForm={saveFirstSubEvent}
defaultValueForm={firstManualyForm}  nextStepSubEvent={nextStepSubForm}/>}



{subStepForm==2&&<ManualySelectEvent  
  saveStepForm={saveSecondSubEvent}
defaultValueForm={secondManualyForm}  nextStepSubEvent={nextStepSubForm}/>}



</section> }



{secondStep.seanceWeekNumber=='3' &&<section> 
{subStepForm==1&&<ManualySelectEvent  

saveStepForm={saveFirstSubEvent}
defaultValueForm={firstManualyForm}  nextStepSubEvent={nextStepSubForm}/>}
{subStepForm==2&&<ManualySelectEvent   saveStepForm={saveSecondSubEvent}
 nextStepSubEvent={nextStepSubForm} defaultValueForm={secondManualyForm}/>}
{subStepForm==3&&<ManualySelectEvent   saveStepForm={saveThirdSubEvent}
nextStepSubEvent={nextStepSubForm} defaultValueForm={thirdManualyForm}/>}
</section> }



<p className="text-right font-semibold text-lg p-10">{subStepForm}/{secondStep.seanceWeekNumber}</p>
  </section>}
    </section>
  )
}
export default DateFormSelect