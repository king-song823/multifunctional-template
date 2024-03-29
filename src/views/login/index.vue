<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFromRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
      </div>
      <lang-select class="right-menu-item hover-effect" />
      <el-form-item prop="username">
        <span class="svg-container">
          <span class="svg-container">
            <svg-icon icon="user" />
          </span>
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="username"
          name="username"
          type="text"
          class="input-with-bg"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          placeholder="password"
          :type="passwordType"
          name="password"
          class="input-with-bg"
        />
        <span class="show-pwd">
          <span class="svg-container">
            <svg-icon
              :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
              @click="changePwdType"
            />
          </span>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        size="large"
        style="width: 100%; margin-bottom: 30px"
        @click="handleSubmit"
        :loading="loading"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>
<script setup>
// 导入组件之后无需注册可直接使用
import SvgIcon from '@/components/SvgIcon/index.vue'
import { ref } from 'vue'
import { validatePassword, validateUserName } from './rules'
import { useLogin } from '@/hooks/useLogin'
import { useToken } from '@/hooks/useToken'
import { useTimeStap } from '@/hooks/useTimeStap'
import { ElMessage } from 'element-plus'
import LangSelect from '../../layout/components/LangSelect/index.vue'
import { useRouter } from 'vue-router'
const { loginForm, setLogin } = useLogin()
const { setToken } = useToken()
const passwordType = ref('password')
const { setTimeStamp } = useTimeStap()
const router = useRouter()
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'change',
      validator: validateUserName()
    }
  ],
  password: [
    {
      required: true,
      trigger: 'change',
      validator: validatePassword()
    }
  ]
})
const changePwdType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

const loginFromRef = ref(null)

const loading = ref(false)

const handleSubmit = () => {
  loading.value = true
  loginFromRef.value.validate(async (valid) => {
    if (valid) {
      const { data, message } = await setLogin()
      if (!data) {
        ElMessage.error(message)
        return false
      }
      setToken(data?.token)
      setTimeStamp()
      router.push('/')
    } else {
      console.log('error submit!!')
      return false
    }
  })
  loading.value = false
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input__wrapper {
      border: none;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      box-shadow: none;
      background: transparent;
    }

    ::v-deep .el-input {
      height: auto !important;
    }

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }

    ::v-deep .el-input {
      display: inline-block;
      // height: 47px;
      width: 85%;
      outline: none;
      input {
        background: transparent;
        border: 0px !important;
        -webkit-appearance: none;
        outline: 0;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        // height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
