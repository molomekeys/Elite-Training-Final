import { useSession } from "next-auth/react"
import AddClient from "~/components/forms/AddClient"
import BasicBro from "~/components/forms/BasicBro"
import SideNavbarCoach from "~/components/navigation/SideNavbarCoach"
import { api } from "~/utils/api"
const dashboardCoach = () => {
    const {data}=useSession()
    console.log(data)
    const offerToUser=api.example.findOffer.useQuery({name:'fitness park'}).data
    console.log(offerToUser)
  return (
  <main className="flex flex-col lg:flex-row   w-full   ">
   
    <section className=" relative flex flex-col  w-full relative">
     
    <div className="w-full flex  items-end justify-end p-10">
     
    <AddClient/>
    </div>

</section>

  </main>
  )
}
export default dashboardCoach