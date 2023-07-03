// React
import { useState, useEffect } from 'react';

// Next
import Head from 'next/head';

export default function TimerPage() {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [wiggle, setWiggle] = useState(false);

    const [touchY, setTouchY] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;


        if (time == 1 && timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
                setWiggle(true);
            }, 1000);
        } else if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }


        return () => clearInterval(interval);
    }, [timerOn, time]);

    const resetTimer = () => {
        setTime(0);
        setTimerOn(false);
        setWiggle(false);
    };

    const addTime = (amount: number) => {
        setTime((prevTime) => prevTime + amount);
    };

    const touchYDirection = (e: any) => {
        let sensitivity = 10;
        console.log(e.touches[0].clientY);
        if (e.touches.length > 0) {
            // Don't register, if scrolling is not big enough
            if (touchY < e.touches[0].clientY + sensitivity && touchY > e.touches[0].clientY - sensitivity) {
                return 0;
            }


            if (e.touches[0].clientY - sensitivity > touchY) {
                setTouchY(e.touches[0].clientY);
                return 1;
            }
            if (e.touches[0].clientY + sensitivity < touchY) {
                setTouchY(e.touches[0].clientY);
                return -1;
            }
        }
        return 0;
    }

    return (
        // </div>
        <div className='flex m-auto flex-col h-full items-center justify-center'>
            <Head>
                <title>ICHNAEA | Timer</title>
            </Head>

            <div className={`flex flex-row bg-primary px-16 py-4 select-none font-black text-[3rem] sm:text-[5rem] md:text-[8rem] 2xl:text-[12rem] ${wiggle ? 'animate-wiggle' : ''}`}
                onClick={() => {setTimerOn(!timerOn);setWiggle(false);}}
                onDoubleClick={e => {e.preventDefault();resetTimer();}}>
                {/* Hour */}
                <div className='flex touch-none'
                    onWheel={(e: any) => { e.stopPropagation(); addTime(Math.sign(e.deltaY) * -3600); }}
                    onTouchStart={(e: any) => { e.stopPropagation(); setTouchY(e.touches[0].clientY); }}
                    onTouchMove={(e: any) => { e.stopPropagation(); e.preventDefault(); addTime(touchYDirection(e) * -3600); }}>
                    {Math.floor(Math.abs(time) / 3600).toString().padStart(2, '0')}
                </div>
                <div className='flex self-center text-[2rem] sm:text-[3rem] md:text-[5rem] 2xl:text-[8rem]'>:</div>
                {/* Minute */}
                <div className='flex relative touch-none'
                    onWheel={(e: any) => { e.stopPropagation(); addTime(Math.sign(e.deltaY) * -60); }}
                    onTouchStart={(e: any) => { e.stopPropagation(); setTouchY(e.touches[0].clientY); }}
                    onTouchMove={(e: any) => { e.stopPropagation(); e.preventDefault(); addTime(touchYDirection(e) * -60); }}>
                    {Math.floor(Math.abs(time) % 3600 / 60).toString().padStart(2, '0')}

                </div>
                <div className='flex self-center text-[2rem] sm:text-[3rem] md:text-[5rem] 2xl:text-[8rem]'>:</div>
                {/* Second */}
                <div className='flex touch-none'
                    onWheel={(e: any) => { e.stopPropagation(); addTime(-Math.sign(e.deltaY)); }}
                    onTouchStart={(e: any) => { e.stopPropagation(); setTouchY(e.touches[0].clientY); }}
                    onTouchMove={(e: any) => { e.stopPropagation(); e.preventDefault(); addTime(touchYDirection(e) * -1); }}>
                    {Math.floor(Math.abs(time) % 60).toString().padStart(2, '0')}
                </div>

            </div>
        </div>
    );
}
