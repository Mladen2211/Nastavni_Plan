<template>
  <v-app>
    <v-app-bar absolute color="#a2c4fc" elevate-on-scroll height="70px">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Nastavni plan</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn fab icon @click="logout" v-if="isAuthentichated">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn fab icon to="/login" v-else>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container style="padding-top:70px" class="pt-0" fluid>
      <v-snackbar
        v-model="notification.visible"
        timeout="3000"
        top
        right
        :color="notification.color"
      >{{ notification.text }}</v-snackbar>
    </v-container>
    <router-view></router-view>

  </v-app>
</template>
<script>
import UserDialog from "./pages/modals/addUSerDialog";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    UserDialog,
  },
  computed: {
    ...mapState(["notification"]),
    ...mapGetters(["isAuthentichated", "getDeviceType"]),
  },
  data() {
    return {
      newUserDialog: false,
      loggedIn: false,
    };
  },
  methods: {
    addNewUser: function () {
      this.newUserDialog = true;
    },
    logout: function () {
      this.$store.dispatch("logout");
    },
  },
  beforeMount() {
    this.$store.dispatch("getCurriculum");
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.$store.dispatch(
        "setWindowWidth",
        window.innerWidth
      );
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      this.$store.dispatch(
        "setWindowWidth",
        window.innerWidth
      );
    });
  },
};
</script>
<style lang="scss">
.caontainer {
  width: 100% !important;
}

@media (min-width: 1200px) {
  .container-xl,
  .container-lg,
  .container-md,
  .container-sm,
  .container {
    max-width: 100%;
  }
}
@media (min-width: 992px) {
  .container-lg,
  .container-md,
  .container-sm,
  .container {
    max-width: 100%;
  }
}
@media (min-width: 768px) {
  .container-md,
  .container-sm,
  .container {
    max-width: 100%;
  }
}
@media (min-width: 576px) {
  .container-sm,
  .container {
    max-width: 100%;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 100%;
  }
}
@media (min-width: 992px) {
  .container {
    max-width: 100%;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 100%;
  }
}
@media (min-width: 576px) {
  .container {
    max-width: 100%;
  }
}
</style>
