import CalendarComponent from "~/components/calendarComponents/CalendarComponent"
const Planning = () => {
  return (
   <section className="flex flex-col h-full  lg:px-5 items-center justify-center ">
     <section className="lg:border-2 lg:p-2 rounded-md  border-[#3C486B] pt-10  lg:w-full">
    <CalendarComponent event={[]}/>
   </section>
   </section>
  )
}
export default Planning