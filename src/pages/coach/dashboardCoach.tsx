import { useSession } from "next-auth/react"

import { api } from "~/utils/api"
import {  useDispatch } from 'react-redux'


const DashboardCoach = () => {
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
export default DashboardCoach