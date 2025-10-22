export interface ChatMessage {
  id: string;
  content: string;
  question:string;
  timestamp: string;
  isBot: boolean;
  isTyping?: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  inputValue: string;
}
