// Next
import Link from "next/link";

const Footer: React.FC<{}> = () => {

    return (
        <div className="flex flex-col sm:flex-row px-4 py-6 space-y-4 sm:space-y-0 sm:space-x-16 items-center justify-center opacity-75">
            <Link className="" href="/privacy-policy">Privacy Policy</Link>
            <span className="hidden sm:flex">
                ·
            </span>
            <Link className="" href="/legal-notice">Legal Notice</Link>
            <span className="hidden sm:flex">
                ·
            </span>
            <Link className="" href="/licenses" prefetch={false}>Licenses</Link>
        </div>
    );

}

export default Footer;
