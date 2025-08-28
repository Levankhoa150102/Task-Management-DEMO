import React from 'react';
import Menu from 'antd/es/menu';
import {
	AppstoreOutlined,
	DashboardOutlined,
	TeamOutlined,
} from '@ant-design/icons';

const items = [
	{
		key: 'dashboard',
		icon: <DashboardOutlined />,
		label: 'Dashboard',
	},
	{
		key: 'workspace',
		icon: <TeamOutlined />,
		label: 'My Workspace',
		children: [
			{
				key: 'workspace-1',
				label: 'Workspace 1',
			},
			{
				key: 'workspace-2',
				label: 'Workspace 2',
			},
		],
	},
];

const SideBar = () => {
	return (
		<aside className="h-screen w-64 bg-white shadow-md flex flex-col">
			<div className="h-16 flex items-center justify-center font-bold text-xl border-b">ManageWise</div>
			<Menu
				mode="inline"
				defaultSelectedKeys={['dashboard']}
				defaultOpenKeys={['workspace']}
				style={{ height: '100%', borderRight: 0 }}
				items={items}
			/>
		</aside>
	);
};

export default SideBar;
