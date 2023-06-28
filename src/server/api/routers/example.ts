
import { number, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

//schena pour les events


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
    }),changeDateEvent:publicProcedure.input(z.object({customMessage:z.string(),idEvent:z.number(),start:z.date(),end:z.date()})).mutation(async({ctx,input})=>{
      const {idEvent,start,end,customMessage}=input
      const changeEvent = await ctx.prisma.events.update({
        where:{
            id:idEvent
        },data:{
          start:start,end:end,custom_message:customMessage
        }
      })
     if(changeEvent)
     {
      return 'success'
     }
     else if(changeEvent==null){
      return 'false '
     }
    }),
    fetchAllClient:publicProcedure.query(async ({ctx})=>{

        const allClient = await ctx.prisma.client.findMany({
        
          select:{
            created_at:true,
          
            UserIdPrisma:{
              select:{
                email:true,
                 name:true,
                 phone_number:true
                 ,
              }
            
            },coachId:{
              select:{
                UserIdCoach:{
                  select:{
                    name:true,
                  }
                }
              }
            }
          }
        })
        const allClientFIltered=allClient.map((e)=>{
          const {UserIdPrisma,coachId,...rest}=e
          if(coachId?.UserIdCoach)
          {
          return {...UserIdPrisma,coachName:coachId.UserIdCoach.name,...rest}
        }
      
        })
        if(allClientFIltered)
        {
      return allClientFIltered
    }
    else {
      return 'no client'
    }
    }),
    fetchAllCoach:publicProcedure.query(async ({ctx})=>{

      const allClient = await ctx.prisma.coach.findMany({
      
        select:{
          numero_siren:true,
          id:true,isValid:true,
          created_at:true,
          licence_sportif:true,
          
          UserIdCoach:{
            select:{
              email:true,
               name:true,
               phone_number:true
               ,
            }
          
          },
         _count:{
          select:{
            client:true
          }
         }
        }
      })
      const allClientFIltered=allClient.map((e)=>{
        const {UserIdCoach,_count,created_at,...rest}=e
       
        return {clients:_count.client,...UserIdCoach,created_at:created_at,...rest}
      
    
      })
      if(allClientFIltered)
      {
    return allClientFIltered
  }
  else {
    return 'no client'
  }
  }),
 

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  

