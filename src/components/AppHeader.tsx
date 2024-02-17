"use client";
import Link from "next/link";
import { Layout, Menu } from "antd";
import { useContext } from "react";
import MainContext from "../contexts/MainContext";
import { LogoutOutlined } from "@ant-design/icons";
import { User } from "firebase/auth";
import { logoutUser } from "../../old/utils/auth";

const { Header } = Layout;

export default function AppHeader(currentUser: User | null) {
	return (
		<Header
			style={{
				position: "fixed",
				zIndex: 1,
				width: "100%",
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<div style={{ color: "white", fontSize: 24 }}>Mood</div>
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
				<Menu.Item key="1">
					<Link href="/">Home</Link>
				</Menu.Item>
				<Menu.Item key="2">
					<Link href="/about">About</Link>
				</Menu.Item>
				{!currentUser && (
					<Menu.Item key="3" onClick={logoutUser}>
						<LogoutOutlined />
					</Menu.Item>
				)}
			</Menu>
		</Header>
	);
}
