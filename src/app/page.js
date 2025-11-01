"use client";

import { useQuery } from "convex/react";
import {api} from '../../convex/_generated/api'
export default function Home() {
	const tasks = useQuery(api.tasks.get);
  console.log("RESEND_API_KEY in server:", process.env.RESEND_API_KEY);

	return (
		<main className="">
			{tasks?.map(({ _id, text }) => (
				<div key={_id}>{text}</div>
			))}
		</main>
	);
}
