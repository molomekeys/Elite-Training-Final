import { useSession } from "next-auth/react"
import AddClient from "~/components/fonctionality/AddClient"
import BasicBro from "~/components/fonctionality/BasicBro"
import SideNavbarCoach from "~/components/navigation/SideNavbarCoach"
import { api } from "~/utils/api"
import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '../../app/store'

const dashboardCoach = () => {
    const {data}=useSession()
    const dispatch = useDispatch()

    console.log('render')
    console.log(data)
    // const offerToUser=api.example.findOffer.useQuery({name:'fitness park'}).data
    // console.log(offerToUser)
  return (
  <main className="flex flex-col lg:flex-row   w-full   ">
   
    <section className=" relative flex flex-col  w-full relative">
     
   
    <div className="flex flex-col">
   
  
    </div>
</section>

  </main>
  )
}
export default dashboardCoach