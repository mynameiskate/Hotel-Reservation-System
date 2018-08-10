export const links = {
    MAIN_PAGE_PATH: '/',
    HOTEL_PAGE_PATH: '/hotels/:id/details',
    HOTEL_SEARCH_PAGE: '/hotels',
    HOTEL_DETAIL_PAGE: '/hotels/details',
    HOTEL_ID_SEARCH_PAGE: (page) => `/hotels?page=${page}`,
    HOTEL_ID_PAGE: (id) => `/hotels/${id}/details`,
    SIGN_UP_PAGE: '/account/signup',
    SIGN_OUT_PAGE: '/account/signout',
    SIGN_IN_PAGE: '/account/login',
    USER_PAGE: '/account',
    PROFILE_PAGE: '/account/profile',
    LOCATION_LIST: '/locations',
    ROOM_ID_PAGE: (hotelId) => `/hotels/${hotelId}/rooms`,
    ROOM_PAGE: '/hotels/:id/rooms',
    BOOKING_PAGE: '/booking/:id',
    BOOKING_ID_PAGE: (roomId = 1) => `/booking/${roomId}`
}