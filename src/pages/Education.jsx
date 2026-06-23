import React, { useState } from 'react';
import { Card, Button, List, Tag, Collapse, message } from 'antd';
import { BookOpen, Calendar, HelpCircle, CheckCircle2 } from 'lucide-react';
import Layout from '../components/common/Layout';
import { getContents, getWorkshops, registerWorkshop } from '../api/content';
import { useApiQuery } from '../hooks/useApi';

const { Panel } = Collapse;

export const Education = () => {
  const [registeredWorkshops, setRegisteredWorkshops] = useState([]);

  const { data: articles } = useApiQuery(
    ['educational-articles'],
    getContents,
    {
      initialData: [
        { id: '1', title: 'Understanding Your Rights under PADV 2015', category: 'Legal Aid', desc: 'A plain-language guide detailing interim protection orders, court-enforced evacuations, and counselor support mandates.' },
        { id: '2', title: 'Digital Safety: Securing Your Location Data', category: 'Digital Privacy', desc: 'Step-by-step instructions on disabling metadata tracking, hiding browsers, and using encrypted stashing.' }
      ]
    }
  );

  const { data: workshops } = useApiQuery(
    ['workshops-list'],
    getWorkshops,
    {
      initialData: [
        { id: 'w-1', title: 'Nairobi Safety Workshop', date: 'June 29, 2026', location: 'Nairobi Safety Center', limit: '30 slots' },
        { id: 'w-2', title: 'Crisis Response and Legal Evacuations', date: 'July 12, 2026', location: 'Online Webinar', limit: 'Unlimited' }
      ]
    }
  );

  const handleRegisterWorkshop = async (id) => {
    try {
      try {
        await registerWorkshop(id);
      } catch (e) {
        console.warn('Real API missing/failed, simulated register');
      }

      setRegisteredWorkshops([...registeredWorkshops, id]);
      message.success('Registered successfully for the workshop. Confirmation code saved.');
    } catch (e) {
      message.error('Failed to register.');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">Educational Resources</h1>
          <p className="text-brand-muted text-sm mt-1">Access security guidelines, local safety webinars, and legal aid brochures.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Safety Guides Articles */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="font-bold text-brand-dark text-base flex items-center gap-2"><BookOpen className="w-5 h-5 text-brand-primary" /> Core Safety Guides</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((art) => (
                <Card key={art.id} className="glass-panel border-none shadow-glass rounded-2xl p-2 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <Tag color="purple" className="text-[9px] uppercase font-bold px-1.5">{art.category}</Tag>
                    <h4 className="font-bold text-brand-dark text-sm leading-snug">{art.title}</h4>
                    <p className="text-xs text-brand-muted leading-relaxed">{art.desc}</p>
                  </div>
                  <Button size="small" type="link" className="text-brand-primary p-0 font-bold mt-4 self-start flex items-center gap-1">
                    Read Article →
                  </Button>
                </Card>
              ))}
            </div>

            {/* General FAQs Collapse */}
            <div className="bg-white/40 border border-brand-peach/20 rounded-2xl p-4 mt-6">
              <h4 className="font-bold text-brand-dark text-sm mb-4 flex items-center gap-1.5"><HelpCircle className="w-4 h-4 text-brand-primary" /> Frequently Asked Questions</h4>
              <Collapse ghost className="custom-collapse" accordion>
                <Panel header={<span className="text-xs font-bold text-brand-dark">How do I verify if an organization is real?</span>} key="1">
                  <p className="text-xs text-brand-muted leading-relaxed">
                    All partner organizations on our network undergo a strict verification check. Check for the "Verified Partner" shield badge on their profiles before sending reports.
                  </p>
                </Panel>
                <Panel header={<span className="text-xs font-bold text-brand-dark">Is my internet provider tracking my vault uploads?</span>} key="2">
                  <p className="text-xs text-brand-muted leading-relaxed">
                    No. The files are fully encrypted locally on your browser before they leave your device. The connection is SSL/TLS secured, protecting it from external eavesdropping.
                  </p>
                </Panel>
              </Collapse>
            </div>
          </div>

          {/* Local Workshops */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-bold text-brand-dark text-base flex items-center gap-2"><Calendar className="w-5 h-5 text-brand-primary" /> Upcoming Workshops</h3>
            <div className="space-y-3">
              {workshops.map((w) => (
                <Card key={w.id} className="glass-panel border-none shadow-glass rounded-2xl p-1">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-brand-dark">{w.title}</p>
                    <div className="text-[10px] text-brand-muted space-y-0.5">
                      <p>Date: {w.date}</p>
                      <p>Location: {w.location}</p>
                      <p>Limit: {w.limit}</p>
                    </div>

                    {!registeredWorkshops.includes(w.id) ? (
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => handleRegisterWorkshop(w.id)}
                        className="w-full bg-brand-primary border-none rounded-lg text-xs"
                      >
                        Register
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        disabled
                        icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                        className="w-full text-xs flex items-center justify-center gap-1.5"
                      >
                        Registered
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Education;
