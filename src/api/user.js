/*
 * @Author: ink-song 229135518@qq.com
 * @Date: 2023-09-10 23:18:34
 * @LastEditors: ice-7777777 15519586771@163.com
 * @LastEditTime: 2023-09-12 10:22:59
 * @FilePath: /imooc-admin 2/src/api/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

export const feature = () => {
  return request({
    url: '/user/feature'
  })
}

export const chapter = () => {
  return request({
    url: '/user/chapter'
  })
}
