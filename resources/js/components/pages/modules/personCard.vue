<template>
  <v-card width="300px" height="400px" elevation="5" color="#a2c4fc">
    <div class="header">
      <v-card-title class="d-flex justify-center align-center space-between">
        <v-avatar color="indigo" size="98" class="mb-n10">
          <span class="white--text headline">{{professor.initials}}</span>
        </v-avatar>
      </v-card-title>
    </div>
    <v-card-text class="pt-10">
      <h2>{{professor.name}}</h2>
      <div class="text-left">
        <h4>Predmeti</h4>
        <div v-for="(subject, i) in professorsSubjects" :key="i">
          <li>{{subject.name}}</li>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: ["professor"],
  computed: {
    ...mapState(["subjects"]),
    professorsSubjects() {
      return this.subjects.filter((s) => this.professor.id === s.user_id);
    },
  },
};
</script>
<style lang="scss">
.header {
  background-image: url(./fpmoz.jpg);
  background-size: cover;
}
</style>