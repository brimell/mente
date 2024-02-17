import React, { useContext } from "react";
import { Layout, Menu, Button } from "antd";
import { MainContext } from "../contexts/MainContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";

export default function AppSidebar() {
	const navigateTo = useNavigate();
	const { currentUser } = useContext(MainContext);

	const handleLogout = () => {
		logoutUser();
		navigateTo("/");
	};

	return (
		<div style={{
			display: "grid",
			height: "100%",
			gridTemplateRows: "1fr 10fr 1fr",
		}}>
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
		</div>
	);
}
