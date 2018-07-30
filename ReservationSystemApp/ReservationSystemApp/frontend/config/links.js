export const links = {
    MAIN_PAGE_PATH: '/',
    HOTEL_PAGE_PATH: '/hotels/details/:id',
    HOTEL_LIST_PAGE: '/hotels/all',
    HOTEL_FILTER_PAGE: '/hotels/filter?',
    HOTEL_SEARCH_PAGE: '/hotels/?',
    HOTEL_ID_PAGE: (id) => `/hotels/details/${id}`,
    SIGN_UP_PAGE: '/account/signup',
    SIGN_OUT_PAGE: '/account/signout',
    SIGN_IN_PAGE: '/account/login',
    USER_PAGE: '/account',
    PROFILE_PAGE: '/account/profile',
    LOCATION_LIST: '/hotels/locations'
}