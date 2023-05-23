import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  addRoom:publicProcedure.input(z.object({
    name:z.string()


  })).mutation(async({ctx,input})=>{
     const addUser= await ctx.prisma.product.create({data:{
   name:input.name
     ,adress:'dernierajout',offers:{
   create:   [{clientPrice:50,coachPrice:40,weekNumber:2},
    {clientPrice:50,coachPrice:40,weekNumber:2}]
     }
      }})
  return addUser
    }),
    findOffer:
    publicProcedure.input(z.object({name:z.string()})).query
    (async({input,ctx:{prisma}})=>{
        const fetchedData=await prisma.product.findMany({include:{offers:true}})
        return fetchedData
    })
    ,
   
});
