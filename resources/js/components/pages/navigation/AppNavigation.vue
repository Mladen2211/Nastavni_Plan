<template>
  <div style="background-color: #a2c4fc" class="d-flex justify-center align-center mt-10">
    <v-tabs
        v-model="selectedView"
        background-color="transparent"
        :centered="getDeviceType!='touch'"
        hide-slider
      >
        <v-tab
          v-for="(tab, i) in categories"
          :key="i"
          @click="selectedView = tab.id"
        >
          {{ tab.name }}
        </v-tab>
      </v-tabs>
    <!-- <v-btn-toggle v-model="selectedView" tile color="white" group>
      <v-btn class="mt-0 mb-0 pt-0 pb-0" v-for="(tab, i) in categories" :key="i" :value="tab.id">{{tab.name}}</v-btn>
    </v-btn-toggle> -->
  </div>
</template>

<script>
import {  mapGetters } from "vuex";

// Utilities
export default {
  name: "AppLinks",
  props:['view'],
  computed:{
    ...mapGetters(['getDeviceType']),

  },
  data: () => ({
    showTabs: false,
    categories: [
      {
        id: 0,
        name: "Nastavni Plan",
        action: "curriculum",
      },
      {
        id: 1,
        name: "Profesori",
        action: "professors",
      },
      {
        id: 2,
        name: "Fakulteti",
        action: "faculties",
      },
      {
        id: 3,
        name: "Studiji",
        action: "studies",
      },
      {
        id: 4,
        name: "Predmeti",
        action: "subjects",
      },
    ],
  }),

  computed: {
    selectedView:{
      set(value){
        this.$emit('changeView', value)
      },
      get(){
        return this.view
      }
    }
  },
};
</script>
