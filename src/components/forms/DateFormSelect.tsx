import SmartFormAutoEvent from "./SmartFormAutoEvent"
import { createContext } from "react"
import { useSelector } from "react-redux"
import {eventSlice,} from '../../features/event/eventSlice'
import {RootState} from '../../app/store'
const DateFormSelect = () => {
    const eventForm=useSelector((state:RootState)=>state.eventReducer)
   console.log('render from dateformselect')
    console.log(eventForm)
  return (
    <section>

    
{eventForm.secondStep.typeOfDate=='auto'&&
<SmartFormAutoEvent numberOfSeance={eventForm.secondStep.seanceWeekNumber}/>
}       
    </section>
  )
}
export default DateFormSelect