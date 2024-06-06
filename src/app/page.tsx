import { getSession } from "@auth0/nextjs-auth0";
import { Button } from "@/components/ui/button";

import { Avatar } from "@/components/profile-client";

export default async function Home() {
	const session = await getSession();
	const user = session?.user;

	return (
		<main className=" grid grid-cols-2 h-full">
			<div className="bg-gray-800 flex flex-col justify-between py-10 pl-12">
				<header>
					<h1 className="text-3xl text-white font-bold">Parvulapps</h1>
				</header>
				<footer>
					<p className="text-white">
						Una webapp para medir el progreso de estudiantes en educacion
						parvularia
					</p>
				</footer>
			</div>
			<div className="flex flex-col gap-6 items-center justify-center">
				{user ? (
					<h2 className="text-2xl font-bold">Bienvenid@ {user.name}</h2>
				) : (
					<h2 className="text-2xl font-bold">Hola! Inicia sesión con google</h2>
				)}
				{user ? (
					<>
						<Avatar user={user} />
						<Button className="w-48">
							<a href="/dashboard">Abrir app</a>
						</Button>
						<Button className="w-48" variant="secondary">
							<a href="/api/auth/logout">Cerrar Sesion</a>
						</Button>
					</>
				) : (
					<Button>
						<a href="/api/auth/login">Iniciar Sesion</a>
					</Button>
				)}
			</div>
		</main>
	);
}
