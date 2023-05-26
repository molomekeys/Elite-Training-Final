import { useRouter } from "next/router"
import Layout from "~/layouts/Layout"
const Test = () => {
    const router = useRouter()
    console.log(router.query.test)
  return (
  
    <div>Test</div>
  
  )
}
export default Test