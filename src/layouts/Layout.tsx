import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { type ReactNode } from "react"
import Navbar from "~/components/navigation/Navbar"
import SideNavbarAdmin from "~/components/navigation/SideNavbarAdmin"
import SideNavbarCoach from "~/components/navigation/SideNavbarCoach"
type LayoutPage={
    children:ReactNode
}

const Layout = ({children }:LayoutPage) => {
    const router=useRouter()
    const {data:session,status}=useSession()
   
  return (
    <>
    <section className="flex flex-col w-full">
<div>
   {(session?.user==null&& status!="loading")&& <Navbar/>}
</div>
    <main className="flex flex-col lg:flex-row">
       
        {session?.user.role=='coach'&& 
        <div className="w-full lg:w-4/12"><SideNavbarCoach/></div>}
        {session?.user.role=='admin' && 
        <div className=" w-full lg:w-4/12">

       <SideNavbarAdmin/>   </div>}

     
        <div className="w-full">
        {children}
        </div>
    </main>
    </section>
    </>
  )
}
export default Layout