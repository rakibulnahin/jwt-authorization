"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import anime from "animejs"
import Link from 'next/link'

// import { useSelector, useDispatch } from 'react-redux'
// import { setUserDetails } from '@/redux/userDetailsSlice'

import { parseCookies, setCookie } from 'nookies';

import { AiOutlineUser, AiOutlineHome } from "react-icons/ai"
import { RiLockPasswordLine, RiGameFill } from "react-icons/ri"
import { FaLock, FaUnlockAlt } from "react-icons/fa"

const Demo = () => {

    // const userDetails = useSelector((state) => state.userDetails)
    const [showForm, setShowForm] = useState("login")

    const [loginUsername, setLoginUsername] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    function animationHandler() {
        const moveAnimation = anime({
            targets: ".this-moves",
            translateX: "112px",
            duration: 500,
            easing: "easeInOutQuad",
            autoplay: false
        })

        const colorAnimation = anime({
            targets: ".this-changes",
            backgroundColor: "rgb(34 197 94)",
            duration: 500,
            easing: "easeInOutQuad",
            autoplay: false
        })

        const lockAnimation = anime({
            targets: ".color-change",
            color: "rgb(34 197 94)",

            duration: 500,
            easing: "easeInOutQuad",
            autoplay: false
        })

        anime({
            targets: '.this-moves, .this-changes .color-change',
            delay: 1000, // Add a slight delay for better visual effect
            complete: () => {
                //   setIsLocked(!isLocked); // Toggle the state
                console.log("Animation done")
            },
        });

        moveAnimation.play();
        colorAnimation.play();
        lockAnimation.play();
    }

    const loginHandler = async () => {
        console.log(loginPassword, loginUsername);
        localStorage.clear()

        let response = await axios.post("http://127.0.0.1:3001/login", { "username": "Monkey D. Luffy", "password": "123" })
        console.log(response.data);
        localStorage.setItem("accessToken", response.data.accessToken)
        localStorage.setItem("refreshToken", response.data.refreshToken)

        // Set cookies for tokens
        setCookie(null, 'accessToken', response.data.accessToken, {
            maxAge: 60, // 1 hour
            path: '/',
        });

        setCookie(null, 'refreshToken', response.data.refreshToken, {
            maxAge: 60 * 3, // 30 days
            path: '/',
        });

        // let user = await axios.get(
        //     "http://127.0.0.1:3001/authenticate/getUser",
        //     {
        //         headers: {
        //             'authorization': "Bearer " + localStorage.getItem("accessToken")
        //         }
        //     }
        // )

        // console.log(user.data);

        // causes login animation
        animationHandler()
    }



    const LoginForm = () => (
        <>
            <span className='text-2xl font-bold font-serif'>Login</span>

            <span className='flexCol gap-2 text-sm font-medium'>
                username
                <span className='flexRowCenter border-b-2 text-slate-100 text-sm font-normal'><AiOutlineUser className=' w-5 h-5' />
                    <input
                        className='bg-transparent placeholder:text-slate-300 pl-5 h-8 focus:outline-none'
                        type="text" placeholder='username'
                        value={loginUsername}
                        onChange={(event) => { setLoginUsername(event.target.value) }}
                    />
                </span>
            </span>
            <span className='flexCol gap-2 text-sm font-medium'>
                password
                <span className='flexRowCenter border-b-2 text-slate-100 text-sm font-normal'><RiLockPasswordLine className=' w-5 h-5' />
                    <input
                        className='bg-transparent placeholder:text-slate-300 pl-5 h-8 focus:outline-none'
                        type="text"
                        placeholder='username'
                        value={loginPassword}
                        onChange={(event) => { setLoginPassword(event.target.value) }}
                    />
                </span>
            </span>


            <div className="relative flexRow items-center w-36 h-9 gap-5 rounded-full this-changes bg-red-500 cursor-pointer"
                onClick={() => { loginHandler() }}
                style={{ borderColor: "rgb(239, 68, 68)" }}
            >
                <span className='absolute flexRow'>
                    <span className='flexRowCenter w-8 h-8 rounded-full border-white border-2 bg-red-500 this-moves this-changes'>
                        <FaLock className='' />
                    </span>
                </span>

                <span className='w-full flexRowCenter text-lg font-bold'>Login</span>

            </div>

            <span className='text-sm text-white font-semibold hover:font-bold cursor-pointer underline underline-offset-4'
                onClick={() => { setShowForm("signup") }}
            >
                Sign up
            </span>
        </>
    )

    const SignupForm = () => (
        <>
            <span className='absolute text-5xl left-10 top-3 cursor-pointer' onClick={() => { setShowForm("login") }}>&#8592;</span>

            <span className='text-2xl font-bold font-serif'>Sign Up</span>

            <span className='flexCol gap-2 text-sm font-medium'>
                Name
                <span className='flexRowCenter border-b-2 text-slate-100 text-sm font-normal'><AiOutlineUser className=' w-5 h-5' /> <input className='bg-transparent placeholder:text-slate-300 pl-5 h-8 focus:outline-none' type="text" placeholder='username' /> </span>
            </span>

            <span className='flexCol gap-2 text-sm font-medium'>
                username
                <span className='flexRowCenter border-b-2 text-slate-100 text-sm font-normal'><AiOutlineUser className=' w-5 h-5' /> <input className='bg-transparent placeholder:text-slate-300 pl-5 h-8 focus:outline-none' type="text" placeholder='username' /> </span>
            </span>

            <span className='flexCol gap-2 text-sm font-medium'>
                password
                <span className='flexRowCenter border-b-2 text-slate-100 text-sm font-normal'><RiLockPasswordLine className=' w-5 h-5' /> <input className='bg-transparent placeholder:text-slate-300 pl-5 h-8 focus:outline-none' type="text" placeholder='username' /> </span>
            </span>

            <span className='px-5 py-2 bg-gradient-to-l from-green-500 to-cyan-600 rounded-full font-semibold cursor-pointer shadow-sm shadow-green-500'>Create Account</span>

        </>
    )


    return (
        <div className='flexColCenter h-screen'>
            <div className='w-1/2 p-5 m-10 flexRow justify-between'>
                <Link href={"/"} onClick={()=>{console.log("clicked")}}><AiOutlineHome className='w-10 h-10' /></Link>
                <Link href={"/game"} onClick={()=>{console.log("clicked")}}><RiGameFill className='w-10 h-10' /></Link>
            </div>

            <div className='
                relative flexColCenter w-80 h-96 gap-5 
                text-slate-200 bg-gradient-to-tl from-third to-cyan-500  rounded-md 
                shadow-[0px_0px_160px] shadow-third/80'>

                {
                    showForm == "login" ? LoginForm() : SignupForm()
                }


            </div>

        </div>
    )
}

export default Demo
