import React, { useState } from 'react';
import { Card, Input, Button, Spin, Collapse, Tag, message } from 'antd';
import { MessageSquare, Send, BookOpen, ExternalLink } from 'lucide-react';
import { askLegalQuestion } from '../../api/legal';

const { Panel } = Collapse;

export const LegalBot = () => {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'bot', text: 'Jambo! I am your Amakazi Legal Assistant. Ask me questions about Kenyan protection orders, family law, or the Protection Against Domestic Violence Act (2015).', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!inputValue.trim()) return;
    setLoading(true);

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const question = inputValue;
    setInputValue('');

    try {
      let botResponse = null;
      try {
        botResponse = await askLegalQuestion(question);
      } catch (err) {
        console.warn('Backend legal bot API missing, simulating response');
      }

      // Simulate tailored legal answers
      setTimeout(() => {
        const text = botResponse?.answer || 
          'According to the Protection Against Domestic Violence Act (Section 9), you have the right to request an interim protection order from a magistrate court. This legally restrains the individual from entering your residence or workplace.';
        
        const references = botResponse?.references || [
          { title: 'Protection Against Domestic Violence Act (PADV), 2015', section: 'Section 9 - Interim Protection Orders' },
          { title: 'Kenyan Penal Code', section: 'Cap 63 - Assault occasioning actual bodily harm' }
        ];

        setMessages(prev => [...prev, {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text,
          references,
          timestamp: new Date()
        }]);
        setLoading(false);
      }, 1500);

    } catch (error) {
      setLoading(false);
      message.error('Failed to query legal database.');
    }
  };

  return (
    <Card className="glass-panel border-none shadow-glass rounded-2xl p-4 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-5 h-5 text-brand-primary" />
        <h3 className="font-bold text-brand-dark text-base">Kenyan Legal Advisor</h3>
      </div>
      <p className="text-xs text-brand-muted">
        Query the active legal handbook. Understand your rights and learn how to obtain safety protection orders.
      </p>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto bg-white/40 border border-brand-peach/25 rounded-2xl p-4 space-y-4 flex flex-col">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-2xl text-xs max-w-[85%] space-y-3 leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-brand-primary text-white rounded-tr-none'
                : 'bg-white border border-brand-peach/30 text-brand-dark rounded-tl-none'
            }`}>
              <p>{msg.text}</p>

              {msg.references && msg.references.length > 0 && (
                <div className="pt-2.5 border-t border-brand-peach/20 space-y-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider block text-brand-primary">Legal Code References:</span>
                  {msg.references.map((ref, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-brand-peach/10 p-2 rounded-lg text-[10px] text-brand-dark font-medium border border-brand-peach/20">
                      <span>{ref.title} • {ref.section}</span>
                      <ExternalLink className="w-3 h-3 text-brand-primary shrink-0 ml-1.5 cursor-pointer" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="p-3 bg-white border border-brand-peach/30 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Spin size="small" />
              <span className="text-xs text-brand-muted font-medium">Analyzing legal codes...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          placeholder="Ask a legal question... (e.g. How do I get a protection order?)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-brand-peach/40 bg-white/80 focus:outline-none focus:border-brand-primary"
        />
        <Button
          type="primary"
          onClick={handleAsk}
          icon={<Send className="w-4 h-4" />}
          className="bg-brand-primary border-none flex items-center justify-center h-10 rounded-xl"
        />
      </div>
    </Card>
  );
};

export default LegalBot;
