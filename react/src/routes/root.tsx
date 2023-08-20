import { Outlet } from "react-router-dom";

export default function Root() {
	return (
		<div className="w-5/6 mx-auto p-8">
			<header className="flex flex-col items-center gap-4">
				<h1 className="text-3xl font-bold">CRUD-IN-ONE</h1>
				<p>React.js + Tailwind CSS</p>
			</header>

			<main>
				<Outlet />
			</main>
		</div>
	)
}
