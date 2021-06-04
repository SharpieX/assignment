import { productsConstants } from '../constants';

const initialState = {
    products: [],
    currentPage:1,
    totalPages:null,
}
export function products(state = initialState, action) {
    switch (action.type) {
        case productsConstants.GET_ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products:[]
            };
        case productsConstants.GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: state.products.concat(action.data.products),
                currentPage:action.data.currentPage,
                totalPages:action.data.totalPages
            }
        case productsConstants.GET_ALL_PRODUCTS_ERROR:
            return {
                error: action.error
            };
        default:
            return state
    }
}