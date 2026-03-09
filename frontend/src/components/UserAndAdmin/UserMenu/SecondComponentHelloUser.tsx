import { useAuthStore } from "../../../GlobalSetZustand/authStore";
import { useState, useEffect } from "react";

export default function SecondComponentHelloUser() {
	const { users, isAdmin, currentUser } = useAuthStore();
	
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (!currentUser?.username) return;

		const storedUsername = localStorage.getItem("currentUser");

		if (storedUsername !== currentUser.username) {
			localStorage.setItem("currentUser", currentUser.username);
			
			setIsVisible(true);

			setTimeout(() => {
				setIsVisible(false);
			}, 4000);
		}
		
	}, [currentUser]); // Эффект сработает при изменении currentUser

	return (
		<section className="overflow-hidden absolute right-0">
			<div
				className={`
					${isVisible ? "translate-x-0" : "translate-x-full"} 
					transition-all duration-1500 ease-in-out 
					ml-auto max-w-md relative p-6 bg-white rounded-xl shadow-lg border border-orange-500/30 mt-6
				`}
			>
				<div className="text-center py-8">
					<h2 className="text-3xl font-oswald font-bold text-blue-600 mb-4">
						Добро пожаловать, {currentUser?.username}!
					</h2>
					<p className="text-lg mb-2">
						Вы вошли как <strong>{currentUser?.email}</strong>
					</p>
					<p className="text-sm text-gray-600 mb-6">
						Роль:{" "}
						<span className="font-bold text-blue-600">
							{currentUser?.role}
						</span>
					</p>

					{isAdmin() && (
						<div className="mb-6">
							<h3 className="font-bold text-gray-700 mb-2">
								Пользователи:
							</h3>
							<ul className="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto text-left">
								{users.map((user) => (
									<li
										key={user.id}
										className="py-1 border-b border-gray-200 last:border-0 flex justify-between"
									>
										<span>{user.username}</span>
										<span className="text-sm text-gray-500">
											{user.role}
										</span>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}