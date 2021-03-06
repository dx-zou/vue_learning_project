import Vue from "vue";
import VueI18n from "vue-i18n";
import Element from "element-ui";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import store from "@/store";
import zh from "./zh";
import en from "./en";
Vue.use(VueI18n);
let locale = store.getters.locale;
const messages = {
  "zh-CN": {
    ...zh,
    ...zhLocale
  },
  "en-US": {
    ...en,
    ...enLocale
  }
};
const i18n = new VueI18n({
  locale, // 语言标识
  messages
  // silentTranslationWarn: true // 去除console中黄色报错
});

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
});
export default i18n;
