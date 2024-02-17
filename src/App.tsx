import React, { useContext, Suspense } from "react";
import MainContextProvider, { MainContext } from "./contexts/MainContext";
import LoginPage from "./components/LoginPage";

import { Layout} from "antd";

import AppHeader from "./components/AppHeader";

const { Content } = Layout;

const HomePage: React.FC = () => {
	const { currentUser } = useContext(MainContext);
  console.log(currentUser);

	return (
		<MainContextProvider>
			<Suspense fallback={<div>Loading...</div>}>
				<Layout>
					<AppHeader />
					<Content style={{ marginTop: 64 }}>
						{!currentUser ? <LoginPage /> : null}
					</Content>
				</Layout>
			</Suspense>
		</MainContextProvider>
	);
};

export default HomePage;
