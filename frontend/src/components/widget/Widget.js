import React from 'react';
import './style.css';


const Widget = (props) => {
    return <div className={'widget ' + ((props.value > 90) ? 'widget-red' : 'widget-default')}>
        <h3>{props.value}%</h3>
        <h4>{props.title}</h4>
    </div>
}

export default Widget;