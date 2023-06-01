import { useRouter } from "next/router"
 const Test = () => {
    const router = useRouter()
    console.log(router.query.test)
  return (
  
    <div>Test</div>
  
  )
}
export default Test