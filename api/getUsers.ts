import axios from 'axios';

const URL_API_USERS = 'https://jsonplaceholder.typicode.com';

const getUsers = async () => {
	try {
		const response = await axios(`${URL_API_USERS}/users?_limit=5`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error.response?.data, error); //!need add message  TODO error.response?.data.message(should return backend)
		} else if (error instanceof Error) console.error(error.message);
	}
};

export default getUsers;
