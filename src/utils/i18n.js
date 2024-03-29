/*
 * @Author: ice-7777777 15519586771@163.com
 * @Date: 2023-08-23 13:44:06
 * @LastEditors: ink-song 229135518@qq.com
 * @LastEditTime: 2023-09-11 00:10:25
 * @FilePath: /imooc-admin/src/utils/i18n.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import i18n from '@/i18n'
export const generateTitle = (title) => {
  return i18n.global.t('msg.route.' + title)
}
import { useLanguage } from '@/hooks/useLanguage'
const { language } = useLanguage()
import { watch } from 'vue'
/**
 *
 * @param  {...any} cbs 所有的回调
 */
export function watchSwitchLang(...cbs) {
  watch(
    () => language,
    () => {
      cbs.forEach((cb) => cb(language))
    },
    {
      immediate: true,
      deep: true
    }
  )
}
