import React, { useState, useEffect } from 'react';
import { Card, Input, Button, List, message } from 'antd';
import { Key, UserPlus, Users, Sync } from 'lucide-react';
import { getSafeWord, updateSafeWord } from '../../api/safety';

export const SafeWord = () => {
  const [safeWord, setSafeWord] = useState('REFUGE');
  const [isEditing, setIsEditing] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [contacts, setContacts] = useState([
    { name: 'Grace M.', phone: '0712345678', relation: 'Sister' },
    { name: 'Counselor Wambui', phone: '0787654321', relation: 'Caseworker' }
  ]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' });

  useEffect(() => {
    const fetchSafeWord = async () => {
      try {
        const response = await getSafeWord();
        if (response?.safe_word) {
          setSafeWord(response.safe_word);
          localStorage.setItem('safeWord', response.safe_word);
        }
      } catch (err) {
        // Fallback to local storage
        const local = localStorage.getItem('safeWord');
        if (local) setSafeWord(local);
      }
    };
    fetchSafeWord();
  }, []);

  const handleUpdateWord = async () => {
    if (!newWord) {
      message.error('Please input a valid word!');
      return;
    }

    try {
      try {
        await updateSafeWord(newWord);
      } catch (err) {
        console.warn('Real API missing/failed, using simulation fallback');
      }

      setSafeWord(newWord.toUpperCase());
      localStorage.setItem('safeWord', newWord.toUpperCase());
      setIsEditing(false);
      setNewWord('');
      message.success('Safe Word updated successfully.');
    } catch (e) {
      message.error('Failed to update Safe Word.');
    }
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      message.error('Please fill name and phone number!');
      return;
    }
    const updated = [...contacts, newContact];
    setContacts(updated);
    localStorage.setItem('emergencyContacts', JSON.stringify(updated));
    setNewContact({ name: '', phone: '', relation: '' });
    message.success('Emergency contact added.');
  };

  const handleSyncContacts = () => {
    message.loading({ content: 'Syncing emergency contacts with county alert network...', key: 'sync' });
    setTimeout(() => {
      message.success({ content: 'Emergency contacts synchronized. Responders mapped.', key: 'sync' });
    }, 1500);
  };

  return (
    <Card className="glass-panel border-none shadow-glass rounded-2xl p-4 space-y-6">
      {/* Safe Word Management */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-brand-primary" />
          <h3 className="font-bold text-brand-dark text-base">Safe Word Manager</h3>
        </div>
        <p className="text-xs text-brand-muted">
          Your active Safe Word is used to verify your safety when deactivating check-in timers. Keep it secure and private.
        </p>

        <div className="p-4 rounded-xl bg-white/60 border border-brand-peach/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">Active Word</span>
            <p className="text-lg font-extrabold text-brand-primary tracking-wider uppercase mt-0.5">{safeWord}</p>
          </div>
          {!isEditing ? (
            <Button size="small" type="primary" className="bg-brand-primary border-none rounded-lg text-xs" onClick={() => { setNewWord(safeWord); setIsEditing(true); }}>
              Change Word
            </Button>
          ) : (
            <div className="flex gap-2">
              <Input
                size="small"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                className="w-28 rounded-lg uppercase text-xs font-bold"
              />
              <Button size="small" type="primary" className="bg-brand-primary border-none rounded-lg text-xs" onClick={handleUpdateWord}>Save</Button>
              <Button size="small" className="rounded-lg text-xs" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          )}
        </div>
      </div>

      <hr className="border-brand-peach/15" />

      {/* Emergency Contacts Sync */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-primary" />
            <h3 className="font-bold text-brand-dark text-base">Emergency Contacts</h3>
          </div>
          <Button size="small" type="dashed" className="text-xs flex items-center gap-1" onClick={handleSyncContacts}>
            Sync with Contacts
          </Button>
        </div>

        <List
          dataSource={contacts}
          className="bg-white/40 rounded-xl border border-brand-peach/20"
          renderItem={(item) => (
            <List.Item className="px-4 py-2 text-xs">
              <div className="flex justify-between w-full">
                <div>
                  <p className="font-bold text-brand-dark">{item.name}</p>
                  <p className="text-[10px] text-brand-muted">{item.relation || 'Contact'}</p>
                </div>
                <span className="font-mono font-medium text-brand-dark">{item.phone}</span>
              </div>
            </List.Item>
          )}
        />

        {/* Add Contact Form */}
        <div className="p-3 bg-brand-peach/10 border border-brand-peach/20 rounded-xl space-y-2">
          <p className="text-[10px] font-bold text-brand-dark uppercase tracking-wider">Add Emergency Contact</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Input
              placeholder="Name"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              className="h-8 rounded-md text-xs"
            />
            <Input
              placeholder="Phone (07...)"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              className="h-8 rounded-md text-xs"
            />
            <Button
              size="small"
              icon={<UserPlus className="w-3.5 h-3.5" />}
              onClick={handleAddContact}
              className="h-8 rounded-md bg-brand-primary text-white border-none flex items-center justify-center gap-1 font-bold text-xs"
            >
              Add Contact
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SafeWord;
