export const inputValueTrimField = (obj: Object) => {
	return Object.values(obj).every((value) => value.trim());
};
