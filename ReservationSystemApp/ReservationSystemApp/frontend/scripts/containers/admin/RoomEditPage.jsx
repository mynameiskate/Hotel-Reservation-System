import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form';
import Gallery from 'react-photo-gallery';

import { links } from '../../config/links';
import GalleryImage from '../../components/images/GalleryImage';
import ImageUploadForm from '../../components/images/ImageUploadForm';
import RoomEditForm from '../../components/rooms/HotelRoomEditForm';
import RoomActions from '../../actions/RoomActions';
import HotelActions from '../../actions/HotelActions';
import FileActions from '../../actions/FileActions';
import ReservationActions from '../../actions/ReservationActions';
import SelectService from '../../services/SelectService';
import GalleryService from '../../services/GalleryService';

class RoomEditPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       this.props.init();
    }

    componentDidUpdate(prevProps) {
        if (this.props.search !== prevProps.search) {
            this.props.init();
        }
    }

    render() {
        const { cost, adults, currentRoom, isRoomAvailable, isNumberValid, error,
                isFileTypeValid, imageIds } = this.props;
        return (
            <div className="editForm">
                {
                    currentRoom &&
                        <React.Fragment>
                            <div className="btnBox">
                                <button
                                    onClick={this.props.removeAllImages}
                                    className="detailsBtn"
                                >
                                    Remove all images
                                </button>
                                <ImageUploadForm
                                    isValid={isFileTypeValid}
                                    onInputChange={this.props.chooseImages}
                                />
                            </div>
                            <RoomEditForm
                                roomNumber={currentRoom.number}
                                roomId={currentRoom.id}
                                cost={cost}
                                adultsAmount={adults}
                                isRoomAvailable={isRoomAvailable}
                                changeAvailability={this.props.changeAvailability}
                                updateAdultsAmount={this.props.setAdultsAmount}
                                updateNumber={this.props.setRoomNumber}
                                updateCost={this.props.setCost}
                                changeAvailability={this.props.setRoomAvailability}
                                adultOptions={this.props.getAdultOptions()}
                                sendRequest={this.props.editRoom}
                                isNumberValid={isNumberValid}

                                photos={this.props.getImageSet(imageIds)}
                                removeImage={this.props.removeImage}
                                imageIds={imageIds}
                            />
                        </React.Fragment>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        hotelInfo: state.hotels.loaded,
        currentRoom: state.rooms.currentRoom,
        cost: state.rooms.cost,
        adults: state.rooms.adults,
        error: state.rooms.error,
        isLoading: state.rooms.isLoading,
        search: state.router.location.search,
        isRoomAvailable: state.rooms.isRoomAvailable,
        roomNumber: state.rooms.roomNumber,
        isNumberValid: state.rooms.isNumberValid,
        isFileTypeValid: state.files.isFileTypeValid,
        imageIds: state.files.imageIds
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const hotelId = ownProps.match.params.hotelId;
    const roomId = ownProps.match.params.roomId;

    const bindedCreators = bindActionCreators({
        init: () => {
            return dispatch => {
                dispatch(HotelActions.showHotel(hotelId));
                dispatch(RoomActions.getHotelRoom(hotelId, roomId));
            }
        },

        setCost: (cost) => {
            return dispatch => {
                dispatch(RoomActions.setCost(cost));
                dispatch(change('roomEditForm', 'cost', cost || ''));
            }
        },

        setAdultsAmount: (adults) => {
            const { value } = adults;
            return dispatch => {
                dispatch(RoomActions.setAdults(value));
            }
        },

        setRoomAvailability: () => RoomActions.setRoomAvailability(),

        editRoom: () => RoomActions.editRoom(hotelId, roomId),

        setRoomNumber: (number) => RoomActions.setRoomNumber(hotelId, number),

        chooseImages: (images) => FileActions.chooseFiles(images),

        setCurrentRoom: (room) => ReservationActions.setCurrentRoom(room),

        removeImage: (e, info) => FileActions.deleteImage(info.photo.id),

        removeAllImages: () => FileActions.removeAllImages()
    }, dispatch);

    return {
        ...bindedCreators,

        getAdultOptions: () => SelectService.getNumericOptions(10),

        getImageSet: (imageIds) => {
            const imageLinkCreator = (imageId) => (
                links.IMAGE_DOWNLOAD_PATH(imageId)
            );

            return GalleryService.getImageSet(imageLinkCreator, imageIds);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomEditPage);