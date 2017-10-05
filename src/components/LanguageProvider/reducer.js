import { CHANGE_LOCALE, SET_LOCALES } from './constants';
import { appLocales } from '../../i18n';

const getDir = locale => (locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr');

const initialState = {
  locale: 'en',
  dir: 'ltr',
  locales: appLocales
};

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.locale,
        dir: getDir(action.locale)
      };
    case SET_LOCALES:
      return { ...state, locales: action.locales };
    default:
      return state;
  }
}

export default languageProviderReducer;
