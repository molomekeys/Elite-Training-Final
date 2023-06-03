import { type GetServerSidePropsContext } from "next";
import { api } from "~/utils/api";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  DefaultUser,
  Session,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { string } from "zod";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role:string
      coach_table?:{
        id:string
      }
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User{
    role: string;
  }
 interface Token{
  role:string
 }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session:{strategy:'jwt'},

  callbacks: {
   jwt:({token,user})=>{
  console.log(token,user)
    return {...token,...user}
   },
    session: ({ session,token }) => {


       type test={
        id: string;
        role: string;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        coachTable?:{
          id:string
        }
    }
       
    session.user=token as test
   
      return ({
      
      ...session,
     
    })},
   




  // signIn: async({user,account})=>{
  //   let userTest=true
  
  //   console.log(user)
     
  //     if(user){
      
  //       if(user.role=='admin'){
  //         return 'http://localhost:3000/dashboardAdmin'
  //       }
  //       else if(user.role=='coach'){
  //           return 'http://localhost:3000/dashboardCoach'
  //       }
  //     return false
  //     }
  //    
    
  // }
  },

 
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
      
        // Add logic here to look up the user from the credentials supplied
        const momo =await prisma.user.findFirst(
          {where:{email:credentials?.username},include:{
            coach_table:true
          }})
        console.log(credentials)
       
        if(momo!=null)
        {
          console.log(momo)
          const {password,...rest}=momo
         
          return {...rest}
        }
        else {
          return null
        }
        
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        
      }
    })
  
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
