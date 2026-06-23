import React, { useState } from 'react';
import { Card, Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadCloud, ShieldAlert, KeyRound } from 'lucide-react';
import { uploadDocument } from '../../api/vault';
import { useApiMutation } from '../../hooks/useApi';

const { Option } = Select;

export const DocumentUpload = ({ onUploadSuccess }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const uploadMutation = useApiMutation(
    (formData) => uploadDocument(formData),
    {
      successMessage: 'Document uploaded and encrypted in vault.',
      onSuccess: () => {
        setFileList([]);
        form.resetFields();
        if (onUploadSuccess) onUploadSuccess();
      }
    }
  );

  const handleSubmit = async (values) => {
    if (fileList.length === 0) {
      message.error('Please select at least one file to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('category', values.category);
    formData.append('document', fileList[0].originFileObj);
    // Custom name or default to file name
    formData.append('name', values.name || fileList[0].name);

    uploadMutation.mutate(formData);
  };

  return (
    <Card className="glass-panel border-none shadow-glass rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <KeyRound className="w-5 h-5 text-brand-primary" />
        <h3 className="font-bold text-brand-dark text-base">Encrypt & Upload Asset</h3>
      </div>
      <p className="text-xs text-brand-muted mb-6">
        All documents uploaded here are encrypted locally using AES-256 before transit, ensuring that even systems administrators cannot access them without your consent key.
      </p>

      <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
        <Form.Item
          name="category"
          label={<span className="text-brand-dark font-medium">Document Category</span>}
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Select category..." className="h-10 rounded-lg">
            <Option value="Identification">Identification (ID / Birth Certificate)</Option>
            <Option value="Medical Evidence">Medical Evidence (Reports / Injury Photos)</Option>
            <Option value="Legal Records">Legal Documentation (Restraining Orders)</Option>
            <Option value="Other">Other Safe Storage Files</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          label={<span className="text-brand-dark font-medium">Display Name (Optional)</span>}
        >
          <Input placeholder="e.g. My National ID copy" className="h-10 rounded-lg" />
        </Form.Item>

        <div className="mb-6">
          <Upload.Dragger
            maxCount={1}
            fileList={fileList}
            beforeUpload={() => false}
            onChange={({ fileList: list }) => setFileList(list)}
            className="rounded-2xl border-dashed border-brand-peach/80 hover:border-brand-primary p-6 bg-white/40"
          >
            <p className="flex justify-center mb-2"><UploadCloud className="w-8 h-8 text-brand-muted" /></p>
            <p className="text-xs font-semibold text-brand-dark">Stash file in Vault</p>
            <p className="text-[9px] text-brand-muted mt-1">Maximum file size is 15MB</p>
          </Upload.Dragger>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={uploadMutation.isPending}
          className="w-full h-11 bg-brand-primary border-none text-white rounded-xl font-bold flex items-center justify-center shadow-md"
        >
          Securely Encrypt & Save
        </Button>
      </Form>
    </Card>
  );
};

export default DocumentUpload;
