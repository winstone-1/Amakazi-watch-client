import React, { useState } from 'react';
import { Card, Table, Progress, Button, Input, Modal, message } from 'antd';
import { Plus, Edit2, Archive } from 'lucide-react';
import { getOrgInventory, updateOrgInventory } from '../../api/org';
import { useApiQuery, useApiMutation } from '../../hooks/useApi';

export const Inventory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState({ item: '', available: '', limit: '', type: 'Units' });

  const { data: inventory, isLoading, refetch } = useApiQuery(
    ['org-inventory'],
    getOrgInventory,
    {
      initialData: [
        { key: '1', item: 'Crisis Shelter Beds', available: 4, limit: 12, type: 'Beds' },
        { key: '2', item: 'Medical Support Packs', available: 15, limit: 30, type: 'Packs' },
        { key: '3', item: 'Legal Folders', available: 9, limit: 15, type: 'Cases' }
      ]
    }
  );

  const updateMutation = useApiMutation(
    (items) => updateOrgInventory(items),
    {
      successMessage: 'Inventory resource updated successfully.',
      invalidateKeys: ['org-inventory'],
      onSuccess: () => {
        refetch();
        setIsOpen(false);
      }
    }
  );

  const handleAdd = () => {
    if (!newItem.item || !newItem.available || !newItem.limit) {
      message.error('Please complete all fields.');
      return;
    }

    const items = [
      ...inventory,
      {
        key: String(inventory.length + 1),
        item: newItem.item,
        available: parseInt(newItem.available),
        limit: parseInt(newItem.limit),
        type: newItem.type
      }
    ];

    updateMutation.mutate(items);
    setNewItem({ item: '', available: '', limit: '', type: 'Units' });
  };

  return (
    <Card className="glass-panel border-none shadow-glass rounded-2xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-brand-dark text-base">Resource Inventory Management</h3>
        <Button
          type="primary"
          icon={<Plus className="w-4 h-4 mr-0.5" />}
          className="bg-brand-primary border-none rounded-xl text-xs flex items-center justify-center font-bold"
          onClick={() => setIsOpen(true)}
        >
          Add Resource
        </Button>
      </div>

      <Table
        dataSource={inventory}
        loading={isLoading}
        pagination={false}
        className="custom-table"
        columns={[
          {
            title: 'Resource Item',
            dataIndex: 'item',
            key: 'item',
            render: (text) => <span className="font-bold text-brand-dark text-xs">{text}</span>
          },
          {
            title: 'Stash Status',
            key: 'status',
            render: (_, record) => {
              const pct = Math.round((record.available / record.limit) * 100);
              return (
                <div className="w-full max-w-xs space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-brand-muted">
                    <span>{pct}% Available</span>
                    <span>{record.available} / {record.limit} {record.type}</span>
                  </div>
                  <Progress percent={pct} strokeColor="#e0533c" showInfo={false} />
                </div>
              );
            }
          },
          {
            title: 'Actions',
            key: 'actions',
            render: () => (
              <Button size="small" icon={<Edit2 className="w-3.5 h-3.5" />} className="text-xs flex items-center justify-center gap-1 border-brand-peach/40">
                Adjust
              </Button>
            )
          }
        ]}
      />

      <Modal
        title="Add Inventory Item"
        open={isOpen}
        onOk={handleAdd}
        onCancel={() => setIsOpen(false)}
        okText="Add Item"
        okButtonProps={{ className: 'bg-brand-primary border-none rounded-lg' }}
        cancelButtonProps={{ className: 'rounded-lg' }}
      >
        <div className="space-y-3 pt-4">
          <Input
            placeholder="Item Name (e.g. Food Rations)"
            value={newItem.item}
            onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
            className="h-10 rounded-lg"
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Available Units"
              value={newItem.available}
              onChange={(e) => setNewItem({ ...newItem, available: e.target.value })}
              className="h-10 rounded-lg"
            />
            <Input
              type="number"
              placeholder="Total Capacity Limit"
              value={newItem.limit}
              onChange={(e) => setNewItem({ ...newItem, limit: e.target.value })}
              className="h-10 rounded-lg"
            />
          </div>
          <Input
            placeholder="Unit Type (e.g. Beds, Packs, Cases)"
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            className="h-10 rounded-lg"
          />
        </div>
      </Modal>
    </Card>
  );
};

export default Inventory;
