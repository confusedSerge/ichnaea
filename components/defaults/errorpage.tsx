import Head from "next/head";

export default function ErrorPage({ title, message }: { title: string, message: string }) {

    return (
        <div className="flex flex-col h-full items-center justify-center">

            <Head>
                <title>ICHNAEA: {title}</title>
            </Head>

            <h1 className="text-9xl font-black"> 
                {title}
            </h1>
            <h2 className="text-4xl font-bold whitespace-pre-wrap">
                {message}
            </h2>
        </div>
    );
}
