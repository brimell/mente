import React, { useContext } from "react";
import MainContextProvider, { MainContext } from "./contexts/MainContext";
import MoodForm from "./components/MoodForm";
import MoodList from "./components/MoodList";
import LoginPage from "./components/LoginPage";

import { Layout, Menu, Button, Typography } from "antd";

import Link from "next/link";
import { auth } from "./firebaseInit";
import AppHeader from "./components/AppHeader";

const { Title } = Typography;
const { Header, Content } = Layout;

const HomePage: React.FC = () => {
	return (
		<MainContextProvider>
			<Layout>
				<AppHeader />
				<Content style={{ padding: "0 50px", marginTop: 64 }}>
					<div
						style={{
							background: "#fff",
							padding: 24,
							minHeight: 380,
						}}
					>
						{currentUser ? (
							<></>
						) : (
							<LoginPage /> // Render LoginPage if user is not authenticated
						)}
					</div>
				</Content>
			</Layout>
		</MainContextProvider>
	);
};

export default HomePage;
