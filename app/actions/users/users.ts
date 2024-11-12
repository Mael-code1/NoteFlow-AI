'use server'
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function UserID() {
    const usercookies = cookies().get('nombre')?.value
    if (usercookies) {
        console.log(usercookies);
        try{
            const secretKey = new TextEncoder().encode(
                process.env.JWT_SECRET || "supersecretkey")
                const {payload} = await jwtVerify(usercookies,secretKey)
                const userID = payload.id as number
                console.log(userID);
                return userID
            }catch(e){
                console.log("error verificando el token :",e )
            }
    }
}