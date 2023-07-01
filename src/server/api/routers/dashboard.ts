import { number, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const dashboardData=createTRPCRouter(
    {
        fetchingDashboard:publicProcedure.query(async ({ctx})=>{
                const {prisma,session}=ctx
                if(session?.user.coach_table?.id!=undefined || session?.user.coach_table?.id!=undefined)
                {
                const allClient=await prisma.client.count({
                    where:{
                        coach_id:Number(session.user.coach_table.id)
                    }
                })
             

                const allBilling= await prisma.billing.count({
                    where:{
                        coach_id:Number(session.user.coach_table.id)
                    }
                })
                const totalGener= await prisma.billing.aggregate({
                    where:{
                        coach_id:Number(session.user.coach_table.id),isPaid:true
                    },_sum:{
                        price_coach:true
                    }
                })
                const totalFacturer= await prisma.billing.aggregate({
                    where:{
                        coach_id:Number(session.user.coach_table.id),isPaid:false
                    },_sum:{
                        price_coach:true
                    }
                })
                
                return {client:allClient,bill:allBilling,priceTotal:totalGener._sum.price_coach,totalBilling:totalFacturer._sum.price_coach}


            }
            else {
                return 0
            }
        })
    }
)