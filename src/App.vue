<template>
  <div class="position-relative header-padding">
    <support-chat></support-chat>
    <confirm-dialog></confirm-dialog>
    <app-header class="w-100 " style="" />
    <div class="h-100" style="min-height:50vh !important">
      <router-view v-slot="{ Component }">
        <transition name="slide">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <app-footer class="w-100 mt-5" />
  </div>
</template>

<script >
import ConfirmDialog from 'primevue/confirmdialog';
import { getProfile } from './services/user';
import SupportChat from './components/SupportChat.vue';

export default {
  name: '',
  components: {
    ConfirmDialog,
    SupportChat
  },
  created() {
    if (this.$store.getters.auth) {
      getProfile()
        // .then((response) => {
          // console.log(response)
          // if (response.errors) {
          //   if (response.token_expired) {
          //     localStorage.removeItem("token")
          //     this.$toast.error("Session expired", "error")
          //     this.$router.push("/login")
          //   }
          // }
        // })
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.bg-secondary {
  --bs-bg-opacity: .5 !important;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.header-padding {
  padding-top: 75px;

  @media(min-width:768px) {
    padding-top: 75px;
  }
}
</style>
