import AddRoom from "~/components/AdminComponents/AddRoom"
import { api } from "~/utils/api"
const dashboardAdmin = () => {
    
  

 
    async function AddData(){
    
    
    }
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