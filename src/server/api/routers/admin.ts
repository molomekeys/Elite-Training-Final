import { number, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const adminRouter =createTRPCRouter({
    dashboardInfo:publicProcedure.query(async function({ctx}){
        const {session,prisma}=ctx
        if(session?.user.role=='admin'){
            const allClient=await prisma.client.count()
            const allCoach= await prisma.coach.count({
                where:{
                    isValid:true
                }
            })
            const allCoachWaiting= await prisma.coach.count({
                where:{
                    isValid:false
                }
            })
            const allBillPaid = await prisma.billing.aggregate({
                where:{
                    isPaid:true
                },
                 _sum:{
                    price_client:true,price_coach:true
                 }
            })
            const allBillInPaid = await prisma.billing.aggregate({
                where:{
                    isPaid:false
                },
                 _sum:{
                    price_client:true,price_coach:true
                 }
            })
            return {nombre_coach:allCoach,nombre_client:allClient,billing_info:{...allBillPaid._sum},bill_inped:{...allBillInPaid._sum},invalide_coach:allCoachWaiting}
        }
        else {
            return 'non autorisée'
        }

    }),allOfer:protectedProcedure.query(async ({ctx})=>{
        const {prisma}=ctx
        const allOffer= await prisma.offerTable.findMany()
        const allProgramme= await prisma.programmePricing.findMany({
            select:{
                type_offert:true,id:true,coach_price:true
            }
        })
        return {programme:allProgramme,coaching:allOffer}
    })
})