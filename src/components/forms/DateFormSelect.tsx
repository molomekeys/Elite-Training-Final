import SmartFormAutoEvent from "./SmartFormAutoEvent"
import {  useState } from "react"
import { useSelector } from "react-redux"
import {RootState} from '../../app/store'
import ManualySelectEvent from "./ManualySelectEvent"
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai'
import { useContext } from 'react';
import {AddEventContext} from '../fonctionality/AddEvent'
import ProgrammeFormDate from "./ProgrammeFormDate"
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

const DateFormSelect = () => {
    const {secondStep,firstStep}=useSelector((state:RootState)=>state.eventReducer)
    const [firstManualyForm,setFirstManualyForm]=useState(defaultValue)
    const [secondManualyForm,setSecondManualyForm]=useState(defaultValue)
    const [thirdManualyForm,setThirdManualyForm]=useState(defaultValue)

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

   const{subStepForm,nextSubStepForm,backSubStepForm,events,clearEventData,saveEvent}=useContext(AddEventContext)
  
  
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
  {<button className=" cursor-pointer" onClick={backSubStepForm}><AiOutlineArrowLeft size={30}/></button>}
    
    
    
    </section>
{secondStep.seanceWeekNumber=='1'&&subStepForm==1&&
<section>
  <ManualySelectEvent   isSubmit={true}
  saveStepForm={saveFirstSubEvent}  
  defaultValueForm={firstManualyForm}/>

  </section>}


{secondStep.seanceWeekNumber=='2'&&<section> 
{subStepForm==1&&
<ManualySelectEvent  isSubmit={false}
  saveStepForm={saveFirstSubEvent}
defaultValueForm={firstManualyForm}  />}



{subStepForm==2&&<ManualySelectEvent isSubmit={true}  
  saveStepForm={saveSecondSubEvent}
defaultValueForm={secondManualyForm}  />}



</section> }



{secondStep.seanceWeekNumber=='3' &&<section> 
{subStepForm==1&&<ManualySelectEvent   isSubmit={false}

saveStepForm={saveFirstSubEvent}
defaultValueForm={firstManualyForm} />}
{subStepForm==2&&<ManualySelectEvent   isSubmit={false}
saveStepForm={saveSecondSubEvent}
  defaultValueForm={secondManualyForm}/>}
{subStepForm==3&&<ManualySelectEvent  isSubmit={true}
 saveStepForm={saveThirdSubEvent}
defaultValueForm={thirdManualyForm}/>}
</section> }



<p className="text-right font-semibold text-lg p-10">{subStepForm}/{secondStep.seanceWeekNumber}</p>
  </section>}
    </section>
  )
}
export default DateFormSelect