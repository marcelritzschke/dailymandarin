import { BilingualText } from "@/types/types";
import { translateMandarinToPinyin, getTones } from "@/app/utils/translation"
import { useState } from "react";

const MandarinEnglishText: React.FC<{ text: BilingualText, focus: string }> = ({ text, focus }) => {
    const hanzi = text.original.split("");
    const tones = getTones(text.original).split(" ");
    const pinyin = translateMandarinToPinyin(text.original).split(" ");
    const colorMap = new Map([
        ["1", "tone-first"],
        ["2", "tone-second"],
        ["3", "tone-third"],
        ["4", "tone-fourth"],
    ]);
    
    let isToneColorized = false;
    if (hanzi.length === tones.length && hanzi.length === pinyin.length) {
        isToneColorized = true;
    }
    
    console.log(tones, pinyin, hanzi);

    const getTone = (tone: string, colorized: boolean) => {
        if (colorized) {
            return colorMap.get(tone) || "";
        } else {
            return "";
        }
    }

    let focusPosStart = text.original.indexOf(focus);
    let focusPosEnd = focusPosStart + focus.length - 1;
    const getFocus = (idx: number) => {
        console.log(focusPosStart, focusPosEnd, idx);
        if (focusPosStart !== -1) {
            if (idx >= focusPosStart && idx <= focusPosEnd) {
                return "fw-bold";
            }
        }
        return "";
    }

    return (
        <div className="card border-0">
            <div className="card-body">
                <h5 className="card-title">
                    {hanzi.map((c, idx) => (
                        <span className={`font-monospace
                            ${getTone(tones[idx], isToneColorized)}
                            ${getFocus(idx)}
                        `}>{c}</span>
                    ))}
                </h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{translateMandarinToPinyin(text.original)}</h6>
                <p className="card-text">{text.translation}</p>
            </div>
        </div>
    );
}

export default MandarinEnglishText;