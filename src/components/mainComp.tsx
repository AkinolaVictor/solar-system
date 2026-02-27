// "use client"
import React, { useEffect, useRef} from 'react'
import { initializer } from './init'
import Head from 'next/head'

interface Props {}

function MainComp(props: Props) {
    const {} = props
    const canvasElem = useRef(null)


    useEffect(()=>{
        return initializer({canvas: canvasElem.current})
    }, [])
    
    return (
        <div className='w-screen h-screen text-white relative'>
            <Head>
                <title>The Solar System</title>
                <meta name="description" content="A preview of our solar system" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <canvas ref={canvasElem} className="webgl absolute top-0 left-0 z-1"></canvas>
            <nav className='text-white z-2 relative px-4 py-5 flex justify-between'>
                <p className='font-bold no-underline'>The Solar System</p>
                <div onClick={(e)=>{}} className='flex opacity-0 text-black cursor-pointer justify-center items-center bg-white rounded-[100px] w-10 h-10'>
                </div>
            </nav>
        </div>
    )
}

export default MainComp
