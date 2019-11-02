import { SET_BOOKS, ADD_BOOK, EDIT_BOOK, DELETE_BOOK } from '../../actions/action-types';
import { successActionType, pendingActionType, failureActionType } from '../utils/index';

const initialState = {
    data: [],
    isLoading: false,
    success: true,
};

const categories = (state = initialState, action) => {
    switch (action.type) {
        case successActionType(SET_BOOKS): {
            return {
                data: action.payload,
                isLoading: false,
                success: true,
            };
        }
        case pendingActionType(SET_BOOKS): {
            return {
                data: [],
                isLoading: true,
                success: false,
            };
        }
        case failureActionType(SET_BOOKS): {
            return {
                data: [],
                isLoading: false,
                success: false,
            };
        }
        case successActionType(ADD_BOOK): {
            return {
                data: [...state.data, action.payload],
                isLoading: false,
                success: true,
            };
        }
        case pendingActionType(ADD_BOOK): {
            return {
                ...state,
                isLoading: true,
                success: false,
            };
        }
        case failureActionType(ADD_BOOK): {
            return {
                ...state,
                isLoading: false,
                success: false,
            };
        }
        case successActionType(EDIT_BOOK): {
            return {
                data: state.data.map(curr => curr.id !== action.payload.id ? curr : action.payload),
                isLoading: false,
                success: true,
            };
        }
        case pendingActionType(EDIT_BOOK): {
            return {
                ...state,
                isLoading: true,
                success: false,
            };
        }
        case failureActionType(EDIT_BOOK): {
            return {
                ...state,
                isLoading: false,
                success: false,
            };
        }
        case successActionType(DELETE_BOOK): {
            return {
                data: state.data.filter(curr => curr.id !== action.payload),
                isLoading: false,
                success: true,
            };
        }
        case pendingActionType(DELETE_BOOK): {
            return {
                ...state,
                isLoading: true,
                success: false,
            };
        }
        case failureActionType(DELETE_BOOK): {
            return {
                ...state,
                isLoading: false,
                success: false,
            };
        }
        default:
            return state;
    }
};

export default categories;
