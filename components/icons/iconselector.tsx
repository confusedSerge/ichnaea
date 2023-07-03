import { Alarm, Arcade, Attachment, Book, BowlingBall, Computer, EmojiLookDown, EmojiPuzzled, EmojiSatisfied, EmojiSingLeftNote, EmojiThinkRight, Gym, IconoirProvider, LightBulb, MathBook, Plus, Trekking } from "iconoir-react";
import { useState } from "react";

interface IconSelectorProps {
    icon: string;
    setIcon: (icon: string) => void;
}

export default function IconSelector(props: IconSelectorProps) {

    const [open, setOpen] = useState(false);

    return (
        <div className="relative cursor-pointer">
            <Plus className="stroke-2" onClick={() => setOpen(!open)} />
            {open && (
                <div className="absolute top-0 left-0 px-8 py-4 bg-primary rounded-lg shadow border-2 border-primary hover:border-accent transition-colors duration-500 animate-fadein" onClick={() => setOpen(false)}>
                    <div className="flex flex-col gap-4">
                        <IconoirProvider iconProps={{
                            className: 'stroke-2 hover:text-accent cursor-pointer transition-colors duration-500'
                        }}>
                            {/* Emojis */}
                            <div className="flex flex-row gap-4">
                                <EmojiSatisfied onClick={() => { props.setIcon("emoji-satisfied"); setOpen(false) }} />
                                <EmojiSingLeftNote onClick={() => { props.setIcon("emoji-sing"); setOpen(false) }} />
                                <EmojiThinkRight onClick={() => { props.setIcon("emoji-think"); setOpen(false) }} />
                                <EmojiLookDown onClick={() => { props.setIcon("emoji-lookdown"); setOpen(false) }} />
                                <EmojiPuzzled onClick={() => { props.setIcon("emoji-puzzled"); setOpen(false) }} />
                            </div>

                            {/* Other */}
                            <div className="flex flex-row gap-4">
                                <Book onClick={() => { props.setIcon("book"); setOpen(false) }} />
                                <MathBook onClick={() => { props.setIcon("mathbook"); setOpen(false) }} />
                                <Trekking onClick={() => { props.setIcon("trekking"); setOpen(false) }} />
                                <Gym onClick={() => { props.setIcon("gym"); setOpen(false) }} />
                                <BowlingBall onClick={() => { props.setIcon("bowling"); setOpen(false) }} />
                            </div>

                            {/* Activities */}
                            <div className="flex flex-row gap-4">
                                <Computer onClick={() => { props.setIcon("computer"); setOpen(false) }} />
                                <Attachment onClick={() => { props.setIcon("attachment"); setOpen(false) }} />
                                <Arcade onClick={() => { props.setIcon("arcade"); setOpen(false) }} />
                                <LightBulb onClick={() => { props.setIcon("lightbulb"); setOpen(false) }} />
                                <Alarm onClick={() => { props.setIcon("alarmclock"); setOpen(false) }} />
                            </div>
                        </IconoirProvider>
                    </div>
                </div>
            )
            }
        </div >

    );
}