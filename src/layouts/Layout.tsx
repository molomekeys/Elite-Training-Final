import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { type ReactNode } from "react"
import Navbar from "~/components/navigation/Navbar"
import SideNavbarAdmin from "~/components/navigation/SideNavbarAdmin"
import SideNavbarClient from "~/components/navigation/SideNavbarClient"
import SideNavbarCoach from "~/components/navigation/SideNavbarCoach"
type LayoutPage={
    children:ReactNode
}

const Layout = ({children }:LayoutPage) => {
    const router=useRouter()
    const {data:session,status:isLoading}=useSession()
   
   if(isLoading=='loading'){
 return (<div>


 </div>)
   }
   
  
  return (
    <>
    <section className="flex flex-col w-full gap-4 overflow
      min-h-max overflow-x-hidden">
<div>
   {(session?.user==null&& status!="loading")&& <Navbar/>}
</div>
    <main className="flex flex-col lg:flex-row  h-full g:from-slate-900 lg:from-50% 
     lg:via-slate-800 lg:via-80% lg:to-slate-800    ">
      
        {session?.user.role=='coach'&& 
        <div className="w-full   lg:min-h-screen  overflow-x-hidden
         lg:w-4/12 lg:bg-gradient-to-b lg:from-slate-900 lg:from-50%  lg:via-slate-800 lg:via-80% lg:to-slate-800    ">
          <SideNavbarCoach/></div>}

        {session?.user.role=='admin' && 
        <div className=" w-full lg:w-4/12   lg:bg-gradient-to-b lg:from-slate-900 lg:from-50%  lg:via-slate-800 lg:via-80% lg:to-slate-800">

       <SideNavbarAdmin/>   </div>}

        {(session?.user.role=='client' && router.pathname!='/client/paiement/[test]')&&

        <div className=" w-full lg:w-4/12 absolute lg:bg-gradient-to-b lg:from-slate-900 lg:from-50%  lg:via-slate-800 lg:via-80% lg:to-slate-800">

       <SideNavbarClient/>   </div>}

     
        <div className="w-full bg-white overflow-x-hidden">
        {children}
        </div>
    </main>
    </section>
    </>
  )
}

export default Layout