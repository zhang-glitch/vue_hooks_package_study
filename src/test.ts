import { useI18n } from "./i18n/useI18n"
const {t} = useI18n()
export default () => {
  return {
    a: t("common.commonBtn")
  }
}