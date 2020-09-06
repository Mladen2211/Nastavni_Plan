<template>
  <v-card>
    <v-card-title>
      <span class="headline">Dodaj studij</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field label="Smjer" v-model="newStudy.name" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-autocomplete
              v-model="selectedType"
              :items="faculties"
              dense
              item-value="id"
              item-text="name"
              label="Fakultet"
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
    ...mapState(["faculties"]),
  },
  data() {
    return {
      selectedType: null,
      newStudy: {
        name: "",
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
      this.selectedType = null;
      this.newStudy = {
        name: "",
      };
    },
    async createNewUser() {
      Object.assign(this.newStudy, { facultyId: this.selectedType });
      await this.$store.dispatch("newStudies", this.newStudy).then((res) => {
        this.closeDialog();
      });
    },
  },
  created() {},
};
</script>