import { number, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import jwt from 'jsonwebtoken'
import { env } from "~/env.mjs";
export const forgetPassword=createTRPCRouter(
    {
        forgetPasswordInfo:publicProcedure.input(z.object({email:z.string()})).mutation(async ({ctx,input})=>{
                const {prisma,session}=ctx
                const {email}=input
                const findUser=await prisma.user.findUnique({
                    where:{
                        email:email
                    },select:{
                        password:true
                    }
                   
                })
                if(findUser!=null){
                    const token=jwt.sign(email,env.ACCESS_TOKEN)
                    return token


                }
                else {
                    return "aucun compte n'est associé à cette adresse email"
                }

                
        }),delockJeton:publicProcedure.input(z.string()).mutation(async ({input,ctx})=>{

            
            
            const delockValue=jwt.verify(input,env.ACCESS_TOKEN)
            return delockValue

        })
    }
)