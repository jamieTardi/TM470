import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./pages";
import "./styles/main.scss";
import { Provider } from "react-redux";
import store from "./Redux/store";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Home />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
