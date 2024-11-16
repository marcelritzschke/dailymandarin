export interface Example {
    original: string;
    translation: string;
}

export interface LearningCard {
    id: number;
    word: string;
    translation: string;
    level: number;
    examples: Example[];
}

export interface Message {
    text: string;
    sender: 'user' | 'system';
}
