export interface LearningCard {
    id: number;
    word: string;
    description: string;
    example: string;
}

export interface Message {
    text: string;
    sender: 'user' | 'system';
}
