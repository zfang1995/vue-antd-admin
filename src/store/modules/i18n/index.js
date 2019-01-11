import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import en_US from 'ant-design-vue/lib/locale-provider/en_US'
import enLocale from './en'
import zhLocale from './zh'
import localforage from 'localforage'
import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

export let i18n_store = {
  state: {
    userLanguage: window.navigator.language
  },
  getters: {
    locale (state) {
      return state.userLanguage === 'zh-CN' ? zh_CN : en_US
    }
  },
  mutations: {
    CHANGE_LOCALE (state, payload) {
      state.userLanguage = payload
      i18n.locale = payload
    }
  },
  actions: {
    async getPreferedLanguage (context) {
      let storedOption = await localforage.getItem('language')
      context.commit('CHANGE_LOCALE', storedOption || context.state.userLanguage)
    }
  }
}

export const messages = {
  'en-US': {
    ...enLocale,
  },
  'zh-CN': {
    ...zhLocale,
  }
};

export let i18n = new VueI18n({
  locale: i18n_store.state.userLanguage,
  messages
});
