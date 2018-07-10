import React from 'react';
import ReactDOM from 'react-dom';
import { hotelContainer } from '../../actionContainers/hotelActionContainers.js'
import { connect } from 'react-redux';


class Main extends React.Component {
	constructor(props) {
        super(props);
        const { dispatch } = this.props;
    }

    componentDidMount() {
        this.props.dispatch(hotelContainer.findHotels());
    }

    render() {
    	const { data, error, isSent} = this.props;
    	return ( 
	        <div>
	        	 <h1>Welcome to hotel reservation system</h1>
	        	 { isSent && <h3>Loading hotels..</h3>}
	        	 {data &&
	        	 	<ul>
                        {data.map((hotel) =>
                            <li>
                                {hotel}
                            </li>
                        )}
                    </ul>
	        	 }
	        	 { error  && <h3>Loading error</h3>}
	        </div>
	    );
    }
}

let mapProps = (state) => {
    return {
        data: state.data,
        error: state.error,
        isSent: state.isSent
    }
}

export default connect(mapProps)(Main) 