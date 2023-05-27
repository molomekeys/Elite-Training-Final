import { useState } from "react"
import CalendarComponent from "~/components/calendarComponents/CalendarComponent"
import AddEvent from "~/components/fonctionality/AddEvent"

const planningCoach = () => {
  console.log('rerender from planning')
  return (
    <main className="w-full flex flex-col p-4 gap-4 ">
      <div className="w-full flex justify-end p-4">
       <AddEvent/>
      </div>
      <section className="w-full lg:px-5">
   <section className="lg:border-2 lg:p-2 rounded-md  border-[#3C486B]  lg:w-full">
    <CalendarComponent event={[]}/>
   </section>
   </section>
    </main>
  )
}
export default planningCoach