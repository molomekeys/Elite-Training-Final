import { useState } from "react"
import CalendarComponent from "~/components/calendarComponents/CalendarComponent"
import AddEvent from "~/components/fonctionality/AddEvent"
import { api } from "~/utils/api"
import {motion} from 'framer-motion'
import ModelCalendrier from "~/components/calendarComponents/ModalCalendar"
import LayoutAddEvent from "~/components/fonctionality/LayoutAddEvent"
export type Events={
id:string 
start:Date 
end : Date
hours :number


}
const PlanningCoach = () => {
  console.log('rerender from planning')
  const [eventsData,setEventsData]=useState<Events[]>([])
  function fetchDataBack(e:Events[]){
    setEventsData(e)
  }
  const {data:eventsCalendar,refetch}=api.example.seeEventCalendarCoach.useQuery(undefined,{
    staleTime:5000
  })

 async function refetchEvents(){
  await refetch()
 }
 console.log(eventsCalendar)









  const [openCalendar,setOpenCalendar]=useState(false)
const [isSelectEvent,setIsSelectEvent]=useState({start:new Date(),name:'',phone_number:'',
  clientName:'merouane',end:new Date(),salle:'momo',id:'test',title:'Salut Merouane',custom_message:''})

function selectEvent(e:typeof isSelectEvent){

  setIsSelectEvent(e)
}

function openTheModalCalendar(){
  setOpenCalendar((prev)=>!prev)
}





  return (
    <main className="w-full flex flex-col p-4 gap-4 overflow-x-hidden ">
      <motion.div  animate={{opacity:1,x:0}} initial={{opacity:0,x:'20%'}} transition={{duration:0.5,delay:0.5}} className="w-full flex justify-end p-4">
       <LayoutAddEvent   saveEventCalendar={refetchEvents}
        updateData={fetchDataBack} />
      </motion.div>
      <motion.section animate={{opacity:1,y:0}} initial={{opacity:0,y:2}} transition={{duration:0.75,delay:0.1}}
       className="w-full lg:px-5">
   <section className="lg:border-2 lg:p-2 rounded-md  border-[#3C486B]  lg:w-full">
    <CalendarComponent openTheMod={openTheModalCalendar} getInfo={selectEvent} 
    event={eventsCalendar? eventsCalendar : []}/>
   </section>
   </motion.section>
   <ModelCalendrier  changeTheModal={openTheModalCalendar}  updateCalendar={refetchEvents}
   
   openModal={openCalendar} informationData={isSelectEvent} />
    </main>
  )
}

export default PlanningCoach