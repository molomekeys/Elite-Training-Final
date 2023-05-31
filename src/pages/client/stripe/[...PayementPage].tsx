
// import { useEffect,useState } from "react"
// import { loadStripe } from "@stripe/stripe-js"
// import CheckoutForm from "~/components/payement/CheckoutForm";
// import { CardElement, Elements, PaymentElement ,} from "@stripe/react-stripe-js";

// const PayementPage = () => {

//   const [stripePromise,setStripePromise]=useState()
//   const [clientSecret,setClientSecret]=useState('')
//   useEffect(()=>{

// setClientSecret(dataKey.clientSecret)
// if(momo)
// {
//   //@ts-ignore
// setStripePromise(momo)
// }
//  }
//  fetchKeysStripe()
//   },[])

//   if(!stripePromise)
//   {
//     return "Loading"
//   }
// console.log(clientSecret)
// console.log(stripePromise)
//   return (
//   <main className="w-full flex flex-col bg-white ">
   
//    {stripePromise&& clientSecret&&( <Elements options={{clientSecret,appearance:{theme:'flat'}}} stripe={stripePromise}>
//     <CheckoutForm/>

//   </Elements>)}
//   </main>
//   )
// }

// export default PayementPage


import { loadStripe } from "@stripe/stripe-js"
const momo  =  loadStripe('pk_test_51MswCdGU6BKqDgY0tDdH1m5PShHdGh4SkpCKvf7pG5YNt08FhENQOqJXujXnKmbWpmJsonxmv9hqHEsUlR0hC7eg006frco6HS')


const PayementPage = () => {

 async function fetchKeysStripe(){
const dataKey=await fetch('/api/payement/stripe',{
  method:'POST',headers:{
    "content-type" :"application/json"
  }
}).then((e)=>{
  return e.json()
})
//@ts-ignore
const test = await momo
const result=test&&test.redirectToCheckout({
  sessionId:dataKey.sessionId
})
 }

  return (
    <div>PayementPage

      <button onClick={fetchKeysStripe}>pay bro </button>
    </div>
  )
}

export default PayementPage