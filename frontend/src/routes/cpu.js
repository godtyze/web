import {get, post} from './requester';

const url = 'http://localhost:5000/cpu'

export const postNewCPUData = (body) => {
    console.log(body)
    return post(url, body);
}
export const getCPULatestData = () => {
    return get(url);
}
