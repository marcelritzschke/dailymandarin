export interface BilingualText {
    original: string;
    translation: string;
}

export interface LearningCard {
    id?: number;
    word: BilingualText;
    level: number;
    examples: BilingualText[];
}

export interface Message {
    text: string;
    sender: 'user' | 'system';
}
