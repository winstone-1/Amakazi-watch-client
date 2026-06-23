import React, { useState } from 'react';
import { Card, Checkbox, List, Tag, Collapse, Button, message } from 'antd';
import { Briefcase, PhoneCall, ShieldCheck, MapPin } from 'lucide-react';

const { Panel } = Collapse;

export const EscapePlan = () => {
  const [checklist, setChecklist] = useState([
    { id: '1', text: 'Identification (ID card, Passport, Birth certificates)', category: 'Documents', checked: false },
    { id: '2', text: 'Financial assets (Cash, debit cards, bank statements)', category: 'Finances', checked: false },
    { id: '3', text: 'Medication (Prescriptions, medical cards, records)', category: 'Health', checked: false },
    { id: '4', text: 'Spare car and house keys', category: 'Access', checked: false },
    { id: '5', text: 'Change of clothing for you and children', category: 'Clothing', checked: false },
    { id: '6', text: 'Device backups & chargers (M-Pesa registered phone)', category: 'Electronics', checked: false },
  ]);

  const toggleCheck = (id) => {
    setChecklist(
      checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const handleCallEmergency = (phone) => {
    message.success(`Initiating secure backup call to: ${phone}`);
    window.open(`tel:${phone}`);
  };

  return (
    <Card className="glass-panel border-none shadow-glass rounded-2xl p-4 space-y-6">
      <div className="flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-brand-primary" />
        <h3 className="font-bold text-brand-dark text-base">Personal Escape Planner</h3>
      </div>
      <p className="text-xs text-brand-muted">
        Use this confidential checklist to prepare a secure departure plan. Ensure this information is kept completely private.
      </p>

      {/* Packing Checklist */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-brand-dark uppercase tracking-wider">Emergency Packing Checklist</p>
        <div className="bg-white/40 border border-brand-peach/20 rounded-xl p-2 space-y-1">
          {checklist.map((item) => (
            <div key={item.id} className="flex items-center gap-2.5 p-2 hover:bg-white/50 rounded-lg transition-all">
              <Checkbox checked={item.checked} onChange={() => toggleCheck(item.id)} />
              <div className="flex-1 flex justify-between items-center text-xs">
                <span className={item.checked ? 'line-through text-brand-muted font-medium' : 'text-brand-dark font-medium'}>
                  {item.text}
                </span>
                <Tag className="text-[9px] uppercase font-bold px-1">{item.category}</Tag>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-brand-peach/15" />

      {/* Action Plan steps */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-brand-dark uppercase tracking-wider">Step-by-Step Evacuation Strategy</p>
        <Collapse ghost accordion className="custom-collapse">
          <Panel header={<span className="text-xs font-bold text-brand-dark">1. Choose a Safe Destination</span>} key="1">
            <p className="text-xs text-brand-muted leading-relaxed">
              Identify a friend, family member, or local safe house where you can go immediately. If none are available, contact SafeHaven Kenya or your assigned caseworker.
            </p>
          </Panel>
          <Panel header={<span className="text-xs font-bold text-brand-dark">2. Secure Your Communications</span>} key="2">
            <p className="text-xs text-brand-muted leading-relaxed">
              Ensure GPS tracking is turned off on non-essential apps. Use the digital vault to back up sensitive documents before wiping history.
            </p>
          </Panel>
          <Panel header={<span className="text-xs font-bold text-brand-dark">3. Execute the Departure</span>} key="3">
            <p className="text-xs text-brand-muted leading-relaxed">
              Leave at a time when the individual is not present (e.g., during work hours). If stopped, use your Safe Call shortcut or trigger the SOS panic timer.
            </p>
          </Panel>
        </Collapse>
      </div>

      <hr className="border-brand-peach/15" />

      {/* Emergency Hotlines */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-brand-dark uppercase tracking-wider">Verified Emergency Responders</p>
        <div className="space-y-2">
          {[
            { name: 'National Gender Helpline', phone: '1195', desc: 'Free 24/7 toll-free hotline' },
            { name: 'Nairobi Safety Shelter', phone: '0800-730-730', desc: 'Temporary housing and protection' },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-white/60 border border-brand-peach/30 p-3 rounded-xl">
              <div>
                <p className="text-xs font-bold text-brand-dark">{item.name}</p>
                <p className="text-[10px] text-brand-muted">{item.desc}</p>
              </div>
              <Button
                size="small"
                type="primary"
                onClick={() => handleCallEmergency(item.phone)}
                icon={<PhoneCall className="w-3.5 h-3.5" />}
                className="bg-brand-success border-none text-white rounded-lg flex items-center justify-center gap-1 text-[11px]"
              >
                Call
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default EscapePlan;