seeEventCalendarCoach:publicProcedure.query(async ({ctx})=>{
  if(ctx.session?.user.coach_table?.id!=undefined)
  {
    console.log(ctx.session.user.coach_table.id)
    console.log('je sais pas pourquoi ça marche')
    console.log(ctx.session.user.coach_table.id)
  const dbEventsFetched = await ctx.prisma.events.findMany({

    where:{
      coach_id:Number(ctx.session.user.coach_table.id)
      
    },select:{id:true,custom_message:true,
      start:true,title:true,end:true,hours:true,isPaid:true,useridprismaClient:{
        select:{
         UserIdPrisma:{
          select:{
            name:true,phone_number:true
            
          }
         }
      
        }}}})
  
 
  const filteredData =dbEventsFetched.map((e)=>{
    const {useridprismaClient,...rest}=e
    return {...useridprismaClient?.UserIdPrisma,...rest}})
  return filteredData
  }


}),billEliteForCoach:publicProcedure.input(z.object({dateSart:z.date(),
  dateEnd:z.date(),roomName:z.string()})).mutation(async({ctx,input})=>{
  const fetchData= await ctx.prisma.coach.findUnique({
    where:{
      id:Number(ctx.session?.user?.coach_table?.id)
    },select:{
      isValid:true
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
        isPaid:true,salle_id:Number(input.roomName)
        ,createdAt:{
          lte: newEndDate,gte:newStartDate
        }
      },select:{
        createdAt:true,hours:true,price:true,offer_prisma_id:{
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
    console.log(fetchBilling)


    const fetchBillingFiltered=fetchBilling.map((e)=>{
      const {offer_prisma_id,prisma_place_id,...rest}=e
      return {place:prisma_place_id?.room_name,...rest}
    })
 
   
  return fetchBillingFiltered

  }
  else {
    return 'non valide '
  }
 
}),dashboardCoachData:publicProcedure.query(async({ctx})=>{
  const {prisma,session}=ctx
  const awaitFetch= await prisma.client.count({
    where:{
      coach_id:Number(session?.user.coach_table?.id)
    }
  })
  const awaitBill = await prisma.billing.count({
    where:{

      coach_id:Number(session?.user.coach_table?.id)
    }
  })
  return {client:awaitFetch,bills:awaitBill}
})
  ,seeEventCalendarCient:publicProcedure.query(async ({ctx})=>{

    console.log(ctx.session?.user.client_table?.id)
    if(ctx.session?.user.client_table?.id)
    {
    const dbEventsFetchedClient= await ctx.prisma.events.findMany({
  

      where:{
        client_id:Number(ctx.session.user.client_table.id)
        
      },select:{custom_message:true,
        start:true,title:true,end:true,hours:true,isPaid:true,
        id:true,UserIdCoach:{
          select:{
            UserIdCoach:{
                select:{
              name:true , phone_number:true
                }
            }
          }
        }
      }
    })
   
    const filteredData =dbEventsFetchedClient.map((e)=>{
      const {UserIdCoach,...rest}=e
      return {...UserIdCoach?.UserIdCoach,...rest}
    })
    return filteredData

 
  }







  }),    fetchAllBillsCoach:publicProcedure.query(async({ctx})=>{
    if(ctx.session?.user.role=='coach')
    { 
   
         const allBills = await ctx.prisma.billing.findMany({where:{
          coach_id:Number(ctx.session.user.coach_table?.id)
         },
         select:{
           bill_invoice_pdf:true,
           hours:true,
           isPaid:true,id:true,
           createdAt:true,
           prisma_place_id:{
             select:{
               room_name:true
             }
           },
         prisma_client_id:{
             select:{
               UserIdPrisma:{
                 select:{
                   name:true
                 }
               }
             }
           }
             
           
         }
       })
       const allBillInfoFltered=allBills.map((e)=>{
         const {prisma_client_id,prisma_place_id,...rest}=e
         return {place:e.prisma_place_id.room_name,...rest,client_name:prisma_client_id.UserIdPrisma.name}
       })
       return allBillInfoFltered
       }
     else {
       return 'access denied'
     }
     })
    ,
    fetchAllBillsAdmin:publicProcedure.query(async({ctx})=>{
 if(ctx.session?.user.role=='admin')
 { 

      const allBills = await ctx.prisma.billing.findMany({select:{
        bill_invoice_pdf:true,
        hours:true,
        isPaid:true,id:true,
        createdAt:true,
        prisma_place_id:{
          select:{
            room_name:true
          }
        },
        prisma_coach_id: {
          select:{
            UserIdCoach:{
              select:{
                name:true
              }
            }
          }
        },prisma_client_id:{
          select:{
            UserIdPrisma:{
              select:{
                name:true
              }
            }
          }
        }
          
        ,
        offer_prisma_id:{
          select:{
            stripe_id:true ,client_price:true,coach_price:true
          }
        }
      }
    })
    const allBillInfoFltered=allBills.map((e)=>{
      const {offer_prisma_id,prisma_client_id,prisma_coach_id,prisma_place_id,...rest}=e
      return {...offer_prisma_id,place:e.prisma_place_id.room_name,...rest,client_name:prisma_client_id.UserIdPrisma.name,coach_name:prisma_coach_id.UserIdCoach.name}
    })
    return allBillInfoFltered
    }
  else {
    return 'access denied'
  }
  })
  
     
    
    ,
fetchBillingClient:publicProcedure.query(async({ctx})=>{
  if(ctx.session?.user.client_table?.id)
  {
const allBillInfo=await ctx.prisma.billing.findMany(({
  where:{
    client_id:Number(ctx.session?.user.client_table?.id)
  },select:{
    bill_invoice_pdf:true,prisma_place_id:{
      select:{
        room_name:true,

      }
    },type_offer:true,
    hours:true,price:true,
    isPaid:true,id:true,
    createdAt:true,
    offer_prisma_id:{
      select:{
        stripe_id:true ,client_price:true
      }
    },programme_selling_id:{
      select:{
        stripe_id:true,client_price:true
      }
    }
  }
}))
const allBillInfoFltered=allBillInfo.map((e)=>{
  const {offer_prisma_id,prisma_place_id,...rest}=e
  return {...offer_prisma_id,...rest,roomName:prisma_place_id.room_name}
})
return allBillInfoFltered
}
}),
  addEventsCalendar:publicProcedure.input(z.object({
    billingData:z.object({
      prisma_client_id:z.number(),price:z.number(),type:z.string(),
      prisma_coach_id:z.number(),hours:z.number(),
      prisma_place_id:z.number(),bill_invoice_pdf:z.string(),
      offer_prisma_id:z.number()}),
    
    
    eventData:z.array(z.object({
      start:z.date(),end:z.date(),title:z.string(),hours:z.number(),salle_id:z.number(),
      coach_id:z.number(),client_id:z.number()}))
  })).mutation(async ({ctx,input})=>{
 
// debut de la function

    const {billingData,eventData}=input
let billingId=0
    const {bill_invoice_pdf,hours,offer_prisma_id,
      prisma_client_id,prisma_coach_id,prisma_place_id}=billingData
    if(ctx.session?.user.coach_table?.id!=undefined)
    {

      if(billingData.type=='coaching')
      {
      const billClient=await ctx.prisma.billing.create({
        data:{type_offer:billingData.type,price:
        billingData.hours*billingData.price ,
        bill_invoice_pdf:bill_invoice_pdf,hours:hours,
        client_id:prisma_client_id,offer_id:billingData.offer_prisma_id,
        coach_id:prisma_coach_id,salle_id:prisma_place_id, 
        }

      })
      const {id}=billClient

      billingId=id

  }

  if(billingData.type=='programme')
      {
      const billClient=await ctx.prisma.billing.create({
        data:{type_offer:billingData.type,price:
        billingData.price ,programme_id:billingData.offer_prisma_id,
        bill_invoice_pdf:bill_invoice_pdf,hours:hours,
        client_id:prisma_client_id,
        coach_id:prisma_coach_id,salle_id:prisma_place_id, 
        }

      })

      const {id}=billClient
      billingId=id
  }



//events to put in the db
const finalEvents=eventData.map((e)=>{
  return {...e,billing_id:billingId}
})


      const momo =await ctx.prisma.events.createMany({
        data:[...finalEvents]
      })

     if(momo){
      return 'succes addes'
     }
     else if(!momo){
      return 'une erreur est survenue'
     }
        
    // const momo = await ctx.prisma.events.createMany({
    //   data:[{coach_id:Number(ctx.session.user.coach_table.id),client_id:Number(input.client_id),billing_id:id,
    //     end:new Date('2023-06-15'),start:new Date('2023-06-15'),hours:10,title:'entrainement de merouane'
    //   },{coach_id:Number(ctx.session.user.coach_table.id),client_id:Number(input.client_id),
    //     end:new Date('2023-06-15'),start:new Date('2023-06-15'),hours:10,title:'entrainement de merouane'
    //   }]
    // })

    // return momo
  }
  })
    ,validationLicenceCoach:publicProcedure.input(z.object({idCoach:z.string(),validate:z.boolean()}))
    .mutation(async ({ctx,input})=>{
      const {idCoach,validate}=input
      const validateCoach=await ctx.prisma.coach.update({
        where:{
          id:Number(idCoach)
        },data:{
          isValid:validate
        }
      })
      if(validateCoach)
      {
return 'success'
}
else if(!validateCoach)
{
  return 'un probleme est survenue'
}
    }),
    signInUser:publicProcedure.input(z.object(
      {name:z.string(),email:z.string(),licence_sportif:z.string(),phoneNumber:z.string(),sirenNumber:z.string(),password:z.string()})).
      mutation(async({ctx,input:{email,password,name,sirenNumber,phoneNumber,licence_sportif}})=>{
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
          const createCoach=await ctx.prisma.coach.create({data:{licence_sportif:licence_sportif,
            numero_siren:sirenNumber,UserIdCoach:{
             connect:{
              id:id
             }
            }

          }})
         
          const sendGridMail={
            to: email,
            from :"elitetraining38@gmail.com",
            templateId:"d-fab816f818c047b284bb78a0a49d3a33 ",
            dynamic_template_data:{
                coachName:name
            }
        }
        try {
            await sgMail.send(sendGridMail);
            console.log('Email sent successfully.');
            return createUser
        
        } catch (error) {
          return `error`
        }
            
           

         
        
         
         
         
          
       
      }
      }),availaibleRoom:publicProcedure.query(async({ctx})=>{

        const {prisma}=ctx 
        const allRoom = await prisma.availablePlace.findMany({
          select:{
            room_name:true,id:true
          }
        })  

return allRoom
      }),
      availableOffer:publicProcedure.query(async( {ctx})=>{
        const {prisma}=ctx

        //prisma pour fetch les salles 
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
            },programme_price:true
          }
        })
