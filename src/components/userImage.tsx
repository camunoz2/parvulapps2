"use client";

import { useEffect, useState } from "react";

export function UserImage() {
	const [userImage, setUserImage] = useState("");

	useEffect(() => {
		const image = localStorage.getItem("userImage");
		if (image) {
			setUserImage(image);
		}
	}, []);

	return <img src={userImage} alt="" />;
}
