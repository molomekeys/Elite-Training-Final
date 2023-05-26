import { useState } from "react"
import AddEvent from "~/components/fonctionality/AddEvent"

const planningCoach = () => {
  console.log('rerender from planning')
  return (
    <main className="w-full flex flex-col p-4 ">
      <div className="w-full flex justify-end p-4">
       <AddEvent/>
      </div>
   
    </main>
  )
}
export default planningCoach