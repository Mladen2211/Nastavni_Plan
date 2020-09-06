<template>
  <v-card :class="getDeviceType!='touch'?'ma-10':'mt-10'" :width="getDeviceType!='touch'?'':'100%'">
    <v-toolbar color="#a2c4fc" v-if="getDeviceType != 'touch'">
      <v-row class="d-flex justify-center align-center">
        <v-col cols="4">
          <v-select
            :items="getavailableFaculties"
            item-text="name"
            item-value="id"
            v-model="selectedFaculty"
            placeholder="Fakultet"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            :disabled="!selectedFaculty"
            :items="getAvailableStudies"
            item-value="id"
            item-text="name"
            v-model="SelectedStudy"
            placeholder="Studij"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
            :disabled="!SelectedStudy"
            :items="getAvailableSemesters"
            v-model="selectedSemester"
            placeholder="Semestar"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
            :disabled="!selectedSemester"
            v-model="selectedAcademicYear"
            :items="getAvailableAcademicYears"
            placeholder="Godina"
          ></v-select>
        </v-col>
        <v-col cols="1" v-if="isAuthentichated">
          <v-btn fab icon :disabled="!selectedAcademicYear" @click="deleteSelectedCurriculum">
            <v-icon class="mr-2" v-if="selectedAcademicYear" color="red">mdi-delete-outline</v-icon>
            <v-icon class="mr-2" v-else color="red">mdi-delete-off-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-expansion-panels v-else>
    <v-expansion-panel>
         <v-expansion-panel-header style="background-color:#a2c4fc ">Odaberi prikaz nastavnog plana</v-expansion-panel-header>
         <v-expansion-panel-content style="background-color:#a2c4fc ">

      <v-row class="d-flex justify-center align-center">
        <v-col cols="12">
          <v-select
            :items="getavailableFaculties"
            item-text="name"
            item-value="id"
            v-model="selectedFaculty"
            placeholder="Fakultet"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-select
            :disabled="!selectedFaculty"
            :items="getAvailableStudies"
            item-value="id"
            item-text="name"
            v-model="SelectedStudy"
            placeholder="Studij"
          ></v-select>
        </v-col>
        <v-col cols="5">
          <v-select
            :disabled="!SelectedStudy"
            :items="getAvailableSemesters"
            v-model="selectedSemester"
            placeholder="Semestar"
          ></v-select>
        </v-col>
        <v-col cols="5">
          <v-select
            :disabled="!selectedSemester"
            v-model="selectedAcademicYear"
            :items="getAvailableAcademicYears"
            placeholder="Godina"
          ></v-select>
        </v-col>
        <v-col cols="2" v-if="isAuthentichated">
          <v-btn fab icon :disabled="!selectedAcademicYear" @click="deleteSelectedCurriculum">
            <v-icon class="mr-2" v-if="selectedAcademicYear" color="red">mdi-delete-outline</v-icon>
            <v-icon class="mr-2" v-else color="red">mdi-delete-off-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    <v-card-text>
      <v-data-table :headers="curriculumHeaders" :items="selectedCurriculumData">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.faculty_name" disabled label="Fakultet"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.study_name" disabled label="Studij"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.subject_name" disabled label="Predmet"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field v-model="editedItem.hours_of_exercises" label="Broj vježbi" type="number"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field v-model="editedItem.hours_of_lectures" label="Broj predavanja" type="number"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field v-model="editedItem.hours_of_seminars" label="Broj seminara" type="number"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field v-model="editedItem.ects" disabled label="ECTS"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Odustani</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Spremi</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }" v-if="isAuthentichated">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import data from "../data/data";

export default {
  computed: {
    ...mapState(["curriculum"]),
        ...mapGetters(['isAuthentichated', 'getDeviceType']),
    curriculumHeaders() {
      return data.curriculumHeaders;
    },
    getavailableFaculties() {
      let faculties = [];
      this.curriculum.forEach((curr) => {
        let faculty = {
          id: curr.faculty_id,
          name: curr.faculty_name,
        };
        if (!faculties.includes(faculty)) {
          faculties.push(faculty);
        }
      });

      return faculties;
    },
    getAvailableStudies() {
      let studies = [];
      if (this.selectedFaculty) {
        this.curriculum.forEach((curr) => {
          if (curr.faculty_id === this.selectedFaculty) {
            let study = {
              id: curr.study_id,
              name: curr.study_name,
            };
            if (!studies.includes(study)) {
              studies.push(study);
            }
          }
        });
        return studies;
      } else {
        return studies;
      }
    },
    getAvailableSemesters() {
      let semesters = [];
      if (this.selectedFaculty && this.SelectedStudy) {
        this.curriculum.forEach((curr) => {
          if (
            curr.faculty_id === this.selectedFaculty &&
            curr.study_id === this.SelectedStudy
          ) {
            if (!semesters.includes(curr.semester)) {
              semesters.push(curr.semester);
            }
          }
        });
      }
      return semesters;
    },
    getAvailableAcademicYears() {
      let years = [];
      if (this.selectedFaculty && this.SelectedStudy && this.selectedSemester) {
        this.curriculum.forEach((curr) => {
          if (
            curr.faculty_id === this.selectedFaculty &&
            curr.study_id === this.SelectedStudy &&
            curr.semester === this.selectedSemester
          ) {
            if (!years.includes(curr.academic_year)) {
              years.push(curr.academic_year);
            }
          }
        });
      }
      return years;
    },
    selectedCurriculumData() {
      let curriculum = [];
      if (
        this.selectedFaculty &&
        this.SelectedStudy &&
        this.selectedSemester &&
        this.selectedAcademicYear
      ) {
        this.curriculum.forEach((curr) => {
          if (
            curr.faculty_id === this.selectedFaculty &&
            curr.study_id === this.SelectedStudy &&
            curr.semester === this.selectedSemester &&
            curr.academic_year === this.selectedAcademicYear
          ) {
            if (!curriculum.includes(curr)) {
              curriculum.push(curr);
            }
          }
        });
      }
      return curriculum;
    },
  },
  data: () => ({
    selectedFaculty: null,
    SelectedStudy: null,
    selectedSemester: null,
    selectedAcademicYear: null,
    dialog: false,
    editedItem: {},
  }),
  methods: {
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.$store.dispatch('editCurriculumLine', this.editedItem);
      this.close();
    },

    async deleteSelectedCurriculum(){
        await this.$store.dispatch('deleteCurriculum', this.selectedCurriculumData).then(res=>{
            if(res === 200){
                this.selectedFaculty = null
                this.SelectedStudy = null
                this.selectedSemester = null
                this.selectedAcademicYear = null
            }
        })
    }
  },
};
</script>
<style scoped lang="scss">
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