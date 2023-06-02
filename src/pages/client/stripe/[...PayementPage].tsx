
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
import { env } from "~/env.mjs"; // On client - same import!

const momo  =  loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)


const PayementPage = () => {

 async function fetchKeysStripe(): Promise<void>{



try {
  const response = await fetch('/api/payement/stripe');
  const data = await response.json();
  // Process the received data here
 
  const stripe = await momo.then((e)=>{
 
    console.log(data?.sessionId)

    return e?.redirectToCheckout({sessionId:data?.sessionId})
  })




  

} catch (error) {
 console.log(error)
}


 }

  return (
    <div>PayementPage

      <button onClick={fetchKeysStripe}>pay bro </button>
    </div>
  )
}

export default PayementPage