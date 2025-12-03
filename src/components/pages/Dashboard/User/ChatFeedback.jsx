import React, { useState, useEffect, useRef } from "react";
import UserLayout from "../../layouts/UserLayout";
import "./ChatFeedback.css";

const ChatFeedback = () => {
   // In a real app, fetch this from backend using treatmentId from URL or context
   const treatmentInfo = {
      medication: "Amoxicillin 500mg",
      startDate: "2025-10-05",
      endDate: "2025-10-09",
      symptomSummary: "Chest pain and shortness of breath",
   };

   // Chat messages
   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState("");
   const [isTyping, setIsTyping] = useState(false);

   // Conversation step index
   const [step, setStep] = useState(0);

   // Collected answers
   const [answers, setAnswers] = useState({
      feeling: "",
      sideEffects: "",
      effectiveness: "",
      extraNotes: "",
   });

   const chatEndRef = useRef(null);

   // Scroll to bottom when messages change
   useEffect(() => {
      if (chatEndRef.current) {
         chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, [messages, isTyping]);

   // Initial greeting + first question
   useEffect(() => {
      const introMessages = [
         {
            from: "assistant",
            text: `Hi there 😊 I'm checking in about your recent medication, ${treatmentInfo.medication}.`,
         },
         {
            from: "assistant",
            text:
               "How are you feeling today compared to before treatment?",
         },
      ];
      setMessages(introMessages);
   }, []);

   const questions = [
      {
         key: "feeling",
         label:
            "Thank you. In your own words, how would you describe how you feel today compared to before treatment?",
         placeholder: "Type how you’re feeling...",
         type: "text",
      },
      {
         key: "sideEffects",
         label:
            "Did you experience any side effects (for example headache, nausea, dizziness, rash, or anything else)?",
         placeholder: "If yes, please describe them. If no, you can say 'No side effects'.",
         type: "text",
      },
      {
         key: "effectiveness",
         label:
            "On a scale from 1 to 5, how effective was this medication for your symptoms?",
         placeholder: "Please reply with a number from 1 to 5.",
         type: "select",
      },
      {
         key: "extraNotes",
         label:
            "Is there anything else you would like your care team to know about your experience?",
         placeholder: "Any extra details you’d like to share...",
         type: "text",
      },
   ];

   const handleSend = (e) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed) return;

      const currentQuestion = questions[step];

      // Add user message
      setMessages((prev) => [...prev, { from: "user", text: trimmed }]);

      // Save answer
      if (currentQuestion) {
         setAnswers((prev) => ({
            ...prev,
            [currentQuestion.key]: trimmed,
         }));
      }

      setInput("");
      handleNext(trimmed);
   };

   const handleNext = (lastAnswer) => {
      const nextStep = step + 1;

      // If we have another question → assistant asks it
      if (nextStep < questions.length) {
         const nextQuestion = questions[nextStep];

         setIsTyping(true);
         setTimeout(() => {
            setMessages((prev) => [
               ...prev,
               {
                  from: "assistant",
                  text: nextQuestion.label,
               },
            ]);
            setIsTyping(false);
         }, 600);

         setStep(nextStep);
      } else {
         // No more questions → submit feedback
         submitFeedback({ ...answers, [questions[step].key]: lastAnswer });
      }
   };

   const submitFeedback = async (finalAnswers) => {
      setIsTyping(true);

      // TODO: Replace with real API call to Flask backend, e.g.:
      // await fetch("/api/feedback", { method: "POST", body: JSON.stringify({...}) })

      setTimeout(() => {
         setIsTyping(false);
         setMessages((prev) => [
            ...prev,
            {
               from: "assistant",
               text:
                  "Thank you for sharing this. Your feedback has been recorded and will help your care team and other patients in the future.",
            },
            {
               from: "assistant",
               text:
                  "If you notice any severe or unexpected symptoms, please contact your healthcare provider or emergency services immediately.",
            },
         ]);
      }, 900);

      console.log("Submitting feedback payload:", {
         treatmentId: 1, // placeholder; in real app, derive this from route
         ...finalAnswers,
      });
   };

   const renderEffectivenessQuickReplies = () => {
      if (questions[step]?.key !== "effectiveness") return null;

      const options = [
         { value: "1", label: "1 - No improvement" },
         { value: "2", label: "2 - Slight improvement" },
         { value: "3", label: "3 - Some improvement" },
         { value: "4", label: "4 - Good improvement" },
         { value: "5", label: "5 - Symptoms resolved" },
      ];

      const handleQuickReply = (val, label) => {
         setInput(label);
      };

      return (
         <div className="quick-replies mt-2">
            {options.map((opt) => (
               <button
                  key={opt.value}
                  type="button"
                  className="btn btn-outline-primary btn-sm me-1 mb-1"
                  onClick={() => handleQuickReply(opt.value, opt.value)}
               >
                  {opt.value}
               </button>
            ))}
         </div>
      );
   };

   return (
      <UserLayout>
         <div className="chat-feedback-wrapper">
            <h3 className="fw-bold mb-1">Treatment Check-In</h3>
            <p className="text-muted mb-3">
               We’re asking a few short questions about your recent medication to
               help monitor your safety and improve future care.
            </p>

            <div className="small text-muted mb-2">
               Medication: <strong>{treatmentInfo.medication}</strong> (
               {treatmentInfo.startDate} → {treatmentInfo.endDate})
               <br />
               Symptoms: <strong>{treatmentInfo.symptomSummary}</strong>
            </div>

            <div className="chat-card shadow-sm border-0">
               <div className="chat-window">
                  {messages.map((msg, index) => (
                     <div
                        key={index}
                        className={`chat-message ${msg.from === "assistant" ? "assistant" : "user"
                           }`}
                     >
                        <div className="chat-bubble">{msg.text}</div>
                     </div>
                  ))}

                  {isTyping && (
                     <div className="chat-message assistant">
                        <div className="chat-bubble typing-indicator">
                           <span></span>
                           <span></span>
                           <span></span>
                        </div>
                     </div>
                  )}

                  <div ref={chatEndRef} />
               </div>

               {/* Input area */}
               <form className="chat-input-area" onSubmit={handleSend}>
                  <textarea
                     className="form-control"
                     rows="2"
                     placeholder="Type your response here..."
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                  {renderEffectivenessQuickReplies()}
                  <div className="text-end mt-2">
                     <button type="submit" className="btn btn-primary">
                        Send
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </UserLayout>
   );
};

export default ChatFeedback;
