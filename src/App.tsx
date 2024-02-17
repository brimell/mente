import React, { useContext, Suspense } from "react";
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
	const { currentUser } = useContext(MainContext);
  console.log(currentUser);

	return (
		<MainContextProvider>
			<Suspense fallback={<div>Loading...</div>}>
				<Layout>
					<AppHeader currentUser={currentUser} />
					<Content style={{ marginTop: 64 }}>
						{!currentUser ? <LoginPage /> : null}
					</Content>
				</Layout>
			</Suspense>
		</MainContextProvider>
	);
};

export default HomePage;
