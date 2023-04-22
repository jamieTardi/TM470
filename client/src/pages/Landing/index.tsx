import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/forms/Button";

type Props = {};

const Landing = (props: Props) => {
	return (
		<div>
			Codename: Pisces
			<Link to="/login">
				<Button>Login</Button>
			</Link>
		</div>
	);
};

export default React.memo(Landing);
