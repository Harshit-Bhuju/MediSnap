import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MessageSquare, Send, X, User, Loader2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import API from "@/Configs/ApiEndpoints";
import { useAuthStore } from "@/store/authStore";

const getInitials = (name) =>
  (name || "?")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const ChatAvatar = ({ name, src }) => (
  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-black">
    {src ? (
      <img src={src} alt={name} className="w-full h-full object-cover" />
    ) : (
      getInitials(name)
    )}
  </div>
);

const DirectChat = ({
  recipientId,
  recipientName,
  recipientAvatar,
  appointmentId,
  isOpen,
  onClose,
}) => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);
  const scrollRef = useRef(null);
  const panelRef = useRef(null);
  const pollInterval = useRef(null);
  const typingPollInterval = useRef(null);
  const lastTypingSentRef = useRef(0);

  const CHAT_ENDPOINT = API.CONSULTATION_CHAT;
  const currentUserId = user?.id;

  const fetchMessages = useCallback(
    async (isInitial = false) => {
      if (!recipientId && !appointmentId) return;
      try {
        if (isInitial) setLoading(true);
        const params = appointmentId
          ? { appointment_id: appointmentId }
          : { user_id: recipientId };
        const res = await axios.get(CHAT_ENDPOINT, {
          params,
          withCredentials: true,
        });
        if (res.data.status === "success") {
          setMessages(res.data.messages || []);
        }
      } catch (error) {
        console.error("Failed to fetch messages", error);
        if (isInitial) toast.error("Failed to load messages.");
      } finally {
        if (isInitial) setLoading(false);
      }
    },
    [recipientId, appointmentId, CHAT_ENDPOINT],
  );

  useEffect(() => {
    if (isOpen && (recipientId || appointmentId)) {
      fetchMessages(true);
      pollInterval.current = setInterval(() => fetchMessages(false), 3000);

      // Typing status poll — TODO: wire to your backend, e.g.:
      // typingPollInterval.current = setInterval(async () => {
      //   const res = await axios.get(API.CONSULTATION_CHAT_TYPING, {
      //     params: appointmentId ? { appointment_id: appointmentId } : { user_id: recipientId },
      //     withCredentials: true,
      //   });
      //   setOtherTyping(!!res.data?.typing);
      // }, 2000);
    }
    return () => {
      if (pollInterval.current) clearInterval(pollInterval.current);
      if (typingPollInterval.current) clearInterval(typingPollInterval.current);
    };
  }, [isOpen, recipientId, appointmentId, fetchMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, otherTyping]);

  // Click-outside-to-close on desktop only (mobile is full-screen)
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (window.innerWidth < 768) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const notifyTyping = useCallback(() => {
    const now = Date.now();
    if (now - lastTypingSentRef.current < 2000) return;
    lastTypingSentRef.current = now;
    // TODO: axios.post(API.CONSULTATION_CHAT_TYPING, { appointment_id: appointmentId, recipient_id: recipientId }, { withCredentials: true });
  }, [appointmentId, recipientId]);

  const handleSend = async () => {
    if (!inputValue.trim() || (!recipientId && !appointmentId) || sending)
      return;
    const text = inputValue;
    setInputValue("");

    const tempMsg = {
      id: "temp-" + Date.now(),
      sender_id: currentUserId,
      message: text,
      created_at: new Date().toISOString(),
      is_me: true,
    };
    setMessages((prev) => [...prev, tempMsg]);
    setSending(true);

    const payload = { message: text };
    if (appointmentId && recipientId) {
      payload.appointment_id = appointmentId;
      payload.recipient_id = recipientId;
    } else if (recipientId) {
      payload.recipient_id = recipientId;
    } else {
      setSending(false);
      return;
    }

    try {
      await axios.post(CHAT_ENDPOINT, payload, { withCredentials: true });
      fetchMessages(false);
    } catch (error) {
      console.error("Failed to send", error);
      setMessages((prev) => prev.filter((m) => m.id !== tempMsg.id));
      setInputValue(text);
      toast.error("Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={cn(
            "fixed z-[60] flex flex-col bg-white overflow-hidden",
            // Mobile: full screen
            "inset-0 rounded-none",
            // Desktop: floating card, bottom-right corner
            "md:inset-auto md:bottom-6 md:right-6 md:w-[400px] md:h-[620px] md:max-h-[85vh] md:rounded-[1.75rem] md:shadow-2xl md:ring-1 md:ring-black/5",
          )}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-blue-50 bg-white shrink-0">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-black">
                {recipientAvatar ? (
                  <img
                    src={recipientAvatar}
                    alt={recipientName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-black text-gray-900 truncate">
                  {recipientName}
                </h4>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              </div>
              <p className="text-[11px] font-bold text-gray-400">
                {otherTyping ? (
                  <span className="text-blue-500">typing...</span>
                ) : (
                  "Online now"
                )}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 scrollbar-hide bg-gradient-to-b from-blue-50/40 to-white"
            ref={scrollRef}>
            {loading && messages.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400 mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest">
                  Loading messages...
                </p>
              </div>
            ) : messages.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-center px-10">
                <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-400 opacity-50" />
                </div>
                <h4 className="text-gray-900 font-black text-lg mb-1">
                  Say Hello!
                </h4>
                <p className="text-gray-500 text-sm font-medium">
                  Start your conversation with{" "}
                  {recipientName?.split(" ")[0] || "the doctor"}.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((msg, idx) => {
                  const prev = messages[idx - 1];
                  const isGroupedWithPrev =
                    prev && prev.is_me === msg.is_me;
                  const time = msg.created_at
                    ? new Date(msg.created_at).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "";
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      key={msg.id}
                      className={cn(
                        "flex items-end gap-2",
                        msg.is_me ? "justify-end" : "justify-start",
                        isGroupedWithPrev ? "mt-0.5" : "mt-3",
                      )}>
                      {!msg.is_me && (
                        <div className="w-8 shrink-0">
                          {!isGroupedWithPrev && (
                            <ChatAvatar name={recipientName} src={recipientAvatar} />
                          )}
                        </div>
                      )}
                      <div
                        className={cn(
                          "flex flex-col max-w-[75%]",
                          msg.is_me ? "items-end" : "items-start",
                        )}>
                        <div
                          className={cn(
                            "px-4 py-2.5 text-[0.95rem] font-medium leading-relaxed shadow-sm",
                            msg.is_me
                              ? "bg-blue-600 text-white rounded-2xl rounded-br-md"
                              : "bg-white border border-blue-50 text-gray-800 rounded-2xl rounded-bl-md",
                          )}>
                          {msg.message}
                        </div>
                        {time && (
                          <span className="text-[10px] font-semibold text-gray-400 mt-1 mr-1">
                            {time}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                <AnimatePresence>
                  {otherTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="flex items-end gap-2 mt-3">
                      <div className="w-8 shrink-0">
                        <ChatAvatar name={recipientName} src={recipientAvatar} />
                      </div>
                      <div className="bg-white border border-blue-50 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm flex items-center gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-blue-300"
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-3 pb-3 pt-2 border-t border-blue-50 bg-white shrink-0">
            <div className="flex items-center gap-2">
              <input
                className="flex-1 text-base px-4 py-3 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 disabled:opacity-70"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  notifyTyping();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={sending}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || sending}
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
                {sending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em]">
              <ShieldCheck className="w-3 h-3" />
              Secure Clinical Chat
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DirectChat;