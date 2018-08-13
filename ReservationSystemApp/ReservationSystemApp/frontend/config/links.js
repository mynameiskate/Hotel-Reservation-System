export const links = {
    HOTEL_REQUEST_PATH: (id) => `/hotels?hotelId=${id}`,
    MAIN_PAGE_PATH: '/',
    HOTEL_PAGE_PATH: '/hotels/:id/rooms',
    HOTEL_SEARCH_PAGE: '/hotels',
    HOTEL_ID_SEARCH_PAGE: (page) => `/hotels?page=${page}`,
    HOTEL_ID_PAGE: (id) => `/hotels/${id}/rooms`,
    SIGN_UP_PAGE: '/account/signup',
    SIGN_OUT_PAGE: '/account/signout',
    SIGN_IN_PAGE: '/account/login',
    USER_PAGE: '/account',
    PROFILE_PAGE: '/account/profile',
    LOCATION_LIST: '/locations',
    SERVICE_LIST: (hotelId) => `/hotels/${hotelId}/services`,
    ROOM_ID_PAGE: (hotelId) => `/hotels/${hotelId}/rooms`,
    ROOM_PAGE: '/hotels/:id/rooms',
    BOOKING_PAGE: '/booking/:id',
    BOOKING_ID_PAGE: (roomId = 1) => `/booking/${roomId}`
}