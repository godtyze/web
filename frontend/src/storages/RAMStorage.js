import {action, makeAutoObservable} from 'mobx';
import {DateTime} from 'luxon';
import {getRAMLatestData, postNewRAMData} from '../routes/ram'

const zone = 'Europe/Moscow';

class RAMStorage {
    latestUsage = 0;
    data = {
        chart: {
            labels: [],
            dataset: {
                label: 'RAM',
                data: [],
                backgroundColor: [
                    this.backgroundColor,
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
            },
        },
    };


    constructor() {
        makeAutoObservable(this);
    }

    create(usage) {
        postNewRAMData({usage}).then(
            action('fetchSuccess', res => {
                this.get()
            }),
            action('fetchError', e => {
            }),
        );
    }

    get() {
        getRAMLatestData().then(
            action('fetchSuccess', res => {
                let newColors = [];

                this.data.chart.labels = res.map(it => {
                    let timestamp = DateTime.fromISO(it.timestamp + 'Z').setZone(zone);
                    newColors.push('rgba(255, 99, 132, 1)');
                    return `${timestamp.toLocaleString(DateTime.DATE_SHORT)} ${timestamp.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}`
                }).reverse();
                this.data.chart.dataset.borderColor = newColors;
                let latest = res.map(it => it.usage).reverse();
                this.data.chart.dataset.data = latest;
                this.latestUsage = latest[latest.length - 1];
            }),
            action('fetchError', e => {
            }),
        )
    }
}

const ramStorage = new RAMStorage()

export default ramStorage