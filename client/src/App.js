import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
// import Signup from "./components/Singup";
// import Login from "./components/Login";
import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import "bootstrap/dist/css/bootstrap.min.css";
import "./responsive.css";
import "./App.css"

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<SignUp />} />
			<Route path="/login" exact element={<SignIn />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;
