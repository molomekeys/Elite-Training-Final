import CalendarComponent from "~/components/calendarComponents/CalendarComponent"
import AddEvent from "~/components/fonctionality/AddEvent"
import { api } from "~/utils/api"
import {motion} from 'framer-motion'
import ModelCalendrier from "~/components/calendarComponents/ModalCalendar"
import { useState } from "react"
export type Events={
id:string 
start:Date 
end : Date
hours :number

}
const PlanningClient = () => {
  console.log('rerender from planning')

  const [openCalendar,setOpenCalendar]=useState(false)
  const {data:eventsCalendar,isLoading,refetch}=api.example.seeEventCalendarCient.useQuery()
  const [isSelectEvent,setIsSelectEvent]=useState({start:new Date(),name:'',phone_number:'',custom_message:'',
  clientName:'merouane',end:new Date(),salle:'momo',id:'test',title:'Salut Merouane'})
function selectEvent(e:typeof isSelectEvent){

  setIsSelectEvent(e)
}

function openTheModalCalendar(){
  setOpenCalendar((prev)=>!prev)
}
  console.log(eventsCalendar)

if(isLoading){

}


  return (
    <main className="w-full flex flex-col p-4 gap-4 ">
     
      <motion.section animate={{opacity:1,y:0}} initial={{opacity:0,y:2}} transition={{duration:1,delay:0.1}}
       className="w-full lg:px-5 pt-10">
   <section className="lg:border-2 lg:p-2 rounded-md  border-[#3C486B]  lg:w-full">
    <CalendarComponent  openTheMod={openTheModalCalendar} getInfo={selectEvent}
    event={eventsCalendar? eventsCalendar : []}/>
   </section>
   </motion.section>

   <ModelCalendrier  changeTheModal={openTheModalCalendar} updateCalendar={refetch}
   
   openModal={openCalendar} informationData={isSelectEvent} />
    </main>
  )
}

export default PlanningClient