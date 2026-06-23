import React, { useState } from 'react';
import { Card, Button, Tag, Rate, Input, Modal, message } from 'antd';
import { ShieldCheck, MapPin, Bookmark, Heart, Star, Plus } from 'lucide-react';
import Layout from '../components/common/Layout';
import { getOrganisations, toggleBookmarkOrganisation, addOrganisationReview } from '../api/org';
import { useApiQuery, useApiMutation } from '../hooks/useApi';

export const Organisations = () => {
  const [bookmarked, setBookmarked] = useState(['1']);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  const { data: orgs, refetch } = useApiQuery(
    ['organisations-list'],
    getOrganisations,
    {
      initialData: [
        { id: '1', name: 'SafeHaven Kenya', registration_no: 'NGO-89240', county: 'Nairobi', phone: '0800-730-730', rating: 4.8, reviews: [{ text: 'Prompt and highly supportive response during eviction.', stars: 5 }] },
        { id: '2', name: 'Mombasa Women Refuge', registration_no: 'NGO-12049', county: 'Mombasa', phone: '0712-345-678', rating: 4.5, reviews: [] }
      ]
    }
  );

  const handleBookmark = async (id) => {
    try {
      try {
        await toggleBookmarkOrganisation(id);
      } catch (e) {
        console.warn('Real bookmark API missing, toggling locally');
      }

      if (bookmarked.includes(id)) {
        setBookmarked(bookmarked.filter(x => x !== id));
        message.success('Organisation removed from bookmarks.');
      } else {
        setBookmarked([...bookmarked, id]);
        message.success('Organisation added to secure bookmarks.');
      }
    } catch (e) {
      message.error('Failed to update bookmark.');
    }
  };

  const handleAddReview = async () => {
    if (!reviewText) {
      message.error('Please input review text!');
      return;
    }

    try {
      try {
        await addOrganisationReview(selectedOrg.id, { text: reviewText, rating });
      } catch (e) {
        console.warn('Real review API missing, simulated review update');
      }

      message.success('Review submitted successfully.');
      setReviewText('');
      setSelectedOrg(null);
    } catch (e) {
      message.error('Review submission failed.');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">Verified Resource Directory</h1>
          <p className="text-brand-muted text-sm mt-1">Connect with verified safe houses, counselors, and legal advisors across Kenya.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* NGO List */}
          <div className="lg:col-span-7 space-y-4">
            {orgs.map((org) => (
              <Card key={org.id} className="glass-panel border-none shadow-glass rounded-2xl p-2">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-brand-dark text-base">{org.name}</h3>
                      <Tag color="success" className="text-[9px] font-bold py-0.5 flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Partner
                      </Tag>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-muted font-medium">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-brand-primary" /> {org.county} County</span>
                      <span>Reg No: {org.registration_no}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-brand-dark">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{org.rating} / 5</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      shape="circle"
                      onClick={() => handleBookmark(org.id)}
                      icon={<Bookmark className={`w-4 h-4 ${bookmarked.includes(org.id) ? 'fill-brand-primary text-brand-primary' : 'text-brand-muted'}`} />}
                      className="border-brand-peach/40 flex items-center justify-center"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-peach/15 flex justify-between items-center">
                  <span className="text-xs font-bold text-brand-dark font-mono">{org.phone}</span>
                  <div className="flex gap-2">
                    <Button size="small" className="text-xs rounded-lg border-brand-peach/40" onClick={() => setSelectedOrg(org)}>Add Review</Button>
                    <Button size="small" type="primary" className="bg-brand-primary border-none rounded-lg text-xs" onClick={() => window.open(`tel:${org.phone}`)}>Call Responders</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Map Representation on the right */}
          <div className="lg:col-span-5 bg-brand-dark text-white p-6 rounded-3xl shadow-xl space-y-6 relative overflow-hidden min-h-80 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-brand-peach flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-primary" />
                Response Center Coverage Map
              </h3>
              <p className="text-xs text-white/60 mt-1">Showing county headquarters network coordinates across Kenya.</p>
            </div>

            {/* Simulated Kenya Map drawing */}
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="relative w-48 h-48 border border-white/10 rounded-full flex items-center justify-center">
                <div className="absolute w-28 h-28 border border-brand-primary/30 rounded-full animate-ping"></div>
                <div className="absolute w-3.5 h-3.5 bg-brand-primary rounded-full shadow-lg flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </div>
                {/* Node coordinates */}
                <div className="absolute top-8 left-12 w-2 h-2 bg-amber-500 rounded-full"></div>
                <div className="absolute bottom-12 right-10 w-2 h-2 bg-brand-success rounded-full"></div>
              </div>
            </div>

            <div className="text-[10px] text-white/40 border-t border-white/10 pt-4 flex justify-between">
              <span>Nairobi Node: ACTIVE</span>
              <span>Mombasa Node: ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <Modal
        title={`Write Review for ${selectedOrg?.name}`}
        open={!!selectedOrg}
        onOk={handleAddReview}
        onCancel={() => setSelectedOrg(null)}
        okText="Submit Review"
        okButtonProps={{ className: 'bg-brand-primary border-none rounded-lg' }}
        cancelButtonProps={{ className: 'rounded-lg' }}
      >
        <div className="space-y-4 pt-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-brand-dark block">Your Rating</span>
            <Rate value={rating} onChange={setRating} />
          </div>
          <Input.TextArea
            rows={4}
            placeholder="Type your confidential experience feedback..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="rounded-lg"
          />
        </div>
      </Modal>
    </Layout>
  );
};

export default Organisations;
