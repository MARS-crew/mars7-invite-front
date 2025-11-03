import { useState, useEffect, useRef } from "react";
import { ChatBotProfile } from "../../components/ChatBot";
import MyChatArea from "../../components/MyChatArea";
import { TopBar } from "../../components/TopBar";
import { Selection } from "../../utils/selectList";
import InputArea from "../../components/InputArea";
import { getRoleImage, getRoleDetailMessage, getResultMessage, INTRO_MESSAGE, SELF_INTRO_REQUEST_MESSAGE } from "../../utils/roleMessages";

interface ChatMessage {
  question: string;
  id: string;
  content: string;
  timestamp: string;
  isBot: boolean;
  isTyping?: boolean;
  sendType?: string;
  options?: string[];
  resultImage?: string;
  resultRole?: string;
  showLearnMore?: boolean;
  showInterestOptions?: boolean;
}

function BotChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [roleScores, setRoleScores] = useState<Record<string, number>>({
    "기획자": 0,
    "디자이너": 0,
    "프론트엔드": 0,
    "백엔드": 0,
    "AI 엔지니어": 0,
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 스크롤을 하단으로 이동시키는 함수
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  // 초기 인사 메시지 설정
  useEffect(() => {
    if (!isInitialized) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        content: `안녕!
          나는 마스외전 챗봇 피츄⚡️

          먼저 미니 테스트로 너와 잘 맞는
          포지션부터 찾아보자.
          준비됐지?
          부담 없이 하나씩 선택해줘!`,
        timestamp:  new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
        isBot: true,
        isTyping: false,
        question: ""
      };
      
      setMessages([welcomeMessage]);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // 첫 번째 질문 표시
  useEffect(() => {
    if (isInitialized && currentQuestionIndex === 0 && messages.length === 1) {
      setTimeout(() => {
        showNextQuestion(0);
      }, 2000); //2초 뒤에 표시
    }
  }, [isInitialized, currentQuestionIndex, messages.length]);

  // 메시지가 추가될 때마다 스크롤을 하단으로 이동
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const showNextQuestion = (index: number) => {
    if (index < Selection.length) {
      const question = Selection[index];
      const questionMessage: ChatMessage = {
        id: `question-${index}`,
        content: question.question,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
        isBot: true,
        isTyping: false,
        sendType: "select",
        options: question.options,
        question: question.question
      };
      
      setMessages(prev => [...prev, questionMessage]);
    }
  };

  const handleLearnMoreClick = (messageId: string) => {
    // 마스외전 소개 메시지
    const introMessage: ChatMessage = {
      id: `intro-${Date.now()}`,
      content: INTRO_MESSAGE,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
      isBot: true,
      isTyping: false,
      question: "",
      showLearnMore: true,
      showInterestOptions: true
    };
    
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, showLearnMore: true, showInterestOptions: false }
        : msg
    ));
    
    setTimeout(() => {
      setMessages(prev => [...prev, introMessage]);
    }, 100);
  };

  const handleInterestSelect = (option: string, index: number) => {
    // 사용자 선택 답변 추가
    const userResponse: ChatMessage = {
      id: `interest-answer-${Date.now()}`,
      content: option,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
      isBot: false,
      isTyping: false,
      question: ""
    };
    
    setMessages(prev => [...prev, userResponse]);
    
    // 봇 응답 메시지 추가
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: `intro-request-${Date.now()}`,
        content: SELF_INTRO_REQUEST_MESSAGE,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
        isBot: true,
        isTyping: false,
        question: ""
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleAnswerSelect = (selectedAnswer: string, optionIndex: number) => {
    // 사용자 답변을 메시지에 추가
    const userMessage: ChatMessage = {
      id: `user-answer-${currentQuestionIndex}`,
      content: selectedAnswer,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      isBot: false,
      isTyping: false,
      question: ""
    };

    setMessages(prev => [...prev, userMessage]);
    setUserAnswers(prev => [...prev, selectedAnswer]);
    
    // 답변한 질문을 추적
    setAnsweredQuestions(prev => new Set([...prev, `question-${currentQuestionIndex}`]));

    // 직군 점수 업데이트
    const rolesForThisQuestion = (Selection[currentQuestionIndex] as any).roles?.[optionIndex] as string | undefined;
    if (rolesForThisQuestion) {
      const roles = rolesForThisQuestion.split(',');
      setRoleScores(prev => {
        const next = { ...prev };
        roles.forEach(role => {
          const key = role.trim();
          next[key] = (next[key] ?? 0) + 1;
        });
        return next;
      });
    }

    // 다음 질문으로 이동
    if (currentQuestionIndex < Selection.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setTimeout(() => {
        showNextQuestion(nextIndex);
      }, 800);
    } else {
      // 모든 질문이 끝났을 때 결과 메시지 표시
      setTimeout(() => {
        const entries = Object.entries(roleScores).map(([k, v]) => [k, v] as const);
        const updatedEntries = (() => {
          const roles = rolesForThisQuestion ? rolesForThisQuestion.split(',').map(r => r.trim()) : [];
          const map = new Map(entries);
          roles.forEach(r => map.set(r, (map.get(r) ?? 0) + 1));
          return Array.from(map.entries());
        })();
        const sorted = updatedEntries.sort((a,b) => b[1]-a[1]);
        const topRole = sorted[0][0];
        
        // 결과 메시지
        const resultMessage: ChatMessage = {
          id: "result",
          content: getResultMessage(topRole),
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
          isBot: true,
          isTyping: false,
          question: "",
          resultImage: getRoleImage(topRole),
          resultRole: topRole
        };
        
        setMessages(prev => [...prev, resultMessage]);
        
        // 2초 뒤에 상세 메시지 표시
        setTimeout(() => {
          const detailMessage: ChatMessage = {
            id: "detail",
            content: getRoleDetailMessage(topRole),
            timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
            isBot: true,
            isTyping: false,
            question: "",
            showLearnMore: true
          };
          setMessages(prev => [...prev, detailMessage]);
        }, 3000); // 1초(결과 메시지) + 2초 추가 = 총 3초
      }, 1000);
    }
  };

  const formatted = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(new Date())
    .replace(/-/g, '.');

  return (
    <div className="h-screen w-full bg-[#FFFFFF] flex flex-col">
      <TopBar />
      <span className="self-center py-[10px] text-xs text-[#A6A6A6]">{formatted}</span>
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 pt-0 pb-40">
        {messages.map((message) => (
          <div key={message.id} className={message.isBot ? "flex justify-start mb-4" : "flex justify-end mb-4"}>
            {message.isBot ? (
              <ChatBotProfile 
                message={message.content}
                messageTitle={message.question}
                timestamp={message.timestamp}
                isTyping={message.isTyping}
                sendType={message.sendType}
                options={message.options}
                onSelect={message.sendType === "select" ? handleAnswerSelect : undefined}
                isDisabled={message.sendType === "select" && answeredQuestions.has(message.id)}
                resultImage={message.resultImage}
                resultRole={message.resultRole}
                showLearnMore={message.showLearnMore}
                onLearnMoreClick={message.showLearnMore && !message.showInterestOptions ? () => handleLearnMoreClick(message.id) : undefined}
                showInterestOptions={message.showInterestOptions}
                onInterestSelect={message.showInterestOptions ? handleInterestSelect : undefined}
              />
            ) : (
              <MyChatArea chatContent={message.content} />
            )}
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <InputArea />
      </div>
    </div>
  );
}

export default BotChatPage;