const momo =fetchPlaces.map((e)=>{
  const {related_offerPrisma,programme_price,...rest}=e
  const test =related_offerPrisma.pricing_offer.map((e)=>{
   
    return {...e}
  })
  return {...rest,pricing:test,programme:programme_price}
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
            coach_id:Number(ctx.session?.user.coach_table?.id),user_id:createUser.id,
          }})
          
          const sendGridMail={
            to: email,
            from :"elitetraining38@gmail.com",
            templateId:"d-80f1d4b1219e4d98bdefa4270b41bffa",
            dynamic_template_data:{
              
                coachName:ctx.session?.user.name
                ,emailClient: email,password:password,clientName:name
                
                
            }
          }
          await sgMail.send(sendGridMail);
          return 'bravo utilisateur ajouter avec succès'
        }
        }),updatePassword:publicProcedure.input(z.object({password:z.string(),newPassword:z.string()})).mutation(async({ctx,input})=>{

          const checkingPassword= await ctx.prisma.user.findUnique({
            where:{
              id:ctx.session?.user.id
            },select:{
              password:true
            }
          })
          if(checkingPassword?.password==input.password){
            let changingPassord = await ctx.prisma.user.update({
              where:{
                id:ctx.session?.user.id
              },data:{
                password:input.newPassword
              }
            })
            if(changingPassord){
              return 'succes'
            }
            
          }
          else {
            return 'mot de passe incorrect'
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
              coach_id:Number(ctx.session.user?.coach_table?.id),
               
             },select:{
              created_at:true,
              id:true,
              UserIdPrisma:{
                select:{
                  email:true,name:true,id:true,phone_number:true,
                }
              }
             }
               
                  
                  
                
               
             
                
              })
             
              
                    
                  
          
             
              return fetchRelatedCoach
            }
          })})
                   
 
          
   
        
    
