import * as pinyin from "chinese-to-pinyin"


export function translateMandarinToPinyin(mandarin: string): string {
    return pinyin(mandarin);
}

export function getTones(mandarin: string): string {
    return pinyin(mandarin, {toneToNumberOnly: true});
}