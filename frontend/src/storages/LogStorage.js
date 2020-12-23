import {action, makeAutoObservable} from 'mobx';
import {DateTime} from 'luxon';
import {getLogLatestData} from '../routes/log'

const zone = 'Europe/Moscow';

class LogStorage {
    logs = []

    constructor() {
        makeAutoObservable(this);
    }

    get() {
        getLogLatestData().then(
            action('fetchSuccess', res => {
                this.logs = res.map(it => {
                    let timestamp = DateTime.fromISO(it.timestamp + 'Z').setZone(zone);
                    return {
                        text: it.text,
                        timestamp: `${timestamp.toLocaleString(DateTime.DATE_SHORT)} ${timestamp.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}`
                    }
                })
            }),
            action('fetchError', e => {
            }),
        )
    }
}

const logStorage = new LogStorage()

export default logStorage