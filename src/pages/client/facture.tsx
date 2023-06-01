import { Link } from "@chakra-ui/react"
const facture = () => {


  async function fetchKeysStripe(){
    const dataKey=await fetch('/api/payement/stripe',{
      method:'POST',headers:{
        "content-type" :"application/json"
      }
    }).then((e)=>{
      return e.json()
    })
    console.log(dataKey)
     }

  return (
   
  <main className="flex flex-col ">
         <div>Facturation </div>
       <Link href="/client/stripe/test">  <button>pay</button></Link>
       
         </main>
  )
}
export default facture