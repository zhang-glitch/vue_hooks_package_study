import {defineStore} from "pinia"

export const useAppStore = defineStore('app', {
  state: () => ({ localeLang: localStorage.getItem("localeLang") }),
  
  actions: {
    changeLocaleLang(locale: string) {
      this.localeLang = locale
      localStorage.setItem("localeLang", locale)
    },
  },
})