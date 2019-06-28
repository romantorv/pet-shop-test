const axios = {
	request: jest.fn(() => {
		return Promise.resolve({ data: {} });
	})
};
axios.CancelToken = {
	source: jest.fn(() => {
		return Promise.resolve({ data: {} });
	}),
	token: jest.fn(() => {
		return Promise.resolve({ data: {} });
	})
};

axios.defaults = {};

export default axios;