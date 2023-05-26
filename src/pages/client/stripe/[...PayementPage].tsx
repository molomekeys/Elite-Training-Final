
// import { useEffect,useState } from "react"
// import { loadStripe } from "@stripe/stripe-js"
// import CheckoutForm from "~/components/payement/CheckoutForm";
// import { CardElement, Elements, PaymentElement ,} from "@stripe/react-stripe-js";

// const PayementPage = () => {

//   const [stripePromise,setStripePromise]=useState()
//   const [clientSecret,setClientSecret]=useState('')
//   useEffect(()=>{
//  async function fetchKeysStripe(){
// const dataKey=await fetch('/api/payement/stripe').then((e)=>{
//   return e.json()
// })
// setClientSecret(dataKey.clientSecret)
// const momo  = await loadStripe('pk_test_51MswCdGU6BKqDgY0tDdH1m5PShHdGh4SkpCKvf7pG5YNt08FhENQOqJXujXnKmbWpmJsonxmv9hqHEsUlR0hC7eg006frco6HS')
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

const PayementPage = () => {
  return (
    <div>PayementPage</div>
  )
}
export default PayementPage