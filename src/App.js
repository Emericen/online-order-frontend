import { Layout } from "antd";
import LoginForm from "./components/LoginForm";


const { Header, Content } = Layout;


function App() {
	return (
		<Layout style = {{ height: "100vh" }}>
			<Header>
				header
			</Header>
			<Content style={{padding:"50px", maxHeight: "calc(100% - 64px)", overflowY: "auto", }}>
				<LoginForm></LoginForm>
			</Content>
		</Layout>
	);
}

export default App;
