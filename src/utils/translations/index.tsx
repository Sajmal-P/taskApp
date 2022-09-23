import i18n from 'i18n-js';
import MMKVStorage from "react-native-mmkv-storage";
const MMKV = new MMKVStorage.Loader().initialize();
var languageStored: string | null | undefined

const translationGetters: any = {
    en: () => require('./en.json'),
    de: () => require('./de.json'),
  };
export const translate = (key:any) => {
    return i18n.t(key);
};
export const getLanguageStored = async() => {
    languageStored = await MMKV.getStringAsync("language");

};
export const setI18nConfig = async(languageTag:any) => {
    getLanguageStored()
languageTag = languageTag ? languageTag : languageStored ||'de';
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
};

export const languages = [
    {
        label: 'English',
        value: 'en',
    },
    {
        label: 'German',
        value: 'de',
    },
];
