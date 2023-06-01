import AddRoom from "~/components/AdminComponents/AddRoom"
import { api } from "~/utils/api"
const dashboardAdmin = () => {
    const momo=api.example.addRoom.useMutation()
  

  console.log(momo.data)
    async function AddData(){
   momo.mutate({name:'derniere entree'})
     
    
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