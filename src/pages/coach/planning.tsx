import { useState } from "react"
import CalendarComponent from "~/components/calendarComponents/CalendarComponent"
import AddEvent from "~/components/fonctionality/AddEvent"
import { api } from "~/utils/api"
export type Events={
id:string 
start:Date 
end : Date
hours :number

}
const planningCoach = () => {
  console.log('rerender from planning')
  const [eventsData,setEventsData]=useState<Events[]>([])
  function fetchDataBack(e:Events[]){
    setEventsData(e)
  }
  console.log(eventsData)
  const allClient=api.example.fetchDataLoginCoach.useQuery(undefined,{staleTime:10000,refetchOnWindowFocus:false}).data?.map((e)=>{
    return {...e.UserIdPrisma,createdAt:e.created_at}
  })
  console.log(allClient)

  return (
    <main className="w-full flex flex-col p-4 gap-4 ">
      <div className="w-full flex justify-end p-4">
       <AddEvent updateData={fetchDataBack} allClient={allClient? allClient : []}/>
      </div>
      <section className="w-full lg:px-5">
   <section className="lg:border-2 lg:p-2 rounded-md  border-[#3C486B]  lg:w-full">
    <CalendarComponent event={eventsData}/>
   </section>
   </section>
    </main>
  )
}
export default planningCoach