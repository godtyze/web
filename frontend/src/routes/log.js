import {get} from './requester';

const url = 'http://localhost:5000/log'

export const getLogLatestData = () => {
    return get(url);
}
