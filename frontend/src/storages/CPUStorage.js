import {action, makeAutoObservable} from 'mobx';
import {DateTime} from 'luxon';
import {getCPULatestData, postNewCPUData} from '../routes/cpu'

const zone = 'Europe/Moscow';

class CPUStorage {
    latestUsage = 0;
    data = {
        chart: {
            labels: [],
            dataset: {
                label: 'CPU',
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
        postNewCPUData({usage}).then(
            action('fetchSuccess', res => {
                this.get()
            }),
            action('fetchError', e => {
            }),
        );
    }

    get() {
        getCPULatestData().then(
            action('fetchSuccess', res => {
                let newColors = [];
                this.data.chart.labels = res.map(it => {
                    let timestamp = DateTime.fromISO(it.timestamp + 'Z').setZone(zone);
                    console.log(timestamp.toISO())
                    newColors.push('rgba(255, 99, 132, 1)');
                    return `${timestamp.toLocaleString(DateTime.DATE_SHORT)} ${timestamp.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}`
                }).reverse()
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

const cpuStorage = new CPUStorage()

export default cpuStorage