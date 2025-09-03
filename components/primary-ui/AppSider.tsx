'use client';
import { useIsMobile } from '@/hook/DetectMobile';
import {
  FileOutlined,
  HomeOutlined,
  ProductOutlined,
  TeamOutlined
} from '@ant-design/icons';
import Layout from 'antd/es/layout';
import Menu, { MenuProps } from 'antd/es/menu';
import { useRouter } from 'next/navigation';
import { MenuInfo } from 'rc-menu/lib/interface';
import React, { useState } from 'react';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const items: MenuItem[] = [
  getItem('Home', 'home', <HomeOutlined />),
  getItem('My manager', 'my-manager', <ProductOutlined />),
  getItem('Team', 'team', <TeamOutlined />, [getItem('Team 1', 'team-1'), getItem('Team 2', 'team-2')]),
  getItem('Files', 'files', <FileOutlined />),
];

const AppSider: React.FC = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState('my-manager');

  const handleDirectSider = (e: MenuInfo) => {
    if (e.key === 'home') {
      setCurrentTab('home');
      router.push('/');
    }

  };


  return (
    <Sider collapsible collapsed={isMobile ? true : collapsed} onCollapse={setCollapsed} className='' trigger={isMobile ? null : undefined}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={[currentTab]} mode="inline" items={items} onClick={(e) => handleDirectSider(e)} />
    </Sider>
  );
};

export default AppSider;
