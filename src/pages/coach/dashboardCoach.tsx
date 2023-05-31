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
    console.log(data?.user)
    if(data?.user)
    {
const dataCoach =api.example.fetchDataLoginCoach.useQuery()
    console.log('render')
   
    const momo =dataCoach.data
    const testmomo=momo?.map((e)=>{
      return {...e.UserIdPrisma,createdAt:e.created_at}
    })
    console.log(testmomo)
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
}
export default dashboardCoach