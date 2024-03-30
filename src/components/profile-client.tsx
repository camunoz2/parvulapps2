import type { Claims } from "@auth0/nextjs-auth0";

export default function ProfileClient({ user }: { user: Claims }) {
	return (
		<div className="absolute top-6 right-6 flex gap-2 justify-center items-center">
			<img
				className="rounded-full w-10"
				src={user.picture || ""}
				alt={user.name || ""}
			/>
		</div>
	);
}
