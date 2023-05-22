import { useSession } from "next-auth/react"
import AddRoom from "~/components/AdminComponents/AddRoom"
import SideNavbarAdmin from "~/components/navigation/SideNavbarAdmin"

const dashboardAdmin = () => {
    const {data}=useSession()
    console.log(data)
  return (
  <main className="flex flex-col lg:flex-row bg-white w-full h-max ">
   
    <section className="w-full flex flex-col">
<div className="bg-white w-full flex justify-end p-10">
  <AddRoom/>
</div>
</section>
  </main>
  )
}
export default dashboardAdmin