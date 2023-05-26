import SmartFormAutoEvent from "./SmartFormAutoEvent"
import { createContext, useState } from "react"
import { useSelector } from "react-redux"
import {eventSlice,} from '../../features/event/eventSlice'
import {RootState} from '../../app/store'
import ManualySelectEvent from "./ManualySelectEvent"
const DateFormSelect = () => {
    const {secondStep}=useSelector((state:RootState)=>state.eventReducer)
   console.log('render from dateformselect')

    const [subStepForm,setSubStepForm]=useState(1)
    function nextStepSubForm(){
      setSubStepForm((prev)=>prev+=1)
    }
  return (
    <section>

    
{secondStep.typeOfDate=='auto'&& 
<SmartFormAutoEvent numberOfSeance={secondStep.seanceWeekNumber}/>
}       
{secondStep.typeOfDate=='manualy'&&
<section>
  
{secondStep.seanceWeekNumber=='1'&&subStepForm==1&&
<section>
  <ManualySelectEvent nextStepSubEvent={nextStepSubForm}/>
  <p className="text-right font-semibold text-lg p-10">{subStepForm}/{secondStep.seanceWeekNumber}</p>

  </section>}


{secondStep.seanceWeekNumber=='2'&&<section> 

{subStepForm==1&&<ManualySelectEvent nextStepSubEvent={nextStepSubForm}/>}
{subStepForm==2&&<ManualySelectEvent nextStepSubEvent={nextStepSubForm}/>}

</section> }



{secondStep.seanceWeekNumber=='3' &&<section> 
{subStepForm==1&&<ManualySelectEvent nextStepSubEvent={nextStepSubForm}/>}
{subStepForm==2&&<ManualySelectEvent nextStepSubEvent={nextStepSubForm}/>}
{subStepForm==3&&<ManualySelectEvent nextStepSubEvent={nextStepSubForm}/>}
</section> }

<button onClick={nextStepSubForm}>next</button>
<p className="text-right font-semibold text-lg p-10">{subStepForm}/{secondStep.seanceWeekNumber}</p>
  </section>}
    </section>
  )
}
export default DateFormSelect