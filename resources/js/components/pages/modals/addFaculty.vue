<template>
  <v-card>
    <v-card-title>
      <span class="headline">Dodaj fakultet</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field label="Naziv fakulteta" v-model="name" required></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
      <v-btn color="blue darken-1" text @click="createNewFaculty">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {},
  data() {
    return {
      name: "",
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
      this.name = ""
    },
    async createNewFaculty() {
      await this.$store.dispatch("createNewFaculty", this.name).then((res) => {
        this.closeDialog()
      })
    },
  },
  created() {},
};
</script>