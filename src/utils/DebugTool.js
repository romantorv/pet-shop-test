import * as debug from 'debug';

const store = debug(`pactera:${ process.env.NODE_ENV }:store`);
const log = debug(`pactera:${ process.env.NODE_ENV }:log`);
const error = debug(`pactera:${ process.env.NODE_ENV }:error`);

export { store, log, error };