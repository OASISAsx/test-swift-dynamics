'use client';

import React from 'react';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (lng: string) => {
    const currentPath = pathname?.replace(/^\/(th|en)/, '') || '';
    router.push(`/${lng}${currentPath}`);
    i18n.changeLanguage(lng);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      style={{ width: 130 }}
      options={[
        { value: 'en', label: t('common.english') },
        { value: 'th', label: t('common.thai') },
      ]}
      prefixCls="ant-select"
      suffixIcon={<GlobalOutlined />}
    />
  );
};

export default LanguageSelector;
