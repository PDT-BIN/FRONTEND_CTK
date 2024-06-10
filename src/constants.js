export const URL_TO_TAB = {
	"/": "Dashboard",
	"/employee": "Employee",
	"/driver": "Driver",
	"/coach": "Coach",
	"/journey": "Journey",
};

export const PHONE_REGEX =
	/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/gm;

export const DRIVER_LICENSES = [
	{ value: "Hạng B1 số tự động", label: "Hạng B1 số tự động" },
	{ value: "hạng B1", label: "hạng B1" },
	{ value: "hạng B2", label: "hạng B2" },
	{ value: "hạng C", label: "hạng C" },
	{ value: "hạng D", label: "hạng D" },
	{ value: "hạng E", label: "hạng E" },
	{ value: "hạng F", label: "hạng F" },
	{ value: "hạng FB2", label: "hạng FB2" },
	{ value: "hạng FC", label: "hạng FC" },
	{ value: "hạng FE", label: "hạng FE" },
];

export const COACH_TYPES = [
	{ value: "Limousine", label: "Limousine" },
	{ value: "Giường", label: "Sleeper" },
];
