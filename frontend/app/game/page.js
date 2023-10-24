"use client"
import React, { useEffect, useState } from 'react'

import { RxCross1 } from "react-icons/rx"
import { BsCircle } from "react-icons/bs"
import {TbReload} from "react-icons/tb"
import Link from 'next/link'


const page = () => {

  useEffect(() => {
    console.log(turn, tiles);
  })

  const [tiles, setTiles] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [turn, setTurn] = useState(1);
  const [message, setMessage] = useState("")


  const checkTiles = () => {
    if (tiles[0] == tiles[1] && tiles[1] == tiles[2] && (tiles[2] == 1 || tiles[2] == 2)) {
      setMessage(<div className='text-4xl text-green-400'>Victory to Player {turn}</div>)
      return true
    } else if (tiles[3] == tiles[4] && tiles[4] == tiles[5] && (tiles[5] == 1 || tiles[5] == 2)) {
      setMessage(<div className='text-4xl text-green-400'>Victory to Player {turn}</div>)
    } else if (tiles[6] == tiles[7] && tiles[7] == tiles[8] && (tiles[7] == 1 || tiles[7] == 2)) {
      setMessage(<div className='text-4xl text-green-400'>Victory to Player {turn}</div>)
      return true
    } else if (tiles[0] == tiles[3] && tiles[3] == tiles[6] && (tiles[6] == 1 || tiles[6] == 2)) {
      setMessage(<div className='text-4xl text-green-400'>Victory to Player {turn}</div>)
      return true
    } else if (tiles[1] == tiles[4] && tiles[4] == tiles[7] && (tiles[7] == 1 || tiles[7] == 2)) {
      setMessage(<div className='text-4xl text-green-400'>Victory to Player {turn}</div>)
      return true
    } else if (tiles[2] == tiles[5] && tiles[5] == tiles[8] && (tiles[8] == 1 || tiles[8] == 2)) {
      setMessage(<div className='text-4xl text-green-400'>Victory to Player {turn}</div>)
      return true
    }
    else if (tiles[0] == tiles[4] && tiles[4] == tiles[8] && (tiles[8] == 1 || tiles[8] == 2)) {
      setMessage(<div className='text-4xl text-green-400'>Victory to Player {turn}</div>)
      return true
    } else if (tiles[2] == tiles[4] && tiles[4] == tiles[6] && (tiles[6] == 1 || tiles[6] == 2)) {
      setMessage(<div className='text-4xl text-green-400'>Victory to Player {turn}</div>)
      return true
    }

  }

  const onClickHandler = (tile) => {
    let x = tiles
    if (x[tile] == 0) {
      x[tile] = turn
      setTiles(x)
      let win = checkTiles()
      if (!win) {
        flipTurn()
        setMessage("")
      }

    } else {
      setMessage(<div className='text-4xl text-red-500'>Invalid Move</div>)
    }

  }

  const flipTurn = () => {
    if (turn == 1) {
      setTurn(2)
    } else {
      setTurn(1)
    }
  }

  return (
    <div className='flexColCenter h-screen'>
      <Link  href={"/login"} className='w-full p-10 text-5xl'>&#8592;</Link>
      <div>{message}</div>

      <div className='flexRowCenter gap-3 m-5' onClick={()=>{
        setTiles([0, 0, 0, 0, 0, 0, 0, 0, 0])
        setTurn(1)
        setMessage("")
      }}><TbReload className='w-10 h-10' /> Reload</div>

      <div className='w-100 h-100 grid grid-cols-3 grid-rows-3 gap-2'>

        {
          tiles.map((value, index) => {
            if (value == 2) {
              return (
                <div
                  key={`${index}`}
                  onClick={() => {
                    onClickHandler(index)
                  }}
                  className='bg-gradient-green rounded-md p-3'
                >
                  <BsCircle className='w-full h-full font-bold ' />
                </div>
              )
            } else if (value == 1) {
              return (
                <div
                  key={`${index}`}
                  className='bg-gradient-pink rounded-md'
                  onClick={() => {
                    onClickHandler(index)
                  }}
                >
                  <RxCross1 className='w-full h-full font-bold text-red-200' />
                </div>
              )
            } else {
              return (
                <div
                  key={`${index}`}
                  className='bg-white rounded-md text-black'
                  onClick={() => {
                    onClickHandler(index)
                  }}
                >
                </div>
              )
            }
          })
        }

        {/* <div className='bg-white rounded-md'></div> */}

        {/* <div className='bg-gradient-pink rounded-md'>
          <RxCross1 className='w-full h-full font-bold text-red-200' />
        </div>

        <div className='bg-gradient-green rounded-md p-3'>
          <BsCircle className='w-full h-full font-bold ' />
        </div> */}

      </div>


    </div>
  )
}

export default page
