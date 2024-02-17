import { Layout, Menu } from "antd";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { LogoutOutlined } from "@ant-design/icons";
import { logoutUser } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;

export default function AppHeader() {
	const navigateTo = useNavigate();
	const { currentUser } = useContext(MainContext);

	const handleLogout = () => {
		logoutUser();
		navigateTo("/"); // Redirect to home page after logout
	};

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
					<Link to="/">Home</Link>
				</Menu.Item>
				<Menu.Item key="2">
					<Link to="/about">About</Link>
				</Menu.Item>
				{!currentUser && (
					<Menu.Item key="3" onClick={handleLogout}>
						<LogoutOutlined />
					</Menu.Item>
				)}
			</Menu>
		</Header>
	);
}
