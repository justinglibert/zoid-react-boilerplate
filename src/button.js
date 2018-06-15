import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import './zoid/button'


class MyButtonComponent extends React.Component {
    render() {
        return (
            <div>
                {this.props.text}
            </div>
        )
    }
}

ReactDOM.render(
    <MyButtonComponent { ...window.xprops } />,
    document.querySelector('#root')
);
registerServiceWorker();
