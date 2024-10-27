// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // передаем i18n в react-i18next
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          // другие ключи для английского языка
        }
      },
      ru: {
        translation: {
          welcome: "Добро пожаловать",
          // другие ключи для русского языка
        }
      },
      // добавьте другие языки по мере необходимости
    },
    lng: "en", // язык по умолчанию
    fallbackLng: "en", // язык, который будет использоваться, если текущий язык отсутствует
    interpolation: {
      escapeValue: false // не нужно для React
    }
  });

export default i18n;
