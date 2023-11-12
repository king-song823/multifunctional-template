/*
 * @Author: ink-song 229135518@qq.com
 * @Date: 2023-09-17 00:22:03
 * @LastEditors: ice-7777777 15519586771@163.com
 * @LastEditTime: 2023-10-26 18:19:24
 * @FilePath: /imooc-admin 2/src/directives/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import print from 'vue3-print-nb'
import permission from './premission'
export default (app) => {
  app.use(print)
  app.directive('permission', permission)
}
