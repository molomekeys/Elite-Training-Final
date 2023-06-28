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
                return {client:allClient,bill:allBilling}


            }
            else {
                return 0
            }
        })
    }
)