import React from 'react';
import { ChatBotProfile } from '../components/ChatBot';

export const ResultChatBack = ({}: {}) => {
  return (
    <div className="flex">
      <ChatBotProfile
        message="선택하느라 수고했어! 너에게 제일 어울리는 건 백엔드 개발자야!"
        messageTitle="결과"
        timestamp={new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
      />
    </div>
  );
};

export const ResultChatFront = ({}: {}) => {
    return (
        <div className="flex">
            <ChatBotProfile
                message="선택하느라 수고했어! 너에게 제일 어울리는 건 프론트엔드 개발자야!"
                messageTitle="결과"
                timestamp={new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            />
        </div>
    );
};

export const ResultChatAI = ({}: {}) => {
    return (
        <div className="flex">
            <ChatBotProfile
                message="선택하느라 수고했어! 너에게 제일 어울리는 건 AI 개발자야!"
                messageTitle="결과"
                timestamp={new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            />
        </div>
    );
};

export const ReesultChatDesigner = ({}: {}) => {
    return (
        <div className="flex">
            <ChatBotProfile
                message="선택하느라 수고했어! 너에게 제일 어울리는 건 디자이너야!"
                messageTitle="결과"
                timestamp={new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            />
        </div>
    );
};


export const ResultChatPlanner = ({}: {}) => {
    return (
        <div className="flex">
            <ChatBotProfile
                message="선택하느라 수고했어! 너에게 제일 어울리는 건 기획자야!"
                messageTitle="결과"
                timestamp={new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            />
        </div>
    );
};