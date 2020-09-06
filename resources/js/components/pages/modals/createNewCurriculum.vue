<template>
  <v-container style="background-color: white">
    <v-row>
      <v-col :cols="getDeviceType==='touch'?12:5">
        <v-select
          :items="faculties"
          item-text="name"
          label="Fakultet"
          return-object
          v-model="selectedFaculty"
        ></v-select>
      </v-col>
      <v-col :cols="getDeviceType==='touch'?12:3">
        <v-select
          :disabled="!selectedFaculty"
          :items="selectableStudies"
          item-text="name"
          label="Studij"
          return-object
          v-model="selectedStudy"
        ></v-select>
      </v-col>
      <v-col :cols="getDeviceType==='touch'?6:2">
        <v-select :items="semester" label="Semestar" v-model="selectedSemester"></v-select>
      </v-col>
      <v-col :cols="getDeviceType==='touch'?6:2">
        <v-select :items="selecteableYears" label="Godina" v-model="selectedAcademicYear"></v-select>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-col :cols="getDeviceType==='touch'?12:4">
        <v-select
          :items="selectableSubjects"
          :disabled="!selectedStudy"
          item-text="name"
          label="Predmet"
          return-object
          v-model="selectedSubject"
        ></v-select>
      </v-col>
      <v-col :cols="getDeviceType==='touch'?3:2">
        <v-text-field label="Broj vježbi" type="number" v-model="hoursOfExercise"></v-text-field>
      </v-col>
      <v-col :cols="getDeviceType==='touch'?3:2">
        <v-text-field label="Broj seminara" type="number" v-model="hoursOfSeminars"></v-text-field>
      </v-col>
      <v-col :cols="getDeviceType==='touch'?3:2">
        <v-text-field label="Broj predavanja" type="number" v-model="hoursOfLectures"></v-text-field>
      </v-col>
      <v-col :cols="getDeviceType==='touch'?3:1">
        <v-select :items="ectsSelect" label="ECTS" v-model="ECTS"></v-select>
      </v-col>
      <v-col :cols="getDeviceType==='touch'?12:1" class="d-flex justify-center align-center">
        <v-btn :disabled="totalECTS>=30" @click="add" tile large color="#a2c4fc" icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="(curr, i) in curriculum">
        <v-card class="d-flex align-center" :style="hetDeviceType==='touch'?'flex-orientation: column':'flex-orientation: row'">
          <p>{{curr.subject.name}}</p>
          <v-spacer></v-spacer>
          <p v-if="getDeviceType!='touch'">{{curr.faculty.name}}</p>
          <v-spacer></v-spacer>
          <p v-if="getDeviceType!='touch'">{{curr.subject.professor_first_name}} {{curr.subject.professor_last_name}}</p>
          <v-spacer></v-spacer>
          <p>{{curr.hours_of_exercises}}</p>
          <v-spacer></v-spacer>
          <p>{{curr.hours_of_seminars}}</p>
          <v-spacer></v-spacer>
          <p>{{curr.hours_of_lectures}}</p>
          <v-spacer></v-spacer>
          <p>{{curr.ects}}</p>
          <v-spacer></v-spacer>
          <v-btn @click="remmoveLine(curr)" color="#a2c4fc" fab small icon>
              <v-icon>mdi-close</v-icon>
          </icon></v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-end align-end">
        <v-btn :disabled="totalECTS!=30" @click="createCurriculum" color="#a2c4fc">Kreiraj nastavni plan</v-btn>
      </v-col>
    </v-row>
    <v-alert type="error" v-if="totalECTS>30">
      Broj bodova po semestru iznosi maksimalno 30! Trenutni broj bodova {{totalECTS}}, molimo promjenite bodove!
    </v-alert>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["faculties", "studies", "subjects"]),
    ...mapGetters(["getDeviceType"]),
    selecteableYears() {
      let years = [];
      for (var i = 0; i <= 10; i++) {
        years.push(this.$moment().add(i, "years").format("YYYY"));
      }
      return years;
    },
    selectableStudies() {
      if (this.selectedFaculty) {
        return this.studies.filter(
          (st) => st.faculty_id === this.selectedFaculty.id
        );
      } else {
        return this.studies;
      }
    },
    selectableSubjects() {
      if (this.selectedStudy) {
        return this.subjects.filter(
          (s) => s.study_id === this.selectedStudy.id
        );
      } else {
        return this.subjects;
      }
    },
    totalECTS() {
      let total = 0;
      this.curriculum.forEach((c) => {
        total += parseInt(c.ects);
      });
      return total;
    },
  },
  data: () => ({
    semester: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    ectsSelect: ["1", "2", "3", "4", "5", "6", "7", "8"],
    selectedFaculty: null,
    selectedStudy: null,
    selectedSemester: null,
    selectedAcademicYear: null,
    selectedSubject: null,
    hoursOfExercise: null,
    hoursOfSeminars: null,
    hoursOfLectures: null,
    ECTS: null,
    curriculum: [],
  }),
  methods: {
    add() {
      this.curriculum.push({
        faculty: this.selectedFaculty,
        study: this.selectedStudy,
        semester: this.selectedSemester,
        academic_year: this.selectedAcademicYear,
        subject: this.selectedSubject,
        hours_of_exercises: this.hoursOfExercise,
        hours_of_seminars: this.hoursOfSeminars,
        hours_of_lectures: this.hoursOfLectures,
        ects: this.ECTS,
      });
      this.selectedSubject = null;
      this.hoursOfExercise = null;
      this.hoursOfSeminars = null;
      this.hoursOfLectures = null;
      this.ECTS = null;
    },
    closeDialog(){
        this.$emit('closeDialog')
    },
    remmoveLine(line){
        let index = this.curriculum.indexOf(line)
        if(index>=0){
            this.curriculum.splice(index, 1);
        }
    },
    async createCurriculum() {
        await this.$store.dispatch('createNewCurriculum', this.curriculum).then(res=> {
            // if(res === 200){
                this.closeDialog()
                this.selectedFaculty =  null
                this.selectedStudy =  null
                this.selectedSemester =  null
                this.selectedAcademicYear =  null
                this.selectedSubject =  null
                this.hoursOfExercise =  null
                this.hoursOfSeminars =  null
                this.hoursOfLectures =  null
                this.ECTS =  null
                this.curriculum =  []
            // }
        })
    },
  },
};
</script>
