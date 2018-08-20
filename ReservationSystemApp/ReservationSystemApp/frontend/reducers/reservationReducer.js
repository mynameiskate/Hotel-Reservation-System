import {
    reservationConstants
} from '../constants/reservationConstants';

const initialState = {
    isLoading: false,
    info: [],
    error: null,
    currentRoomId: null,
    reservation: null,
    totalCost: null,
    services: [],
    possibleServices: [],
    currentRoom: {},
    moveInTime: '10:00',
    newService: null,
    newServiceCost: null
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
            const {
                reservation
            } = data;
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
        case reservationConstants.ADD_SERVICE:
            {
                const services = state.reservation.services || [];
                const {
                    service
                } = data;
                const updatedServices = [...services, service];
                return {
                    ...state,
                    reservation: {
                        ...state.reservation,
                        services: updatedServices
                    },
                    totalCost: state.totalCost + service.cost
                }
            }
        case reservationConstants.REMOVE_SERVICE:
            {
                const services = state.reservation.services || [];
                const id = data.service.hotelServiceId;
                const targetIndex = services.findIndex(service => service.hotelServiceId == id);

                if (targetIndex < 0) {
                    return state;
                } else {
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
        case reservationConstants.ADD_HOTEL_SERVICE:
            {
                const services = state.services || [];
                const {
                    service
                } = data;
                const targetIndex = services.findIndex(s => s.hotelServiceId == service.hotelServiceId);
                const updatedServices = (targetIndex >= 0) ? [...services.slice(0, targetIndex), {
                        ...service,
                        isRemoved: false
                    },
                    ...services.slice(targetIndex + 1)
                ] : [...services, {...service,
                    isRemoved: false
                }];
                return {
                    ...state,
                    services: updatedServices
                }
            }
        case reservationConstants.REMOVE_HOTEL_SERVICE:
            {
                const services = state.services || [];
                const id = data.id;
                const targetIndex = services.findIndex(service => service.hotelServiceId == id);

                if (targetIndex < 0) {
                    return state;
                } else {
                    const targetService = services[targetIndex];

                    const updatedServices = [
                        ...services.slice(0, targetIndex), {
                            ...targetService,
                            isRemoved: true
                        },
                        ...services.slice(targetIndex + 1)
                    ];
                    return {
                        ...state,
                        services: updatedServices
                    }
                }
            }
        case reservationConstants.UPDATE_HOTEL_SERVICE_COST:
            {
                const services = state.services || [];
                const id = data.id;
                const targetIndex = services.findIndex(service => service.hotelServiceId == id);

                if (targetIndex < 0) {
                    return state;
                } else {
                    const targetService = services[targetIndex];

                    const updatedServices = [
                        ...services.slice(0, targetIndex), {
                            ...targetService,
                            cost: data.cost
                        },
                        ...services.slice(targetIndex + 1)
                    ];

                    return {
                        ...state,
                        services: updatedServices
                    }
                }
            }
        case reservationConstants.GET_SERVICES_SUCCESS:
            return {
                ...state,
                services: data.services
            }
        case reservationConstants.GET_POSSIBLE_SERVICES_SUCCESS:
            const allServices = data.services;
            const currentServices = state.services;
            const possibleServices = allServices && currentServices ?
                allServices.filter(as =>
                    !(currentServices).find(cs => cs.serviceId == as.serviceId)
                ) : [];
            return {
                ...state,
                possibleServices
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
        case reservationConstants.CHOOSE_NEW_SERVICE:
            return {
                ...state,
                newService: data.service
            }
        case reservationConstants.ADD_NEW_SERVICE_COST:
            return {
                ...state,
                newServiceCost: data.cost
            }
        case reservationConstants.SET_CURRENT_ROOM:
            return {
                ...state,
                currentRoom: data.room
            }
        case reservationConstants.SET_MOVE_IN_TIME:
            return {
                ...state,
                moveInTime: data.moveInTime
            }
        case reservationConstants.CREATE_NEW_SERVICE_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                service: data.service
            }
        case reservationConstants.CREATE_NEW_SERVICE_FAILURE:
            return {
                ...state,
                error: data.error,
                isLoading: false
            }
        default:
            return state;
    }
}