// Next component
import type { AppProps } from 'next/app'
import Head from 'next/head';

// Custom component 
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/navbar/footer';

// CSS 
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="h-full min-h-screen flex justify-center bg-primary font-monserrat text-secondary">
            <div className="flex flex-col w-full mx-4">

                <Head>
                    <title>ICHNAEA</title>
                    {/* favicon */}
                    <link rel="icon" href="/favicon.svg" />
                    {/* Encoding */}
                    <meta charSet='UTF-8' />
                    {/* Description */}
                    <meta name="description" content="

                    " />
                    <meta name="keywords" content="
                        Task, Manager, Task Manager, Task Manager App, Task Manager Application, Task Manager Web App, Task Manager Web,
                        Calendar, Calendar App, Calendar Application, Calendar Web App, Calendar Web, Calendar Web Application,
                        Time Tracker, Time Tracker App, Time Tracker Application, Time Tracker Web App, Time Tracker Web, Time Tracker Web Application,
                        Pomodoro, Pomodoro App, Pomodoro Application, Pomodoro Web App, Pomodoro Web, Pomodoro Web Application,
                    " />
                    <meta name="author" content="" />
                    
                    {/* Open Graph */}
                    <meta property="og:title" content="ICHNAEA" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="" />
                    <meta property="og:image" content="" />
                    <meta property="og:description" content="

                    " />
                    <meta property="og:site_name" content="ICHNAEA" />
                </Head>

                <div className="top-0 z-50 w-full">
                    <Navbar />
                </div>

                <Component {...pageProps} />


                <div className="bottom-0 z-50 w-full">
                    <Footer />
                </div>
            </div>
        </div>

    );
}
