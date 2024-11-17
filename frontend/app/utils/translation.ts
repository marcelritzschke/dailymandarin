export function translateMandarinToPinyin(mandarin: string): string {
    var pinyin = require("chinese-to-pinyin");
    return pinyin(mandarin);
}

export function getTones(mandarin: string): string {
    var pinyin = require("chinese-to-pinyin");
    return pinyin(mandarin, {toneToNumberOnly: true});
}