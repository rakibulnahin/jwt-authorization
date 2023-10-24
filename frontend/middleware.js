import { NextResponse } from 'next/server'
import axios from "axios";
import { cookies } from 'next/headers'

async function refreshTokenValidation(refreshToken) {
    if (!refreshToken) {
        return false
    }
    let refresh_res = await fetch("http://127.0.0.1:3001/refreshVerify", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${refreshToken}`
        }
    });
    console.log(refresh_res.status);
    if (refresh_res.ok) {
        let data = await refresh_res.json();
        let new_access_token = data["accessToken"]
        // const cookieStore = cookies()
        // cookieStore.set("accessToken", new_access_token)
        console.log("Created new access token")
        return new_access_token
    } else {
        return false
    }
}

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("accessToken")
    const refreshToken = cookieStore.get("refreshToken")
    const response = NextResponse.next()
    // console.log("tokens", accessToken, refreshToken, "\n");

    if (!accessToken && !refreshToken) {
        console.log("No token at all\n");
        return NextResponse.redirect(new URL('/login', request.url))
    }
    else if (!accessToken) {

        console.log("No access token");
        let verified = await refreshTokenValidation(refreshToken.value)
        if (verified == false) {
            console.log("Not verified refresh token");
            return NextResponse.redirect(new URL('/login', request.url))
        }
        console.log("Verified refresh token \n");
        response.cookies.set('accessToken', verified, { maxAge: 20 })

    }
    else {

        console.log("Has access token");
        let access_res = await fetch("http://127.0.0.1:3001/accessVerify", {
            method: "POST",
            headers: { "Authorization": `Bearer ${accessToken.value}` }
        });

        if (access_res.ok) {

            console.log("Has VALID access token\n");
            return response

        } 
        else if (refreshToken != undefined) {
            console.log("Has INVALID access token")
            let verified = await refreshTokenValidation(refreshToken.value)
        
            if (verified == false) {
                console.log("Has INVALID refresh token Also \n");
                return NextResponse.redirect(new URL('/login', request.url))
            }
        
            response.cookies.set('accessToken', verified, { maxAge: 20 })
            console.log("Has VALID refresh token so created new accessToken \n");
            return response
        } 
        else {
            console.log("Does not have refresh token\n")
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    return response;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/game/:path*',
}