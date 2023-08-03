export default function Button({ descriptor, onClick, title }: { descriptor: string, onClick: any, title?: string }) {

    return (
        <div className="flex flex-grow flex-col space-y-1">
            {title && <span className="text-secondary font-bold text-sm md:text-base lg:text-lg xl:text-xl">{title}</span>}
            <button className="flex flex-row border-5 border-secondary justify-center items-center p-2 text-primary bg-secondary font-bold text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap hover:bg-primary hover:text-secondary transition-all duration-500 ease-in-out"
                onClick={e => onClick(e)} >
                {descriptor}
            </button>
        </div>
    );
}   