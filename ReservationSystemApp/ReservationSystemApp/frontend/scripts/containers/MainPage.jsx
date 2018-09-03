import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { links } from '../config/links';
import Banner from '../components/Banner';
import  HotelSearchActions from '../actions/HotelSearchActions';
import TopHotelsList from '../components/hotels/TopHotelsList';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getTopHotels()
    }

    render() {
        const { error, info } = this.props;
        return (
            <React.Fragment>
                <Banner/>
                <TopHotelsList
                    imageLinkCreator={this.props.imageLinkCreator}
                    info={info}
                />
                { error  && <h3>Loading error</h3> }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        info: state.search.info,
        error: state.hotels.error,
        isLoading: state.hotels.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    const bindedCreators = bindActionCreators({
        getTopHotels: () => HotelSearchActions.getTopHotels()
    }, dispatch);

    return {
        ...bindedCreators,
        imageLinkCreator: (imageId) => (
            links.IMAGE_DOWNLOAD_PATH(imageId)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);