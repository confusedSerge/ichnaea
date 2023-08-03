export default function Textarea({ descriptor, onChange, defaultValue }: { descriptor: string, onChange: any, defaultValue: string }) {

    return (
        <div className="flex flex-grow flex-col border-5 border-secondary">
            <div className="flex p-2 border-b-2 border-inherit justify-center items-center text-primary bg-secondary font-bold text-sm md:text-base lg:text-lg xl:text-xl">
                {descriptor}
            </div>
            <textarea className="flex flex-grow py-2 px-4 h-48 border-b-5 border-r-5 focus:outline-none font-light"
                onChange={e => onChange(e)}
                defaultValue={defaultValue}
            />
        </div>
    );

}