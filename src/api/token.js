import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, USER_PROFILE } from "./constants";

export default function getTokenItem(propertyKey) {
	// CHECK TOKEN & PROPERTY KEY.
	const token = localStorage.getItem(ACCESS_TOKEN);
	const key = USER_PROFILE[propertyKey];
	if (token === null || key === undefined) return null;
	// DECODE TOKEN.
	const data = jwtDecode(token);
	return data[key];
}
