import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import Clock from './components/clock/Clock';
import Aside from './components/aside/Aside';
import Chart from "./components/chart/Chart";
import Widget from "./components/widget/Widget";
import LogTable from "./components/log/LogTable";
import './vendor/normalize.css';
import './App.css';

import cpuStorage from './storages/CPUStorage';
import ramStorage from './storages/RAMStorage';
import logStorage from './storages/LogStorage';

const App = observer(() => {
    useEffect(() => {
        cpuStorage.get();
        ramStorage.get();
        setInterval(
            () => {
                cpuStorage.get();
                ramStorage.get();
            }, 30000
        )
    }, [])
    useEffect(() => {
        logStorage.get();
        setInterval(
            () => {
                logStorage.get();
            }, 3000
        )
    }, [])
    const {data: {chart: {dataset: cpuDataset, labels: cpuLabels}}} = cpuStorage;
    const {data: {chart: {dataset: ramDataset, labels: ramLabels}}} = ramStorage;
    return (
        <React.Fragment>
            <header className="App-header">
                <h2 className={'header-title'}>Monitoring CPU/RAM App</h2>
                <Clock/>
            </header>
            <main className="App-main">
                <Aside/>
                <div className={'main-content'}>
                    <div className={'main-charts-wrapper'}>
                        <div className={'chart-widget-wrapper'}>
                            <Widget title={'CPU'} value={toJS(cpuStorage.latestUsage)}/>
                            <Chart data={{
                                labels: toJS(cpuLabels),
                                datasets: [toJS(cpuDataset)]
                            }}/>
                        </div>
                        <div className={'chart-widget-wrapper'}>
                            <Widget title={'RAM'} value={toJS(ramStorage.latestUsage)}/>
                            <Chart data={{
                                labels: toJS(ramLabels),
                                datasets: [toJS(ramDataset)]
                            }}/>
                        </div>
                    </div>
                    <LogTable data={toJS(logStorage.logs)}/>
                </div>
            </main>
            <footer className="App-footer">
                <h5>Никита Чубис<br/> СМБ-701-O</h5>
            </footer>
        </React.Fragment>
    );
})

export default App;
