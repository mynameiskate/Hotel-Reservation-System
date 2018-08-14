import React from 'react';
import moment from 'moment';

import MomentExtensions from '../extensions/MomentExtensions';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { remainingTime: this.getRemainingTime(props.expiryTime) }
    }

    componentDidMount() {
        this.start()
    }
    componentWillUnmount() {
        this.stop()
    }

    getRemainingTime = (expiryTime) => {
        return moment.duration(expiryTime.diff(moment()));
    }

    start = () => {
        this.frameId = requestAnimationFrame(this.tick)
    }

    tick = () => {
        const remainingTime = this.getRemainingTime(this.props.expiryTime)

        if (remainingTime <= 0) {
            this.stop();
            this.props.finishCallback();
        }
        else {
            this.setState(
            { remainingTime },
            () => this.frameId = requestAnimationFrame(this.tick)
            )
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    render() {
        const { remainingTime } = this.state;
        return (
            <div>
                {remainingTime
                    && <h3>Time left: { MomentExtensions.timeMomentToStr(remainingTime)}</h3>
                }
            </div>
        );
    }
}

export default Timer;