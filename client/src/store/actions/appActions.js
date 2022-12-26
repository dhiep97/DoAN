import actionTypes from './actionTypes';

//khong truyen data
export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});

//truyen data
export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});

// export const changeLanguageApp = (languageInput) => ({
//     type: actionTypes.CHANGE_LANGUAGE,
//     language: languageInput
// })