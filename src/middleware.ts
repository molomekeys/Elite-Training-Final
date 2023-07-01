import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"



export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
     
        if(req.nextUrl.pathname.startsWith("/admin")&&req.nextauth.token?.role!=='admin'){
                return NextResponse.rewrite(new URL ('/signIn',req.url))
        }
        if(req.nextUrl.pathname.startsWith("/coach")&&req.nextauth.token?.role!=='coach'){
            return NextResponse.rewrite(new URL ('/signIn',req.url))
    }
    if(req.nextUrl.pathname.startsWith("/client")&&req.nextauth.token?.role!=='client'){
        return NextResponse.rewrite(new URL ('/signIn',req.url))
}

    },
    {
      callbacks: {
        authorized: ({ token }) => !!token
      },
      pages:{
        signIn: '/',
      
      }
    },
  )
  



export const config = { matcher: ["/admin/:path*","/client/:path*","/coach/:path*"] }