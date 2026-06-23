import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import PeerFinder from '../components/peer/PeerFinder';
import ChatInterface from '../components/peer/ChatInterface';

export const PeerSupport = () => {
  const [activeSession, setActiveSession] = useState(null);

  const handleSessionFound = (session) => {
    setActiveSession(session);
  };

  const handleEndSession = () => {
    setActiveSession(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">Peer Support Network</h1>
          <p className="text-brand-muted text-sm mt-1">Connect anonymously with certified counselors or survivors for advice and shared experiences.</p>
        </div>

        {!activeSession ? (
          <PeerFinder onSessionFound={handleSessionFound} />
        ) : (
          <div className="max-w-3xl mx-auto">
            <ChatInterface session={activeSession} onEndSession={handleEndSession} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PeerSupport;
