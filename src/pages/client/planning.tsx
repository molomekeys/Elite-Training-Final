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
const PlanningClient = () => {
  console.log('rerender from planning')

  const {data:eventsCalendar,isLoading}=api.example.seeEventCalendarCient.useQuery()



  

if(isLoading){

}

console.log(eventsCalendar)
  return (
    <main className="w-full flex flex-col p-4 gap-4 ">
     
      <motion.section animate={{opacity:1,y:0}} initial={{opacity:0,y:2}} transition={{duration:1,delay:0.1}}
       className="w-full lg:px-5 pt-10">
   <section className="lg:border-2 lg:p-2 rounded-md  border-[#3C486B]  lg:w-full">
    <CalendarComponent event={eventsCalendar? eventsCalendar : []}/>
   </section>
   </motion.section>
    </main>
  )
}

export default PlanningClient