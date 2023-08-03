export default function Input({ descriptor, type, onChange, defaultValue, style }: { descriptor: string, type: string, onChange: any, defaultValue: string, style?: 1 | 2 | 3 }) {

    if (style == 1) {
        return (
            <div className="flex flex-grow flex-col space-y-1">
                <span className="text-secondary font-bold text-sm md:text-base lg:text-lg xl:text-xl">{descriptor}</span>
                <div className="flex flex-col border-5 border-secondary">
                    <input type={type} className="py-4 px-2 border-l-5 border-t-5 focus:outline-none font-light"
                        onChange={e => onChange(e)}
                        defaultValue={defaultValue}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-grow flex-row border-5 border-secondary">
            <div className="w-1/5 flex p-2 justify-center items-center text-primary bg-secondary font-bold text-sm md:text-base lg:text-lg xl:text-xl">
                {descriptor}
            </div>
            <input type={type} className="w-4/5 flex flex-grow px-2 border-b-5 border-r-5 focus:outline-none font-light"
                onChange={e => onChange(e)}
                defaultValue={defaultValue}
            />
        </div>
    );
}