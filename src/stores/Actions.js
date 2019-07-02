import { flow } from 'mobx-state-tree';
import axios from 'axios';

import * as debug from 'utils/DebugTool';

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
			debug.store(`Successfully '${method}' from ${url}`);
			return response.data;
		} catch (error) {
			debug.store(`error fetching ${url}`, error.response );
			throw error.response ? error.response : new Error('There is error while fetching');
		}
	})
}