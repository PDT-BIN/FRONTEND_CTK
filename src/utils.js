import moment from "moment";

export class DateTimeUtil {
	static REQUEST_FORMAT = "YYYY-MM-DD";
	static DISPLAY_FORMAT = "DD/MM/YYYY";
	static DATETIME_FORMAT = "YYYY-MM-DD HH:mm";

	static parse(value, toDate = true, toTime = false) {
		const format = toTime
			? DateTimeUtil.DATETIME_FORMAT
			: DateTimeUtil.DISPLAY_FORMAT;

		const time = moment(value, format, true);
		return toDate ? time.toDate() : time;
	}

	static format(value, display = true, datetime = false, format = null) {
		let type = !display
			? DateTimeUtil.REQUEST_FORMAT
			: !datetime
			? DateTimeUtil.DISPLAY_FORMAT
			: DateTimeUtil.DATETIME_FORMAT;
		if (format !== null) type = format;
		const date = moment(value).format(type);
		return date !== "Invalid date" ? date : "";
	}
}
