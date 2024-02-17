import React, { useContext } from "react";
import { Layout, Menu, Button } from "antd";
import { MainContext } from "../contexts/MainContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";

const { Sider } = Layout;

export default function AppHeader() {
	const navigateTo = useNavigate();
	const { currentUser } = useContext(MainContext);

	const handleLogout = () => {
		logoutUser();
		navigateTo("/");
	};

	return (
		<Sider
			breakpoint="lg"
			collapsedWidth="0"
			style={{
				backgroundColor: "#001529",
				height: "100vh",
				position: "fixed",
				left: 0,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
		>
			<div
				style={{
					color: "white",
					fontSize: 24,
					textAlign: "center",
					margin: "20px 0",
				}}
			>
				Mood
			</div>
			<Menu
				theme="dark"
				mode="vertical"
				defaultSelectedKeys={["1"]}
				style={{ textAlign: "center" }}
			>
				<Menu.Item key="1">
					<Link to="/">Home</Link>
				</Menu.Item>
				<Menu.Item key="2">
					<Link to="/about">About</Link>
				</Menu.Item>
			</Menu>
			{currentUser && (
				<Menu theme="dark" mode="vertical">
					<Menu.Item
						key="3"
						onClick={handleLogout}
						style={{ textAlign: "center" }}
					>
						<FontAwesomeIcon
							icon={faSignOutAlt}
							style={{ fontSize: "24px", color: "white" }}
						/>
					</Menu.Item>
				</Menu>
			)}
			{!currentUser && (
				<div style={{ textAlign: "center", marginBottom: "20px" }}>
					<Button type="primary">Sign In</Button>
				</div>
			)}
		</Sider>
	);
}
