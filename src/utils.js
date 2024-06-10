import moment from "moment";

export class DateTimeUtil {
	static REQUEST_FORMAT = "YYYY-MM-DD";
	static DISPLAY_FORMAT = "DD/MM/YYYY";

	static parse(value, toDate = true) {
		const time = moment(value, DateTimeUtil.REQUEST_FORMAT, true);
		return toDate ? time.toDate() : time;
	}

	static format(value, display = true) {
		const format = display
			? DateTimeUtil.DISPLAY_FORMAT
			: DateTimeUtil.REQUEST_FORMAT;
		const date = moment(value).format(format);
		return date !== "Invalid date" ? date : "";
	}
}
