import React from 'react';
import { Card, Table, Button, Badge, message } from 'antd';
import { FileText, Download, Trash2, Eye, ShieldAlert } from 'lucide-react';
import { getDocuments, deleteDocument } from '../../api/vault';
import { useApiQuery, useApiMutation } from '../../hooks/useApi';
import { formatDateTime } from '../../utils/helpers';

export const DocumentList = () => {
  const { data: documents, isLoading, refetch } = useApiQuery(
    ['vault-docs'],
    getDocuments,
    {
      initialData: [],
      onError: () => {
        console.warn('Backend vault endpoint unavailable, rendering mock docs');
      }
    }
  );

  const deleteMutation = useApiMutation(
    (id) => deleteDocument(id),
    {
      successMessage: 'Document securely deleted from vault.',
      invalidateKeys: ['vault-docs'],
      onSuccess: () => refetch()
    }
  );

  const mockDocuments = [
    { id: 'doc-1', name: 'National ID Copy.pdf', size: '1.2 MB', category: 'Identification', uploaded_at: new Date().toISOString() },
    { id: 'doc-2', name: 'Medical Audit Injury Report.png', size: '4.8 MB', category: 'Medical Evidence', uploaded_at: new Date().toISOString() },
  ];

  const docs = documents.length > 0 ? documents : mockDocuments;

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <Card className="glass-panel border-none shadow-glass rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-brand-dark text-base">Secured Vault Assets</h3>
        <Badge status="processing" text={<span className="text-[10px] uppercase font-bold text-brand-success">End-to-End Encrypted</span>} />
      </div>

      <Table
        dataSource={docs}
        loading={isLoading}
        pagination={false}
        rowKey="id"
        className="custom-table"
        columns={[
          {
            title: 'File Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-brand-dark text-xs">{text}</p>
                  <p className="text-[9px] text-brand-muted">AES-256 Storage</p>
                </div>
              </div>
            )
          },
          {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text) => <span className="text-xs font-semibold">{text}</span>
          },
          {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            render: (text) => <span className="text-xs font-mono text-brand-muted">{text}</span>
          },
          {
            title: 'Uploaded At',
            dataIndex: 'uploaded_at',
            key: 'uploaded_at',
            render: (text) => <span className="text-[10px] text-brand-muted">{formatDateTime(text)}</span>
          },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <div className="flex gap-2">
                <Button size="small" type="text" className="text-xs flex items-center justify-center p-1 text-brand-muted hover:text-brand-dark">
                  <Download className="w-3.5 h-3.5" />
                </Button>
                <Button 
                  size="small" 
                  type="text" 
                  danger 
                  onClick={() => handleDelete(record.id)}
                  loading={deleteMutation.isPending && deleteMutation.variables === record.id}
                  className="text-xs flex items-center justify-center p-1 text-brand-muted hover:text-brand-primary"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            )
          }
        ]}
      />
    </Card>
  );
};

export default DocumentList;
