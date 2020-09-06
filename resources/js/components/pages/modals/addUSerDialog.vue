<template>
  <v-card>
    <v-card-title>
      <span class="headline">User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field label="Ime" v-model="newUser.firstName" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              label="Prezime"
              v-model="newUser.lastName"
              hint="example of helper text only on focus"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Šifra" v-model="newUser.password" type="password" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="e-Mail" v-model="newUser.email" type="email" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="selectedType"
              :items="userTypes"
              dense
              item-value="id"
              item-text="name"
              label="Vrsta korisnika"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
      <v-btn color="blue darken-1" text @click="createNewUser">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["userTypes"]),
  },
  data() {
    return {
      selectedType: null,
      newUser: {
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        userType: 1,
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
      this.selectedType = null;
      this.newUser = {
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        userType: 1,
      };
    },
    async createNewUser() {
      Object.assign(this.newUser, { userType: this.selectedType });
      await this.$store.dispatch("createUser", this.newUser).then((res) => {
        this.closeDialog();
      });
    },
  },
  created() {},
};
</script>