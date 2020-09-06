<template>
  <v-container fluid class="mt-12">
    <v-row style="height: 100%">
      <v-col :cols="getDeviceType==='touch'?'12':'2'" v-if="isAuthentichated">
        <v-row no-gutters>
          <v-col
            :cols="getDeviceType==='touch'?'2':'12'"
            v-for="(item, key) in items"
            :key="key"
            class="overviewPanel"
          >
            <v-card
              color="#07347c"
              :height="getDeviceType==='touch'?'50':'150px'"
              :width="getDeviceType==='touch'?'50':'250px'"
              class="mb-2 d-flex justify-center text-center agent-panel"
              :style="getDeviceType==='touch'?'flex-direction: row':'flex-direction: column'"
              @click="call(item.link)"
            >
              <!-- <svgicon style="margin: auto" :icon="item.icon" width="40" height="40" class="svg"></svgicon> -->
              <v-icon style="margin: auto" color="white" class="svg">{{item.icon}}</v-icon>
              <span v-if="getDeviceType!='touch'" class="pt-2 pb-3 agent-panel-text">{{item.name}}</span>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex justify-center text-center">
        <v-container :fluid="getDeviceType==='touch'">
          <h2>Pregled</h2>
          <v-divider></v-divider>
          <navigation :view="view" v-on:changeView="changeView"></navigation>

          <div v-if="view===0">
            <nastavni-plan></nastavni-plan>
          </div>
          <div v-if="view===1" class="d-flex" style="flex-direction: row">
            <v-row no-gutters>
              <v-col
                cols="3"
                class="pt-5"
                v-for="(prof, index) in professors"
                :key="index"
                v-if="getDeviceType!= 'touch'"
              >
                <user-card :professor="prof"></user-card>
              </v-col>
              <v-col cols="12" v-else>
                <v-card class="mt-2 mb-2">
                <v-list-item>
                  <v-list-item-avatar>
                    <v-avatar color="indigo" size="300">
                      <span class="white--text">{{prof.initials}}</span>
                    </v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="prof.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div v-if="view===2">
            <v-container>
              <v-data-table
                hide-default-footer
                :items-per-page="-1"
                :items="faculties"
                :headers="facultyHeaders"
              ></v-data-table>
            </v-container>
          </div>
          <div v-if="view===3">
            <v-data-table
              hide-default-footer
              :items-per-page="-1"
              :items="studies"
              :headers="studiesHeaders"
            ></v-data-table>
          </div>
          <div v-if="view===4">
            <v-data-table
              hide-default-footer
              :items-per-page="-1"
              :items="subjects"
              :headers="subjectsHeaders"
            ></v-data-table>
          </div>
        </v-container>
      </v-col>
    </v-row>
    <v-dialog v-model="newUserDialog" max-width="600px">
      <user-dialog v-on:closeDialog="newUserDialog=false"></user-dialog>
    </v-dialog>
    <v-dialog v-model="newFaculty" max-width="600px">
      <faculty-dialog v-on:closeDialog="newFaculty = false"></faculty-dialog>
    </v-dialog>
    <v-dialog v-model="newStudy" max-width="600px">
      <studies-dialog v-on:closeDialog="newStudy = false"></studies-dialog>
    </v-dialog>
    <v-dialog v-model="newSubject" max-width="600px">
      <subject-dialog v-on:closeDialog="newSubject = false"></subject-dialog>
    </v-dialog>
    <v-dialog v-model="newCurriculum">
      <v-toolbar color="#a2c4fc ">
        Kreirajte novi nastavni plan
        <v-spacer></v-spacer>
        <v-btn @click="newCurriculum = false" fab icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <curriculum v-on:closeDialog="newCurriculum = false"></curriculum>
    </v-dialog>
  </v-container>
</template>
<script>
import UserDialog from "./modals/addUSerDialog";
import FacultyDialog from "./modals/addFaculty";
import StudiesDialog from "./modals/addStudies";
import SubjectDialog from "./modals/addSubject";
import UserCard from "./modules/personCard";
import Curriculum from "./modals/createNewCurriculum";
import Navigation from "./navigation/AppNavigation";
import NastavniPlan from "./modules/NastavniPlan";
import data from "./data/data";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    UserDialog,
    FacultyDialog,
    StudiesDialog,
    SubjectDialog,
    Navigation,
    UserCard,
    Curriculum,
    NastavniPlan,
  },
  computed: {
    ...mapState(["professors", "faculties", "studies", "subjects"]),
    ...mapGetters(["isAuthentichated", "getDeviceType"]),
    items() {
      return data.menuItems;
    },
    facultyHeaders() {
      return data.facultyHeaders;
    },
    studiesHeaders() {
      return data.studiesHeaders;
    },
    subjectsHeaders() {
      return data.subjectsHeaders;
    },
  },
  data() {
    return {
      newUserDialog: false,
      newFaculty: false,
      newStudy: false,
      newSubject: false,
      newCurriculum: false,
      view: 0,
    };
  },
  methods: {
    call: function (link) {
      if (link === "addNewUser") {
        this.addNewUser();
      }
      if (link === "addFaculty") {
        this.newFaculty = true;
      }
      if (link === "addNewStudy") {
        this.newStudy = true;
      }
      if (link === "addNewSubject") {
        this.newSubject = true;
      }
      if (link === "newCurriculum") {
        this.newCurriculum = true;
      }
    },
    addNewUser: function () {
      this.newUserDialog = true;
    },
    changeView: function (value) {
      this.view = value;
    },
    closeModal: function () {
      this.newCurriculum = false;
    },
  },
  async created() {
    await this.$store.dispatch("getUserTypes");
    await this.$store.dispatch("getFaculties");
    await this.$store.dispatch("getProfessors");
    await this.$store.dispatch("getStudies");
    await this.$store.dispatch("getSubjects");
  },
};
</script>
<style lang="scss">
.overviewPanel > .agent-panel:hover {
  background-color: #a2c4fc !important;
  cursor: pointer;
}

.overviewPanel > .agent-panel > .agent-panel-text {
  color: white;
  text-transform: uppercase;
  font-size: 14px;
}

.overviewPanel > .agent-panel > .svg {
  color: transparent;
  fill: white;
}

.overviewPanel > .agent-panel:hover > .svg {
  color: transparent;
  fill: black;
}

.overviewPanel > .agent-panel:hover > .agent-panel-text {
  color: black;
}
</style>