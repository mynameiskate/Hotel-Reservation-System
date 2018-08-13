import {
    reservationConstants
} from '../constants/reservationConstants.js';

const initialState = {
    isLoading: false,
    info: [],
    error: null,
    currentRoomId: null,
    reservation: null,
    totalCost: null,
    services: []
}

export function reservationReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case reservationConstants.BOOK_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                currentRoomId: data.roomId
            }
        case reservationConstants.BOOK_SUCCESS:
            const { reservation } = data;
            return {
                ...state,
                error: null,
                isLoading: false,
                reservation,
                totalCost: reservation ? reservation.totalCost : null
            }
        case reservationConstants.BOOK_FAILURE:
            return {
                ...state,
                error: data.error,
                isLoading: false
            }
        case reservationConstants.ADD_SERVICE: {
            const services = state.reservation.services || [];
            const { service } = data;
            const updatedServices = [...services, service ];
            return {
                ...state,
                reservation: {
                    ...state.reservation,
                    services: updatedServices
                },
                totalCost: state.totalCost + service.cost
            }
        }
        case reservationConstants.REMOVE_SERVICE: {
            const services = state.reservation.services || [];
            const id = data.service.hotelServiceId;
            const targetIndex = services.findIndex(service => service.hotelServiceId == id);

            if (targetIndex < 0) {
                return state;
            }
            else {
                const updatedServices = [
                    ...services.slice(0, targetIndex),
                    ...services.slice(targetIndex + 1)
                ];

                return {
                    ...state,
                    reservation: {
                        ...state.reservation,
                        services: updatedServices
                    },
                    totalCost: state.totalCost - data.service.cost
                }
            }
        }
        case reservationConstants.GET_SERVICES_SUCCESS:
            return {
                ...state,
                services: data.services
            }
        case reservationConstants.UPDATE_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                reservation: data.reservation
            }
        case reservationConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: data.error,
                isLoading: false
            }
        case reservationConstants.UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}