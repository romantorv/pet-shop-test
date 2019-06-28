import { flow } from 'mobx-state-tree';
import axios from 'axios';

export default {
	fetch: flow( function* fetch({
		method='GET',
		url,
		cancelToken=null,
		auth=null
	}) {
		try {
			const response = yield axios.request({
				method,
				url,
				cancelToken,
				auth,
			});
			return response.data;
		} catch (error) {
			// debug.store(endPoint, error.response);
			throw error.response && error.response.data ? error.response.data : error;
		}
	})
}