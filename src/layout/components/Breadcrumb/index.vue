<!--
 * @Author: ice-7777777 15519586771@163.com
 * @Date: 2023-06-28 14:11:56
 * @LastEditors: ink-song 229135518@qq.com
 * @LastEditTime: 2023-07-16 23:26:59
 * @FilePath: /imooc-admin/src/layout/components/Breadcrumb/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">
          {{ generateTitle(item.meta.title) }}
        </span>
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{
          generateTitle(item.meta.title)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import variables from '@/styles/variables.scss'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
const router = useRouter()

const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}
const linkHoverColor = ref(variables.menuBg)

const onLinkClick = (item) => {
  router.push(item.path)
}
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    color: #666;
    font-weight: 600;
  }
  .redirect:hover {
    // 将来需要进行主题替换，所以这里不去写死样式
    color: v-bind(linkHoverColor);
  }
}
</style>
