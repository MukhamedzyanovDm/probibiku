"use client"

import React, { useState, useRef, useEffect } from "react"
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User,
  Loader2,
  Maximize2,
  Minimize2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/components/ui/utils"

interface Message {
  role: "assistant" | "user"
  content: string
}

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Привет! Я ваш умный ассистент Пробибику. Я знаю всё об истории обслуживания ваших автомобилей. Чем могу помочь?"
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Имитация ответа ИИ
    setTimeout(() => {
      const assistantMessage: Message = { 
        role: "assistant", 
        content: "Я проанализировал ваши последние записи. Судя по чеку от 12 мая, вы заменили масло, но мастер отметил износ тормозных колодок 70%. Рекомендую запланировать их замену в течение следующего месяца." 
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60] lg:hidden"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 35, 
              stiffness: 300, 
              mass: 0.8,
              restDelta: 0.01 
            }}
            className={cn(
              "fixed right-0 top-0 h-full bg-white shadow-2xl z-[70] flex flex-col transition-all duration-300 overflow-hidden",
              isExpanded ? "w-full lg:w-[600px]" : "w-full lg:w-[400px]"
            )}
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Sparkles className="h-[18px] w-[18px] text-amber-500 fill-amber-500/20" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-none">Ассистент</h3>
                  <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider mt-1">Online • AI Powered</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hidden lg:flex h-9 w-9 rounded-xl text-slate-400 hover:bg-slate-50"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100"
                  onClick={onClose}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-6 scrollbar-hide" viewportRef={scrollRef}>
              <div className="space-y-6 pb-4">
                {messages.map((msg, i) => (
                  <div key={i} className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.role === "user" ? "ml-auto items-end" : "items-start"
                  )}>
                    <div className={cn(
                      "flex items-center gap-2 mb-1.5",
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}>
                      <div className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center",
                        msg.role === "assistant" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-600"
                      )}>
                        {msg.role === "assistant" ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {msg.role === "assistant" ? "Пробибику" : "Вы"}
                      </span>
                    </div>
                    <div className={cn(
                      "p-4 rounded-2xl text-sm leading-relaxed",
                      msg.role === "assistant" 
                        ? "bg-slate-50 text-slate-900 rounded-tl-none" 
                        : "bg-slate-900 text-white rounded-tr-none shadow-lg shadow-slate-200"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-3 text-slate-400">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span className="text-xs font-medium italic">Думаю...</span>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-slate-50">
              <div className="relative flex items-center">
                <Input 
                  placeholder="Спросите о ТО, расходах или запчастях..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-slate-200 pr-12 pl-4 w-full"
                />
                <Button 
                  size="icon" 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 h-9 w-9 rounded-lg bg-slate-900 hover:bg-slate-800 transition-all z-20"
                >
                  <Send className="h-3.5 w-3.5 text-white" />
                </Button>
              </div>
              <p className="text-[10px] text-slate-400 mt-4 text-center">
                ИИ может ошибаться. Всегда сверяйтесь с официальным регламентом вашего авто.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
