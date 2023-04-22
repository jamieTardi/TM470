import React, { useCallback, useState } from "react";
import { api } from "../../Api/login";
import { Input } from "../../components/index";
import Button from "../../components/forms/Button";
import { fetchAuth } from "../../Redux/slices/authSlice";
import { useAppDispatch } from "../../Redux/store";

import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [loginDetails, setLoginDetails] = useState<TLogin>({
		email: "",
		password: "",
	});
	const [isErr, setIsErr] = useState(false);

	const handleLogin = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			setIsLoading(true);

			setIsErr(false);
			api
				.get(`/user/login`, { params: loginDetails })
				.then((res) => {
					localStorage.setItem("lake-token", res.data.token);
					localStorage.setItem("lake-email", loginDetails.email);
					dispatch(fetchAuth());
					setIsLoading(false);
					navigate("/dashboard");
				})
				.catch(() => {
					setIsLoading(false);
					setIsErr(true);
				});
		},
		[loginDetails, dispatch, navigate]
	);

	return (
		<div className={styles.login} data-testid="login-container">
			<figure className={styles["login__image-container"]} data-testid="login-img">
				<img src="https://i.ibb.co/stxrXJ0/pexels-alex-ga-llego-2093805.jpg" alt="pexels-alex-ga-llego-2093805" />
			</figure>
			<form className={styles.login__form} data-testid="login-form" onSubmit={(e) => handleLogin(e)}>
				<h1>Login</h1>
				<div>
					<Input
						title="Email"
						required={true}
						type="email"
						name="email"
						setValueUpdate={setLoginDetails}
						valueUpdate={loginDetails}
						className={styles.login__input}
					/>
					<Input
						title="Password"
						required={true}
						name="password"
						type="password"
						setValueUpdate={setLoginDetails}
						valueUpdate={loginDetails}
					/>
				</div>
				{isErr && <p className={styles.login__error}>Incorrect Login Details</p>}
				<div>
					<Button
						type="submit"
						variant="action"
						isLoading={isLoading}
						disabled={isLoading}
						className={styles.login__button}
					>
						Login
					</Button>
				</div>
			</form>
		</div>
	);
};

export default React.memo(Login);
