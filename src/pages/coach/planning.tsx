import { useState } from "react"
import CalendarComponent from "~/components/calendarComponents/CalendarComponent"
import AddEvent from "~/components/fonctionality/AddEvent"
import { api } from "~/utils/api"
import {motion} from 'framer-motion'

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
  const {data:eventsCalendar}=api.example.seeEventCalendar.useQuery()

  const allClient=api.example.fetchDataLoginCoach.useQuery(undefined,{staleTime:10000,refetchOnWindowFocus:false}).data?.map((e)=>{
    return {...e.UserIdPrisma,createdAt:e.created_at}
  })

  const {data,isLoading}=api.example.availableOffer.useQuery()
  

if(isLoading){

}


  return (
    <main className="w-full flex flex-col p-4 gap-4 ">
      <motion.div  animate={{opacity:1,y:0}} initial={{opacity:0,y:'-30%'}} transition={{duration:0.5,delay:0.5}} className="w-full flex justify-end p-4">
       <AddEvent  allRoom={data? data : []}
        updateData={fetchDataBack} allClient={allClient? allClient : []}/>
      </motion.div>
      <motion.section animate={{opacity:1,y:0}} initial={{opacity:0,y:2}} transition={{duration:1,delay:0.1}}
       className="w-full lg:px-5">
   <section className="lg:border-2 lg:p-2 rounded-md  border-[#3C486B]  lg:w-full">
    <CalendarComponent event={eventsCalendar? eventsCalendar : []}/>
   </section>
   </motion.section>
    </main>
  )
}

export default PlanningCoach