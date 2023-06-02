import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

//schena pour les events

const schemaEvent=z.object({start:z.date(),
  end:z.date(),title:z.string(),clientId:z.string(),hours: z.number()})

  //envoi email
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//trpc

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

 

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  // addRoom:publicProcedure.input(z.object({
  //   name:z.string()


  // })).mutation(async({ctx,input})=>{
  //    const addUser= await ctx.prisma.product.create({data:{
  //  name:input.name
  //    ,adress:'dernierajout',offers:{
  //  create:   [{clientPrice:50,coachPrice:40,weekNumber:2},
  //   {clientPrice:50,coachPrice:40,weekNumber:2}]
  //    }
  //     }})
  // return addUser
  //   })
  
    // findOffer:
    // publicProcedure.input(z.object({name:z.string()})).query
    // (async({input,ctx:{prisma}})=>{
    //     const fetchedData=await prisma.product.findMany({include:{offers:true}})
    //     return fetchedData
    // })

seeEventCalendar:publicProcedure.query(async ({ctx})=>{
  if(ctx.session?.user.coachTable?.id!=undefined)
  {
  const momo = await ctx.prisma.events.findMany({

    where:{
   coach_id: Number( ctx.session.user.coachTable?.id)
      
    }
  })
  return momo
}
})
  ,

  addEventsCalendar:publicProcedure.mutation(async ({ctx,input})=>{
    if(ctx.session?.user.coachTable?.id!=undefined)
    {
    const momo = await ctx.prisma.events.create({
      data:{coach_id:Number(ctx.session?.user?.coachTable?.id),
        end:new Date('2023-06-12'),start:new Date('2023-06-12'),hours:10,title:'entrainement de merouane'
      }
    })
    return momo
  }
  })
    ,
    signInUser:publicProcedure.input(z.object(
      {name:z.string(),email:z.string(),phoneNumber:z.string(),sirenNumber:z.string(),password:z.string()})).
      mutation(async({ctx,input:{email,password,name,sirenNumber,phoneNumber}})=>{
        const existingUser = await ctx.prisma.user.findUnique({
          where: {
            email: email // Replace with the email you want to check
          }
        })
        if(existingUser)
        {
          return 'user already existe'
        }
        else if(!existingUser) {
        const createUser=await ctx.prisma.user.create({data:{phone_number:phoneNumber,
          email:email,password:password,role:'coach',name:name},select:{id:true}})
          
         const {id}=createUser
          const createCoach=await ctx.prisma.coach.create({data:{
            numero_siren:sirenNumber,UserIdCoach:{
             connect:{
              id:id
             }
            }

          }})
         
          const sendGridMail={
            to: email,
            from :'ouzar.merouane@gmail.com',
            templateId:"d-9f8483eff2c943d4a994e5e97cce8ff3",
            dynamic_template_data:{
                coachName:name
            }
        }
        try {
            // await sgMail.send(sendGridMail);
            // console.log('Email sent successfully.');
            return createUser
        
        } catch (error) {
          return `error`
        }
            
           

         
        
         
         
         
          
       
      }
      }),
      availableOffer:publicProcedure.query(async( {ctx})=>{
        const {prisma}=ctx
        const fetchPlaces=await prisma.availablePlace.findMany({
          select:{
            room_name:true,
            id:true,
            related_offerPrisma:{
select:{
  pricing_offer:{
    select:{
      client_price:true,
      coach_price:true,
      type_offert:true,
      id:true,
      seance_week:true,
      stripe_id:true
    }
    
  }
}
            }
          }
        })
const momo =fetchPlaces.map((e)=>{
  const {related_offerPrisma,...rest}=e
  const test =related_offerPrisma.pricing_offer.map((e)=>{
   
    return {...e}
  })
  return {...rest,pricing:test}
})


return momo
      })
      ,
      loginIn:publicProcedure.input(z.object({email:z.string(),password:z.string()})).
      query(async ({input,ctx})=>{
        const findUser= await ctx.prisma.user.findFirst({where:{
          email:input.email,
        },include:{
          coach_table:true
        }})
        if(!findUser){
          return "aucun compte n'est associer à cette email "
        }
       else if(findUser&&findUser.password!=input.password)
        {
          return 'Mots de passe incorrect'
        }
        else {
          return findUser
        }
      }),createClient:publicProcedure.input(z.object(
        {name:z.string(),phoneNumber:z.string(),email:z.string(),password:z.string()})).
        mutation(async({ctx,input:{email,password,name,phoneNumber}})=>{
          const existingUser = await ctx.prisma.user.findUnique({
            where: {
              email: email // Replace with the email you want to check
            }
          })
          if(existingUser)
          {
            return 'utilisateur déjà existant'
          }
          else if(!existingUser) {
          const createUser=await ctx.prisma.user.create({data:{email:email,password:password,role:'client',name:name,phone_number:phoneNumber},select:{
            id:true
          }})

          const addForClient=await ctx.prisma.client.create({data:{
            coach_id:ctx.session?.user.id,user_id:createUser.id,
          }})
        
          return 'bravo utilisateur ajouter avec succès'
        }
        }),fetchCoachData:publicProcedure.input(z.object({id:z.string()})).
        query(async ({input,ctx})=>{
          const findUser= await ctx.prisma.user.findFirst({where:{
            id:ctx.session?.user.id
          }})
       return findUser
        }),
      fetchDataLoginCoach:publicProcedure.query(async ({ctx})=>{
        if(ctx.session?.user.id)
        {
          const fetchRelatedCoach=await ctx.prisma.client.findMany({
            where:{
              coach_id:ctx.session.user.id,
               
             },select:{
              created_at:true,
              UserIdPrisma:{
                select:{
                  email:true,name:true,id:true,phone_number:true
                }
              }
             }
               
                  
                  
                
               
             
                
              })
             
              
                    
                  
          
             
              return fetchRelatedCoach
            }
          })})
                   
 
          
   
        
    
