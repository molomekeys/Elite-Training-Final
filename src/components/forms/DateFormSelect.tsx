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

   console.log('render from dateformselect')
   const {secondStep,firstStep}=useSelector((state:RootState)=>state.eventReducer)


   const{subStepForm,nextSubStepForm,backSubStepForm,events,clearEventData,saveEvent
  ,firstEventManualy,secondEventManualy,thirdEventManualy,setFirstEventManualy,setSecondEventManualy,setThirdEventManualy}=useContext(AddEventContext)
  
  
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
  saveStepForm={setFirstEventManualy}  
  defaultValueForm={firstEventManualy}/>

  </section>}


{secondStep.seanceWeekNumber=='2'&&<section> 
{subStepForm==1&&
<ManualySelectEvent  isSubmit={false}
  saveStepForm={setFirstEventManualy}
defaultValueForm={firstEventManualy}  />}



{subStepForm==2&&<ManualySelectEvent isSubmit={true}  
  saveStepForm={setSecondEventManualy}
defaultValueForm={secondEventManualy}  />}



</section> }



{secondStep.seanceWeekNumber=='3' &&<section> 
{subStepForm==1&&<ManualySelectEvent   isSubmit={false}

saveStepForm={setFirstEventManualy}
defaultValueForm={firstEventManualy} />}
{subStepForm==2&&<ManualySelectEvent   isSubmit={false}
saveStepForm={setSecondEventManualy}
  defaultValueForm={secondEventManualy}/>}
{subStepForm==3&&<ManualySelectEvent  isSubmit={true}
 saveStepForm={setThirdEventManualy}
defaultValueForm={thirdEventManualy}/>}
</section> }



<p className="text-right font-semibold text-lg p-10">{subStepForm}/{secondStep.seanceWeekNumber}</p>
  </section>}
    </section>
  )
}
export default DateFormSelect