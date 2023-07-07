import { number, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,protectedCoachProcedure,
  protectedProcedure,
} from "~/server/api/trpc";


const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const coachRoot=createTRPCRouter({
    allBillsPaidClient:protectedCoachProcedure.input(z.object({dateSart:z.date(),
    dateEnd:z.date(),roomName:z.string()})).mutation(async({ctx,input})=>{
    const fetchData= await ctx.prisma.coach.findUnique({
      where:{
        id:Number(ctx.session?.user?.coach_table?.id)
      },select:{
        isValid:true,numero_siret:true
      }
    })
    if(fetchData?.isValid==true){
      console.log(fetchData)
      console.log(input)
      const {dateEnd,dateSart}=input
      let newStartDate=new Date(dateSart.getFullYear(),dateSart.getMonth()-1,0)
      let newEndDate= new Date(dateEnd.getFullYear(),dateEnd.getMonth(),0)
      console.log(newEndDate)

      const fetchBilling=await ctx.prisma.billing.findMany({
        where:{
          coach_id:Number(ctx.session?.user.coach_table?.id),
          isPaid:true,salle_id:Number(input.roomName),is_paid_elite:false
          ,createdAt:{
            lte: newEndDate,gte:newStartDate
          }
        },select:{
          createdAt:true,type_offer:true,hours:true,id:true,
          price_coach:true,offer_prisma_id:{
            select:{
              coach_price:true,
            }
          },prisma_place_id:{
           select:{
            room_name:true
           }
          }
        }
      })
  
  
      const fetchBillingFiltered=fetchBilling.map((e)=>{
        const {offer_prisma_id,prisma_place_id,...rest}=e
        return {place:prisma_place_id?.room_name,...rest}
      })
   
     
    return {billingData:fetchBillingFiltered,
        coachData:{...fetchData,coachName:ctx.session?.user.name}}
  
    }
    else {
      return 'non valide '
    }
   
  }),
    bilanCoachElite:protectedCoachProcedure.input(z.object({price:z.number(),
        placeId:z.string(),monthSelected:z.string(),billToSend:z.string(),
        billingId:z.array(z.object({id:z.number()}))
    })).mutation(async ({ctx,input})=>{
        const {session,prisma}=ctx
        const {placeId,price,billingId,billToSend,monthSelected}=input
        try {
            const saveToElite= await prisma.bilanCoach.create({
                data:{
                     coach_id:Number(session.user.coach_table?.id),
                     price:price,isPaid:false,billing_client_id:{
                        connect:[...billingId]
                     },place_id:Number(placeId)
                }
            })
            const changeId= await prisma.billing.updateMany({
                where:{
                    bilanCoach_id:saveToElite.id
                },data:{
                    is_paid_elite:true
                }
            })

            const sendGridMailBillanElite={
                to: "elitetraining38@gmail.com",
                from :"elitetraining38@gmail.com",
                templateId:"d-78ce45dcd0514d5bae2c0d07b7585047",
                dynamic_template_data:{
                    coachName:ctx.session.user.name,madeAt:monthSelected,prix:price
                }
                ,attachments: [
                  {
                    content: billToSend,
                    filename: `bilan_${session.user.name}_${new Date().toLocaleDateString()}.pdf`,
                    type: 'application/pdf',
        disposition: 'attachment',
                  }
                ]
          }

          const sendGridMailBillanCoach={
            to: session.user.email,
            from :"elitetraining38@gmail.com",
            templateId:"d-fe2281f4b2804f29bbf3483de323531f",
            dynamic_template_data:{
                coachName:ctx.session.user.name,madeAt:monthSelected
            }
            ,attachments: [
              {
                content: billToSend,
                filename: `bilan_${session.user.name}_${new Date().toLocaleDateString()}.pdf`,
                type: 'application/pdf',
    disposition: 'attachment',
              }
            ]
      }
      await sgMail.send(sendGridMailBillanCoach)
      await sgMail.send(sendGridMailBillanElite)

            return 'succes'
        } catch (error) {
            return `error ${error}`
        }
        
  
    })
})