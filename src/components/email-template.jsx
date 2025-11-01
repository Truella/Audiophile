// components/email-template.jsx
import * as React from "react";
import { Html, Button, Text, Container } from "@react-email/components";

export const EmailTemplate = ({ firstName }) => (
	<Html>
		<Container>
			<Text>Hello {firstName}!</Text>
			<Text>This is a test email from Audiophile</Text>
			<Button href="https://example.com">Click me</Button>
		</Container>
	</Html>
);
