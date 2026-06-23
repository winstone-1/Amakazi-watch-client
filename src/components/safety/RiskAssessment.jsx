import React, { useState } from 'react';
import { Card, Button, Radio, Progress, message } from 'antd';
import { AlertTriangle, Shield, CheckCircle2, ChevronRight } from 'lucide-react';
import { submitRiskAssessment } from '../../api/safety';

export const RiskAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      id: 'q1',
      text: 'Has the physical violence increased in frequency or severity over the past 6 months?',
      options: [
        { label: 'Yes, significantly', score: 3 },
        { label: 'Yes, somewhat', score: 2 },
        { label: 'No/No physical violence', score: 0 }
      ]
    },
    {
      id: 'q2',
      text: 'Does the individual control most of your daily activities (who you see, talk to, finances)?',
      options: [
        { label: 'Yes, completely', score: 3 },
        { label: 'Partial control', score: 1 },
        { label: 'No control', score: 0 }
      ]
    },
    {
      id: 'q3',
      text: 'Has the individual ever threatened to kill you or themselves?',
      options: [
        { label: 'Yes, frequently', score: 4 },
        { label: 'Yes, once/twice', score: 2 },
        { label: 'Never', score: 0 }
      ]
    },
    {
      id: 'q4',
      text: 'Do you feel unsafe returning to your home today?',
      options: [
        { label: 'Yes, highly unsafe', score: 4 },
        { label: 'Somewhat unsafe', score: 2 },
        { label: 'No, I feel safe', score: 0 }
      ]
    },
    {
      id: 'q5',
      text: 'Do you have access to a secure location (friend, relative, shelter) in an emergency?',
      options: [
        { label: 'No, none at all', score: 3 },
        { label: 'Yes, but difficult to reach', score: 1 },
        { label: 'Yes, easily accessible', score: 0 }
      ]
    }
  ];

  const handleSelectOption = (score) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: score });
  };

  const handleNext = () => {
    if (answers[questions[currentQuestion].id] === undefined) {
      message.error('Please select an option to proceed.');
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = async () => {
    setLoading(true);
    try {
      try {
        await submitRiskAssessment(answers);
      } catch (err) {
        console.warn('Real API missing/failed, using simulation fallback');
      }

      const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
      let level = 'LOW';
      let advice = 'Your safety profile indicates low risk. However, please remain vigilant and outline a basic escape strategy.';
      let color = 'text-brand-success';

      if (totalScore >= 11) {
        level = 'CRITICAL / EXTREME';
        advice = 'WARNING: You are in extreme danger. We highly recommend connecting with a safe house immediately and seeking legal protection orders.';
        color = 'text-red-600';
      } else if (totalScore >= 6) {
        level = 'HIGH';
        advice = 'You are experiencing elevated safety risks. Please coordinate with an counselor and prepare a detailed Escape Plan.';
        color = 'text-brand-warning';
      } else if (totalScore >= 3) {
        level = 'MEDIUM';
        advice = 'Moderate risk identified. Outline emergency contacts and set up a routine Safety Timer check-in.';
        color = 'text-brand-primary';
      }

      setResult({ score: totalScore, level, advice, color });
    } catch (e) {
      message.error('Failed to submit assessment.');
    } finally {
      setLoading(false);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <Card className="glass-panel border-none shadow-glass rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-brand-primary" />
        <h3 className="font-bold text-brand-dark text-base">Risk Assessment Tool</h3>
      </div>

      {!result ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-brand-muted">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Progress: {Math.round(((currentQuestion) / questions.length) * 100)}%</span>
          </div>
          <Progress percent={Math.round(((currentQuestion) / questions.length) * 100)} strokeColor="#e0533c" showInfo={false} />

          <div className="space-y-4">
            <p className="text-sm font-semibold text-brand-dark leading-relaxed">
              {questions[currentQuestion].text}
            </p>

            <div className="flex flex-col gap-2">
              {questions[currentQuestion].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.score)}
                  className={`p-4 rounded-xl text-xs font-semibold text-left border transition-all ${
                    answers[questions[currentQuestion].id] === opt.score
                      ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                      : 'bg-white/60 border-brand-peach/40 text-brand-dark hover:bg-brand-peach/20'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="primary"
            onClick={handleNext}
            loading={loading}
            className="w-full h-11 rounded-xl bg-brand-primary border-none text-white font-bold flex items-center justify-center gap-1 shadow-md"
          >
            {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next Question'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="space-y-6 text-center py-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto text-brand-primary mb-2">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">Risk Level Category</span>
            <h4 className={`text-2xl font-extrabold tracking-tight mt-1 ${result.color}`}>{result.level}</h4>
            <p className="text-xs text-brand-dark max-w-sm mx-auto leading-relaxed mt-3 bg-white/60 border border-brand-peach/30 p-4 rounded-2xl">
              {result.advice}
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button className="flex-1 h-10 rounded-lg text-xs" onClick={resetAssessment}>Retake Tool</Button>
            <Button type="primary" className="flex-1 h-10 rounded-lg text-xs bg-brand-primary border-none text-white font-bold">Contact Counselor</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default RiskAssessment;
