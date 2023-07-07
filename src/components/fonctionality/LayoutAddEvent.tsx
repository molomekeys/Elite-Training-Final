import AddEvent from "./AddEvent"
import { Events } from '~/pages/coach/planning'
import { api } from "~/utils/api";
export type AllClientType={
  
    createdAt: Date;
    id: string;
    name: string;
    email: string;
    idClient:string
    phone_number: string;
  
  }
  export type EventsType= {
    start: Date;
    id: string;
    end: Date;
   
    hours: number;
  }
  export type EventsTypeAgenda= {
    start: Date;
    id: string;
    end: Date;
  
    hours: number;
  }
  
  export type AllPrice={
    pricing: {
        id: number;
        stripe_id: string;
        seance_week: string;
        coach_price: number;
        client_price: number;
        type_offert: string;
    }[];
    programme?: {
      client_price: number
  coach_price: number
  id: number
  stripe_id: string
  type_offert: string
  }[];
    id: number;
    room_name: string;
  }
  interface PropsAddEvent{
    updateData:(e:Events[])=>void
   
   
    saveEventCalendar:()=>void
  
  }
  // save Event permet de refetch la data 
const LayoutAddEvent = ({saveEventCalendar,updateData}:PropsAddEvent) => {

    const {data,isLoading}=api.example.availableOffer.useQuery(undefined,{
        staleTime:100000,refetchOnWindowFocus:false
      })
      
    const allClient=api.example.fetchDataLoginCoach.useQuery(undefined,{staleTime:100000,refetchOnWindowFocus:false}).data?.map((e)=>{
        return {...e.UserIdPrisma,createdAt:e.created_at,idClient:String(e.id)}
      })
    
  return (
   <>
   
   <AddEvent allRoom={data? data : []}  saveEventCalendar={saveEventCalendar} 
        updateData={updateData} allClient={allClient? allClient : []}/>
   </>
  )
}
export default LayoutAddEvent