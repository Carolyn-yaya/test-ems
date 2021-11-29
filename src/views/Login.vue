<template>
  <div class="login">
    <div class="login-container">
      <a-row>
        <a-col :span="14">col-12</a-col>
        <a-col class="form-col" :span="10">
          <div class="login-form">
            <a-form layout="vertical" :model="loginForm" @finish="handleFinish">
              <a-form-item label="账号" name="username">
                <a-input v-model:value="loginForm.username" placehodler="请输入账号">
                  <template #prefix>
                    <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item label="密码" name="password">
                <a-input v-model:value="loginForm.password" type="password" placehodler="请输入密码">
                  <template #prefix>
                    <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-checkbox v-model:checked="checked">记住账号</a-checkbox>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit" :loading="loading">登 录</a-button>
              </a-form-item>
            </a-form>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const router = useRouter()
    const { dispatch } = useStore()
    const loginForm = reactive({
      username: 'iems',
      password: '123456'
    })
    const checked = ref(false)
    const loading = ref(false)

    onMounted(() => {
      getCookie()
    })

    const handleFinish = async values => {
      console.log(values)
      loading.value = true
      if (checked.value) {
        setCookie(values.username, 7)
      }
      const params = {
        username: values.username,
        password: values.password
      }
      await dispatch('user/systemLogin', params)
      loading.value = false
      router.push('/dashboard')
    }

    const setCookie = (username, exdays) => {
      var exdate = new Date() // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
      // 字符串拼接cookie
      window.document.cookie = `username=${username};path=/;expires='${exdate.toGMTString()}`
    }
    const getCookie = () => {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ')
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=')
          // 判断查找相对应的值
          if (arr2[0] === 'username') {
            loginForm.username = arr2[1]
          }
        }
      }
    }

    return {
      loginForm,
      checked,
      loading,
      handleFinish,
      setCookie,
      getCookie
    }
  },
  components: { UserOutlined, LockOutlined }
})
</script>

<style lang="less">
.login {
  height: 100vh;
  background: #007639;
  padding: 90px 120px;
  overflow: hidden;
  .login-container {
    background: #ffffff;
    box-shadow: 0px 2px 29px 0px rgba(0, 0, 0, 0.29);
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
  .form-col {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-form {
    width: 80%;
  }
  .ant-row,
  .ant-col {
    height: 100%;
  }
  .ant-input-affix-wrapper {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    border: 0;
    .ant-input {
      line-height: 2.5;
    }
  }
  .ant-checkbox-inner {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    border-color: transparent;
  }
  .ant-btn {
    width: 100%;
    height: 42px;
    box-shadow: 0px 0px 21px 0px rgba(0, 118, 57, 0.26);
    border-radius: 4px;
  }
  .ant-form-item-label > label,
  .ant-checkbox-wrapper {
    color: #999999;
    font-weight: 400;
    font-size: 16px;
  }
}
</style>
