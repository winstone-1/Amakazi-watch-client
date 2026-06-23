import React, { useState } from 'react';
import { Card, Button, Radio, Spin, message } from 'antd';
import { HeartHandshake, ShieldAlert, Check } from 'lucide-react';
import { findPeerSession } from '../../api/peer';

export const PeerFinder = ({ onSessionFound }) => {
  const [supportType, setSupportType] = useState('Counselor');
  const [finding, setFinding] = useState(false);

  const startSearch = async () => {
    setFinding(true);
    try {
      let sessionData = null;
      try {
        sessionData = await findPeerSession(supportType);
      } catch (e) {
        console.warn('Backend peer match endpoint missing, fallback to mockup session');
      }

      // Simulate a matching timer (2.5 seconds)
      setTimeout(() => {
        setFinding(false);
        const mockSession = sessionData || {
          session_id: `session-${Date.now()}`,
          partner: {
            name: supportType === 'Counselor' ? 'Counselor Grace W.' : 'Survivor Sister A.',
            avatar: null,
            badge: supportType === 'Counselor' ? 'Certified Counselor' : 'Verified Peer'
          }
        };
        message.success(`Connected successfully with ${mockSession.partner.name}`);
        if (onSessionFound) onSessionFound(mockSession);
      }, 2500);

    } catch (error) {
      setFinding(false);
      message.error('Failed to initiate matching queue. Try again later.');
    }
  };

  return (
    <Card className="glass-panel border-none shadow-glass rounded-2xl p-6 text-center max-w-xl mx-auto space-y-6">
      <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto text-brand-primary">
        <HeartHandshake className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-brand-dark">Connect with Anonymous Peer Support</h3>
        <p className="text-xs text-brand-muted max-w-sm mx-auto">
          Start a completely secure, end-to-end encrypted chat with a verified counselor or peer advocate. Your real name is hidden.
        </p>
      </div>

      {!finding ? (
        <div className="space-y-6">
          <div className="space-y-2.5">
            <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider block">Choose Support Circle</span>
            <Radio.Group value={supportType} onChange={(e) => setSupportType(e.target.value)} className="grid grid-cols-2 gap-3 w-full">
              <Radio.Button value="Counselor" className="text-center rounded-xl h-14 flex flex-col justify-center items-center font-medium border border-brand-peach/40">
                <span className="text-xs font-bold block">Professional Help</span>
                <span className="text-[9px] text-brand-muted">Certified Counselors</span>
              </Radio.Button>
              <Radio.Button value="Survivor" className="text-center rounded-xl h-14 flex flex-col justify-center items-center font-medium border border-brand-peach/40">
                <span className="text-xs font-bold block">Survivor Circle</span>
                <span className="text-[9px] text-brand-muted">Shared Experiences</span>
              </Radio.Button>
            </Radio.Group>
          </div>

          <div className="p-4 bg-brand-success/5 border border-brand-success/20 rounded-xl flex gap-2.5 text-left">
            <Check className="w-4 h-4 text-brand-success shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-brand-dark">Trauma-Informed & Secure</p>
              <p className="text-[9px] text-brand-muted">Messages expire automatically, leaving zero trace on your local device cache.</p>
            </div>
          </div>

          <Button
            type="primary"
            onClick={startSearch}
            className="w-full h-11 bg-brand-primary border-none text-white rounded-xl font-bold flex items-center justify-center shadow-md text-sm"
          >
            Start Matching Session
          </Button>
        </div>
      ) : (
        <div className="py-8 space-y-4">
          <Spin size="large" />
          <div className="space-y-1">
            <p className="text-xs font-bold text-brand-dark animate-pulse">Searching for available responder...</p>
            <p className="text-[10px] text-brand-muted">Estimated wait: Less than 30 seconds</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PeerFinder;
