import { useState, useEffect, useRef } from "react";
import { ChatBotProfile } from "../../components/ChatBot";
import MyChatArea from "../../components/MyChatArea";
import { TopBar } from "../../components/TopBar";
import { Selection } from "../../utils/selectList";
import InputArea from "../../components/InputArea";
import {
  getRoleImage,
  getRoleDetailMessage,
  getResultMessage,
  INTRO_MESSAGE,
  SELF_INTRO_REQUEST_MESSAGE,
} from "../../constants/roleMessages";
import { TIMING } from "../../constants/chatConstants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [_userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [endBtn, setEndBtn] = useState(false);
  const [chatState, setChatState] = useState();
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set()
  );
  const [roleScores, setRoleScores] = useState<Record<string, number>>({
    기획자: 0,
    디자이너: 0,
    프론트엔드: 0,
    백엔드: 0,
    "AI 엔지니어": 0,
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_AI_API_URL;

  // 스크롤을 하단으로 이동시키는 함수
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  // 초기 인사 메시지 설정
  useEffect(() => {
    if (!isInitialized) {
      // 로딩 메시지 먼저 표시
      const loadingMessage: ChatMessage = {
        id: "loading-welcome",
        content: "",
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        isBot: true,
        isTyping: true,
        question: "",
      };

      setMessages([loadingMessage]);

      // 1초 후 인사 메시지로 교체
      const timeoutId = setTimeout(() => {
        const welcomeMessage: ChatMessage = {
          id: "welcome",
          content: `안녕!
          나는 마스외전 챗봇 피츄⚡️

          먼저 미니 테스트로 너와 잘 맞는
          포지션부터 찾아보자.
          준비됐지?
          부담 없이 하나씩 선택해줘!`,
          timestamp: new Date().toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          isBot: true,
          isTyping: false,
          question: "",
        };

        setMessages((prev) => {
          // 이미 welcome 메시지가 있으면 추가하지 않음
          if (prev.some((msg) => msg.id === "welcome")) {
            return prev;
          }
          return prev
            .filter((msg) => msg.id !== "loading-welcome")
            .concat(welcomeMessage);
        });

        setIsInitialized(true);
      }, TIMING.DEFAULT_DELAY);

      return () => clearTimeout(timeoutId);
    }
  }, [isInitialized, endBtn]);

  // 첫 번째 질문 표시
  useEffect(() => {
    const hasWelcomeMessage = messages.some((msg) => msg.id === "welcome");
    const hasQuestion = messages.some((msg) => msg.id?.startsWith("question-"));

    if (
      isInitialized &&
      currentQuestionIndex === 0 &&
      hasWelcomeMessage &&
      !hasQuestion &&
      messages.length === 1
    ) {
      const timeoutId = setTimeout(() => {
        showNextQuestion(0);
      }, TIMING.DEFAULT_DELAY);

      return () => clearTimeout(timeoutId);
    }
  }, [isInitialized, currentQuestionIndex, messages]);

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
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        isBot: true,
        isTyping: false,
        sendType: "select",
        options: question.options,
        question: question.question,
      };

      setMessages((prev) => [...prev, questionMessage]);
    }
  };

  const handleLearnMoreClick = (messageId: string) => {
    // 사용자 메시지 추가
    const userMessage: ChatMessage = {
      id: `learn-more-${Date.now()}`,
      content: "마스외전 알아보기",
      timestamp: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      isBot: false,
      isTyping: false,
      question: "",
    };

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, showLearnMore: true, showInterestOptions: false }
          : msg
      )
    );

    setMessages((prev) => [...prev, userMessage]);

    // 로딩 메시지 표시
    const loadingMessage: ChatMessage = {
      id: `loading-intro-${Date.now()}`,
      content: "",
      timestamp: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      isBot: true,
      isTyping: true,
      question: "",
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, loadingMessage]);

      // 1초 후 로딩을 제거하고 소개 메시지 표시
      setTimeout(() => {
        const introMessage: ChatMessage = {
          id: `intro-${Date.now()}`,
          content: INTRO_MESSAGE,
          timestamp: new Date().toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          isBot: true,
          isTyping: false,
          question: "",
          showLearnMore: true,
          showInterestOptions: true,
        };

        setMessages((prev) =>
          prev
            .filter((msg) => msg.id !== loadingMessage.id)
            .concat(introMessage)
        );
      }, TIMING.DEFAULT_DELAY);
    }, TIMING.DEFAULT_DELAY);
  };

  const handleInterestSelect = (option: string, _index: number) => {
    // 사용자 선택 답변 추가
    const userResponse: ChatMessage = {
      id: `interest-answer-${Date.now()}`,
      content: option,
      timestamp: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      isBot: false,
      isTyping: false,
      question: "",
    };

    setMessages((prev) => [...prev, userResponse]);

    try {
      axios.post(`${apiUrl}/chat/start`).then((res) => {
        console.log(res.data);
        localStorage.setItem("sessionId", res.data.session_id);
        setEndBtn(true);
      });
    } catch (err) {
      console.log(err);
    }

    // 봇 응답 메시지 추가
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: `intro-request-${Date.now()}`,
        content: SELF_INTRO_REQUEST_MESSAGE,
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        isBot: true,
        isTyping: false,
        question: "",
      };

      setMessages((prev) => [...prev, botResponse]);
    }, TIMING.DEFAULT_DELAY);
  };

  const handleAnswerSelect = (selectedAnswer: string, optionIndex: number) => {
    // 사용자 답변을 메시지에 추가
    const userMessage: ChatMessage = {
      id: `user-answer-${currentQuestionIndex}`,
      content: selectedAnswer,
      timestamp: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isBot: false,
      isTyping: false,
      question: "",
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserAnswers((prev) => [...prev, selectedAnswer]);

    // 답변한 질문을 추적
    setAnsweredQuestions(
      (prev) => new Set([...prev, `question-${currentQuestionIndex}`])
    );

    // 직군 점수 업데이트
    const rolesForThisQuestion = (Selection[currentQuestionIndex] as any)
      .roles?.[optionIndex] as string | undefined;
    if (rolesForThisQuestion) {
      const roles = rolesForThisQuestion.split(",");
      setRoleScores((prev) => {
        const next = { ...prev };
        roles.forEach((role) => {
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
      }, TIMING.DEFAULT_DELAY);
    } else {
      // 모든 질문이 끝났을 때 로딩 메시지 표시
      const loadingMessage: ChatMessage = {
        id: "loading-result",
        content: "",
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        isBot: true,
        isTyping: true,
        question: "",
      };

      setMessages((prev) => [...prev, loadingMessage]);

      // 1초 후 로딩을 제거하고 결과 메시지 표시
      setTimeout(() => {
        const entries = Object.entries(roleScores).map(
          ([k, v]) => [k, v] as const
        );
        const updatedEntries = (() => {
          const roles = rolesForThisQuestion
            ? rolesForThisQuestion.split(",").map((r) => r.trim())
            : [];
          const map = new Map(entries);
          roles.forEach((r) => map.set(r, (map.get(r) ?? 0) + 1));
          return Array.from(map.entries());
        })();
        const sorted = updatedEntries.sort((a, b) => b[1] - a[1]);
        const topRole = sorted[0][0];

        // 로딩 메시지 제거하고 결과 메시지 추가
        const resultMessage: ChatMessage = {
          id: "result",
          content: getResultMessage(topRole),
          timestamp: new Date().toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          isBot: true,
          isTyping: false,
          question: "",
          resultImage: getRoleImage(topRole),
          resultRole: topRole,
        };

        setMessages((prev) =>
          prev
            .filter((msg) => msg.id !== "loading-result")
            .concat(resultMessage)
        );

        // 1초 뒤에 상세 메시지 표시
        setTimeout(() => {
          const detailMessage: ChatMessage = {
            id: "detail",
            content: getRoleDetailMessage(topRole),
            timestamp: new Date().toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            isBot: true,
            isTyping: false,
            question: "",
            showLearnMore: true,
          };
          setMessages((prev) => [...prev, detailMessage]);
        }, TIMING.DEFAULT_DELAY);
      }, TIMING.DEFAULT_DELAY);
    }
  };

  const formatted = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .replace(/-/g, ".");

  const onSend = (message: string) => {
    const session_id = localStorage.getItem("sessionId");
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: message,
      timestamp: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      isBot: false,
      isTyping: false,
      question: "",
    };

    setMessages((prev) => [...prev, userMessage]);

    const typingMessage: ChatMessage = {
      id: `typing-${Date.now()}`,
      content: "",
      timestamp: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      isBot: true,
      isTyping: true,
      question: "",
    };

    setMessages((prev) => [...prev, typingMessage]);

    try {
      axios
        .post(`${apiUrl}/chat/send`, {
          session_id: session_id,
          message: message,
        })
        .then((res) => {
          console.log(res.data.response_message);
          setChatState(res.data.next_step);

          setTimeout(() => {
            setMessages((prev) =>
              prev
                .filter((m) => m.id !== typingMessage.id)
                .concat({
                  id: `bot-${Date.now()}`,
                  content: res.data.response_message,
                  timestamp: new Date().toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }),
                  isBot: true,
                  isTyping: false,
                  question: "",
                })
            );
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEndChat = async () => {
    const session_id = localStorage.getItem("sessionId");
    if (!session_id) return;

    try {
      let skipCount = 0;
      if (chatState === "position") skipCount = 2;
      else if (chatState === "process_initial_motivation") skipCount = 1;

      let currentState = chatState;

      for (let i = 0; i < skipCount; i++) {
        const res = await axios.post(`${apiUrl}/chat/send`, {
          session_id,
          message: "스킵",
        });

        console.log(`스킵 ${i + 1}회차 완료`, res.data);
        currentState = res.data.next_step;
        setChatState(res.data.next_step);

        if (currentState === "qa_session") break;
      }

      if (currentState === "qa_session") {
        const endRes = await axios.post(`${apiUrl}/chat/send`, {
          session_id,
          message: "종료",
        });
        console.log("종료 완료", endRes.data);
      }

      navigate("/form");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-full bg-[#FFFFFF] flex flex-col">
      <TopBar />
      <span className="self-center py-2.5 text-xs text-[#A6A6A6]">
        {formatted}
      </span>
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 pt-0 pb-40"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.isBot
                ? "flex justify-start mb-4"
                : "flex justify-end mb-4"
            }
          >
            {message.isBot ? (
              <ChatBotProfile
                message={message.content}
                messageTitle={message.question}
                timestamp={message.timestamp}
                isTyping={message.isTyping}
                sendType={message.sendType}
                options={message.options}
                onSelect={
                  message.sendType === "select" ? handleAnswerSelect : undefined
                }
                isDisabled={
                  message.sendType === "select" &&
                  answeredQuestions.has(message.id)
                }
                resultImage={message.resultImage}
                resultRole={message.resultRole}
                showLearnMore={message.showLearnMore}
                onLearnMoreClick={
                  message.showLearnMore && !message.showInterestOptions
                    ? () => handleLearnMoreClick(message.id)
                    : undefined
                }
                showInterestOptions={message.showInterestOptions}
                onInterestSelect={
                  message.showInterestOptions ? handleInterestSelect : undefined
                }
                onSkip={() => navigate("/form")}
              />
            ) : (
              <MyChatArea chatContent={message.content} />
            )}
          </div>
        ))}
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 ${
          endBtn && "shadow-[0_-40px_90px_rgba(65,115,255,0.15)]"
        }`}
      >
        <InputArea status={endBtn ? false : true} onSend={onSend} />
      </div>
      {endBtn && (
        <div className="fixed bottom-36 w-full flex items-center justify-center">
          <button
            onClick={handleEndChat}
            className="flex items-center justify-center bg-white gap-2 text-black border border-[#4173FF] px-4 w-[70%] h-12 mt-[25px] rounded-3xl transition-colors"
          >
            대화 종료하기
          </button>
        </div>
      )}
    </div>
  );
}

export default BotChatPage;
