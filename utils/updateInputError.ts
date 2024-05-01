type TUpdateInputError = {
	error: string;
	stateError: (value: string) => void;
};

export const updateInputError = ({ error, stateError }: TUpdateInputError) => {
	stateError(error);
};
