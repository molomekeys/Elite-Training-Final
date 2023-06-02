
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
const momo  =  loadStripe('pk_test_51MpHHPL8uKxb9Hfad754I86IlchzB5BQ9CfUyHzepkt72BpOnF97OU2CdXuk8oq10BiFdtHxARG6mZhq5N9pKPxg00Y4B0Lltn')


const PayementPage = () => {

 async function fetchKeysStripe(): Promise<void>{



try {
  const response = await fetch('/api/payement/stripe');
  const data = await response.json();
  // Process the received data here
  console.log(data.sessionId)
  const stripe = await momo.then((e)=>{
    console.log('inside')
    console.log(data?.sessionId)
    console.log(e)
    return e?.redirectToCheckout({sessionId:data?.sessionId})
  })
  console.log('slt')

console.log(stripe)
console.log('slt')
  

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