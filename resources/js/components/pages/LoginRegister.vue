<template>
  <v-container id="signinup-form" fluid class="fill-height pa-0 ma-0">
    <!-- <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" sm="8" md="8" class="">
        <v-card class="evelation-5 card">
          <v-window v-model="step">

    <v-window-item :value="1">-->
    <v-row class="pa-0 ma-0" style="height: 100%; width: 100%" no-gutters>
      <v-col cols="12" md="8" :class="`${bgColor} picture` "></v-col>
      <v-col cols="12" md="4" class="darken-2 d-flex justify-center align-center">
        <v-card-text class="d-flex justify-center align-center">
          <v-form class="signup-form-form" @submit.prevent="signin">
            <img src="./logo.png" alt="SUM" class="logo" />
            <h1 class="text-center display-1 mb-10" :class="`${bgColor}--text`">Prijava</h1>
            <v-text-field
              id="email"
              v-model="user.email"
              label="eMail"
              name="email"
              :class="`${bgColor}--text`"
              append-icon="mdi-email"
              type="email"
              :color="bgColor"
            />
            <v-text-field
              id="password"
              v-model="user.password"
              label="Šifra"
              name="Password"
              :class="`${bgColor}--text`"
              append-icon="mdi-lock"
              type="password"
              :color="bgColor"
            />
            <div class="text-center mt-6">
              <v-btn type="submit" large color="white" dark>
                <p class="mt-3" style="color: blue">Prijava</p>
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-col>
    </v-row>
    <!-- </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>-->
  </v-container>
</template>
<script>
// isAuthentichated
export default {
  name: "Signupform",
  props: {
    source: {
      type: String,
      default: "",
    },
    bgColor: {
      type: String,
      default: "indigo",
    },
    fgColor: {
      type: String,
      default: "white",
    },
  },
  data: () => ({
    step: 1,
    user: {
      email: "",
      password: "",
    },
    newUser: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  }),
  methods: {
    register() {},
    async signin() {
      if (this.user.email != "" && this.user.password != "") {
        this.$store.dispatch("login", this.user);
      } else {
        console.error("NO!");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.picture {
  background-image: url(./fpmoz3.jpg);
  background-size: cover;
}
.logo {
  max-height: 75px;
  max-width: 100%;
  height: auto;
}
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