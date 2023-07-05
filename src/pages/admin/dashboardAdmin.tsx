import AddRoom from "~/components/AdminComponents/AddRoom"
import { api } from "~/utils/api"
import {motion} from 'framer-motion'
import AddRoomLayout from "~/layouts/AddRoomLayout"
const dashboardAdmin = () => {
    const dashboard_data=api.adminRouter.dashboardInfo.useQuery(undefined,{staleTime:1000000})
  const {data, isLoading}=dashboard_data


if(data!='non autorisée')
 
  return (
  <main className="flex flex-col lg:flex-row bg-white w-full h-max ">
   
    <section className="w-full flex flex-col">
<div className="bg-white w-full flex justify-end p-10">

  <AddRoomLayout/>
</div>
{isLoading==false&&<motion.div animate={{opacity:1}} initial={{opacity:0}}
 className="grid grid-cols-1 lg:grid-cols-3 w-full gap-10 text-center font-semibold`aa ™2  p-10 text-sm font-semibold ">
<div  className="border-2 border-slate-600 rounded-lg text-center px-3 ">
  <p  className="whitespace-nowrap py-2 ">Coachs : <span className="font-bold">{data?.nombre_coach} </span></p>
</div>
<div  className="border-2 border-slate-600 rounded-lg text-center px-3 ">
  <p  className="whitespace-nowrap py-2 ">Coach  en attente de validation : <span className="font-bold text-red-500">{data?.invalide_coach} </span></p>
</div>
<div className="border-2  border-slate-600 rounded-lg text-center   ">
 <p  className="whitespace-nowrap py-2 " >Clients :  <span className="font-bold mr-4">{data?.nombre_client} </span></p>
</div>
<div className="border-2 border-slate-600 rounded-lg text-center px-3 ">
<p className="whitespace-nowrap py-2 ">Total facturer, payer : <span className="font-bold mr-4 text-green-700">{data?.billing_info.price_client}€ </span></p>
</div>
<div className="border-2 border-slate-600 rounded-lg text-center px-3 ">
<p className="whitespace-nowrap py-2 ">En attente  : <span className="font-bold text-red-500 mr-4">{data?.billing_info.price_client}€ </span></p>
</div>
<div className="border-2 border-slate-600 rounded-lg text-center  px- ">
<p  className="whitespace-nowrap py-2 "> À payer aux coachs :  <span className="font-bold mr-4">{data?.billing_info.price_coach}€ </span></p>
</div>
</motion.div>}
</section>
  </main>
  )
}
export default dashboardAdmin