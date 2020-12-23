import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.css';

const Clock = ({ className, children }) => {
    const zone = 'Europe/Moscow';
    const getCurrentTime = () => DateTime.local().setZone(zone);
    const now = getCurrentTime();
    let [time, setTime] = useState(now);
    const updateTime = () => {
        setTime(getCurrentTime());
    };
    useEffect(() => {
        const interval = setInterval(() => {
            updateTime();
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div className={classNames('clock', className)}>
            <p className={'clock-time'}>{time.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}</p>
            <p className={'clock-date'}>{time.toLocaleString(DateTime.DATE_FULL)}</p>
            {children}
        </div>
    );
};


Clock.defaultProps = {
    children: [],
    className: '',
};

Clock.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Clock;
