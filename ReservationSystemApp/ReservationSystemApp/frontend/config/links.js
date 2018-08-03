export const links = {
    MAIN_PAGE_PATH: '/',
    HOTEL_PAGE_PATH: '/hotels/details/:id',
    HOTEL_SEARCH_PAGE: '/hotels',
    HOTEL_ID_SEARCH_PAGE: (page) => `/hotels?page=${page}`,
    HOTEL_ID_PAGE: (page) => `/hotels/details/${page}`,
    SIGN_UP_PAGE: '/account/signup',
    SIGN_OUT_PAGE: '/account/signout',
    SIGN_IN_PAGE: '/account/login',
    USER_PAGE: '/account',
    PROFILE_PAGE: '/account/profile',
    LOCATION_LIST: '/locations'
}