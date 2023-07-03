import { Alarm, Arcade, Attachment, Book, BowlingBall, Computer, Emoji, EmojiLookDown, EmojiPuzzled, EmojiSatisfied, EmojiSingLeftNote, EmojiThinkRight, Gym, IconoirProvider, LightBulb, MathBook, Plus, Trekking } from "iconoir-react";

export default function IconProvider(icon: string) {

    switch (icon) {
        case "emoji-satisfied":
            return <EmojiSatisfied />
        case "emoji-sing":
            return <EmojiSingLeftNote />
        case "emoji-think":
            return <EmojiThinkRight />
        case "emoji-lookdown":
            return <EmojiLookDown />
        case "emoji-puzzled":
            return <EmojiPuzzled />
        case "book":
            return <Book />
        case "mathbook":
            return <MathBook />
        case "trekking":
            return <Trekking />
        case "gym":
            return <Gym />
        case "bowling":
            return <BowlingBall />
        case "computer":
            return <Computer />
        case "attachment":
            return <Attachment />
        case "arcade":
            return <Arcade />
        case "lightbulb":
            return <LightBulb />
        case "alarmclock":
            return <Alarm />
        default:
            return <Emoji />
    }

}
