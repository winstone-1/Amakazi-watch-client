import React, { useState } from 'react';
import { Card, Input, Button, Avatar, List, message } from 'antd';
import { Send, MessageSquare } from 'lucide-react';
import { getOrgMessages, sendOrgMessage } from '../../api/org';
import { useApiQuery, useApiMutation } from '../../hooks/useApi';

export const Messaging = () => {
  const [inputValue, setInputValue] = useState('');

  const { data: messages, isLoading, refetch } = useApiQuery(
    ['org-messages'],
    getOrgMessages,
    {
      initialData: [
        { id: '1', sender: 'Counselor Jane', text: 'I am heading out to Westlands clinic now to meet the survivor.', time: '10 mins ago' },
        { id: '2', sender: 'Coordinator Grace', text: 'Excellent, keep us updated. Shelter bed is reserved.', time: '8 mins ago' }
      ]
    }
  );

  const sendMutation = useApiMutation(
    (payload) => sendOrgMessage(payload),
    {
      invalidateKeys: ['org-messages'],
      onSuccess: () => {
        setInputValue('');
        refetch();
      }
    }
  );

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Simulate sending
    const payload = {
      sender: 'Coordinator Grace',
      text: inputValue,
      time: 'Just now'
    };

    sendMutation.mutate(payload);

    // Mock direct update for visual preview
    message.success('Message sent to coordinator channel.');
  };

  return (
    <Card className="glass-panel border-none shadow-glass rounded-2xl p-4 flex flex-col h-96">
      <div className="flex items-center gap-2 mb-4 border-b border-brand-peach/15 pb-2">
        <MessageSquare className="w-5 h-5 text-brand-primary" />
        <h3 className="font-bold text-brand-dark text-base">NGO Coordination Inbox</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-2 bg-white/20 rounded-xl">
        <List
          loading={isLoading}
          dataSource={messages}
          renderItem={(msg) => (
            <div className="flex gap-3 text-xs border-b border-brand-peach/10 pb-2 mb-2 last:border-b-0">
              <Avatar className="bg-brand-primary text-white font-bold shrink-0">{msg.sender[0]}</Avatar>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-brand-dark">{msg.sender}</span>
                  <span className="text-[9px] text-brand-muted">{msg.time}</span>
                </div>
                <p className="text-brand-dark leading-relaxed">{msg.text}</p>
              </div>
            </div>
          )}
        />
      </div>

      <div className="flex gap-2">
        <input
          placeholder="Send coordination note..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-3 py-2 text-xs rounded-xl border border-brand-peach/40 bg-white/80 focus:outline-none focus:border-brand-primary"
        />
        <Button
          type="primary"
          icon={<Send className="w-4 h-4" />}
          onClick={handleSend}
          className="bg-brand-primary border-none flex items-center justify-center h-9 rounded-xl"
        />
      </div>
    </Card>
  );
};

export default Messaging;
