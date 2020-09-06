<template>
  <v-card>
    <v-card-title>
      <span class="headline">Dodaj predmet</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field label="Predmet" v-model="newSubject.name" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-autocomplete
              v-model="selectedStudy"
              :items="studies"
              dense
              item-value="id"
              item-text="name"
              label="Smjer"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-autocomplete
              v-model="selectedProfessor"
              :items="professors"
              dense
              item-value="id"
              item-text="name"
              label="Profesor"
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
    ...mapState(["studies", "professors"]),
  },
  data() {
    return {
        selectedStudy:null,
      selectedProfessor:null,
      newSubject: {
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
      Object.assign(this.newSubject, { studyId: this.selectedStudy, professorId: this.selectedProfessor});
      await this.$store.dispatch("newSubject", this.newSubject).then((res) => {
        this.closeDialog();
      });
    },
  },
  created() {},
};
</script>