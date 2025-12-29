import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Send, Clock, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

export function ChatInterface({ incident, onSendMessage, className }) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState([]);
  const scrollRef = useRef(null);
  
  useEffect(() => {
    // Scroll to bottom when new message
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [incident.chatMessages]);
  
  const handleSend = () => {
    if (!message.trim()) return;
    
    if (onSendMessage) {
      onSendMessage(message);
    }
    setMessage('');
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const quickMessages = [
    "I'm 2 mins away",
    "Calling 911 now",
    "First aid kit with me",
    "Stay calm, help is coming"
  ];
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span>Group Chat</span>
          <span className="text-sm text-muted-foreground font-normal">
            {incident.respondingHelpers?.length || 0} helpers
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        {/* Messages */}
        <ScrollArea ref={scrollRef} className="h-64 mb-4 pr-4">
          <div className="space-y-3">
            {incident.chatMessages?.map((msg) => {
              const isCurrentUser = msg.sender === user?.id;
              const sender = msg.sender === user?.id ? user : incident.victim;
              
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={sender?.profilePic} />
                    <AvatarFallback>{sender?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div
                    className={`flex flex-col max-w-[75%] ${
                      isCurrentUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`rounded-lg px-3 py-2 ${
                        isCurrentUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(new Date(msg.timestamp), {
                          addSuffix: true
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {typing.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Someone is typing...</span>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Quick Messages */}
        <div className="flex flex-wrap gap-2 mb-3">
          {quickMessages.map((qm) => (
            <Button
              key={qm}
              variant="outline"
              size="sm"
              onClick={() => {
                if (onSendMessage) onSendMessage(qm);
              }}
              className="text-xs h-7"
            >
              {qm}
            </Button>
          ))}
        </div>
        
        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon" disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
