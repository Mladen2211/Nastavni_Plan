import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        notification: {
            nada: 'none',
            text: '',
            visible: false,
            color: ''
        },
        windowWidth: window.innerWidth,
        user: {},
        userTypes: [],
        faculties: [],
        professors: [],
        studies: [],
        subjects: [],
        curriculum: []
    },
    getters: {
        isAuthentichated(state) {
            if (Object.keys(state.user).length > 0) {
                return true
            } else {
                return false
            }
        },
        getDeviceType(state) {
            if (state.windowWidth < 1264) {
                return 'touch'
            } else {
                return 'desktop'
            }
        },
        getPhoneOrientation(state, getters) {
            if (getters.getDeviceType === 'touch' && window.innerWidth > window.innerHeight) {
                return 'landscape'
            } else if (getters.getDeviceType === 'touch' && window.innerWidth < window.innerHeight) {
                return 'portrait'
            }
        },

    },

    mutations: {
        SET_WINDOW_WIDTH(state, width) {
            state.windowWidth = width
        },
        SET_NOTIFICATION(state, notification) {
            state.notification.text = notification.text
            state.notification.color = notification.color
            state.notification.visible = notification.visible
        },
        SET_USER(state, user) {
            state.user = user
        },
        SET_USER_TYPES(state, userTypes) {
            state.userTypes = userTypes
        },
        SET_FACUTIES(state, faculties) {
            state.faculties = faculties
        },
        SET_PROFESSORS(state, professors) {
            state.professors = professors
        },
        SET_STUDIES(state, studies) {
            state.studies = studies
        },
        SET_SUBJECTS(state, subjects) {
            state.subjects = subjects
        },
        ADD_CURRICULUM(state, curriculum) {
            state.curriculum.push(curriculum)
        },
        SET_CURRICULUM(state, curriculum) {
            state.curriculum = curriculum
        },
        SET_UPDATED_CURRICULUM(state, updatedCurriculum) {
            let update = state.curriculum.find(curr => curr.id === updatedCurriculum.id)
            let index = state.curriculum.indexOf(update)
            if (index >= 0) {
                state.curriculum[index].hours_of_exercises = updatedCurriculum.hours_of_exercises
                state.curriculum[index].hours_of_lectures = updatedCurriculum.hours_of_lectures
                state.curriculum[index].hours_of_seminars = updatedCurriculum.hours_of_seminars
            }
        }




    },
    actions: {
        setWindowWidth(context, width) {
            context.commit('SET_WINDOW_WIDTH', window.innerWidth)
        },
        createUser: async function (context, user) {
            await axios.post('createUser', user).then(response => {
                if (response?.status === 201) {
                    context.commit('SET_NOTIFICATION', {
                        text: 'Korisnik uspiješno kreiran',
                        color: 'success',
                        visible: true
                    })
                } else {
                    context.commit('SET_NOTIFICATION', {
                        text: 'Postoji korisnik sa unesenim podatcima',
                        color: 'error',
                        visible: true
                    })
                }
            })

        },
        setNotification: function (context) {
            context.commit('SET_NOTIFICATION', {
                text: 'Unos sadrži podatke koji se već nalaze u bazi',
                color: 'error',
                visible: true
            })
        },
        login: async function (context, user) {
            await axios.post('loginUser', user).then(res => {
                if (res.data.status === 200) {
                    context.commit('SET_USER', res.data.user)
                    if (res.data.user.user_type_id === 1) {
                        router.push('/admin')
                    } else if (res.data.user.user_type_id === 2) {
                        router.push('/user')
                    }
                } else {
                    context.commit('SET_NOTIFICATION', {
                        text: res.data.msg,
                        color: 'error',
                        visible: true
                    })
                }
            })
        },

        logout: async function (context) {
            await axios.get('logout').then(res => {
                if (res.status === 200) {
                    context.commit('SET_USER', [])
                    router.push('/')
                }
            })
        },

        getUserTypes: async function (context) {
            await axios.get('getUserType').then(res => {
                context.commit('SET_USER_TYPES', res.data)
            })
        },
        createNewFaculty: async function (context, facultyName) {
            await axios.post('createFaculty', { name: facultyName }).then(res => {
                if (res.status === 201) {
                    context.commit('SET_NOTIFICATION', {
                        text: 'Fakultet uspješno kreiran',
                        color: 'success',
                        visible: true
                    })
                } else {
                    context.commit('SET_NOTIFICATION', {
                        text: res.data.msg,
                        color: 'error',
                        visible: true
                    })
                }
                return res.status
            })
        },
        getFaculties: async function (context) {
            await axios.get('getFaculties').then(res => {
                if (res.status === 200) {
                    context.commit('SET_FACUTIES', res.data)
                } else {
                    context.commit('SET_NOTIFICATION', {
                        text: res.data.msg,
                        color: 'error',
                        visible: true
                    })
                }
            })
        },
        newStudies: async function (context, newStudy) {
            await axios.post('createStudies', newStudy).then(res => {
                if (res.status === 201) {
                    context.commit('SET_NOTIFICATION', {
                        text: 'Studij uspješno kreiran',
                        color: 'success',
                        visible: true
                    })
                } else {
                    context.commit('SET_NOTIFICATION', {
                        text: res.data.msg,
                        color: 'error',
                        visible: true
                    })
                }
                return res.status
            })
        },
        getProfessors: async function (context) {
            await axios.get('getProfessors').then(res => {
                if (res.status === 200) {
                    let professors = []
                    res.data.forEach(prof => {
                        professors.push({
                            id: prof.id,
                            name: prof.first_name + ' ' + prof.last_name,
                            initials: prof.first_name.substr(0, 1) + '' + prof.last_name.substr(0, 1)
                        })
                    });
                    context.commit('SET_PROFESSORS', professors)
                } else {
                    context.commit('SET_NOTIFICATION', {
                        text: res.data.msg,
                        color: 'error',
                        visible: true
                    })
                }
            })
        },
        getStudies: async function (context) {
            await axios.get('getStudies').then(res => {
                if (res.status === 200) {
                    context.commit('SET_STUDIES', res.data)
                } else {
                    context.commit('SET_NOTIFICATION', {
                        text: res.data.msg,
                        color: 'error',
                        visible: true
                    })
                }
            })
        },
        newSubject: async function (context, newSubject) {
            await axios.post('createSubject', newSubject).then(res => {
                if (res.status === 201) {
                    context.commit('SET_NOTIFICATION', {
                        text: 'Predmet uspješno kreiran',
                        color: 'success',
                        visible: true
                    })
                } else {
                    context.commit('SET_NOTIFICATION', {
                        text: res.data.msg,
                        color: 'error',
                        visible: true
                    })
                }
                return res.status
            })
        },
        getSubjects: async function (context) {
            await axios.get('getSubjects').then(res => {
                if (res.status === 200) {
                    context.commit('SET_SUBJECTS', res.data)
                } else {
                    context.commit('SET_NOTIFICATION', {
                        text: res.data.msg,
                        color: 'error',
                        visible: true
                    })
                }
            })
        },
        createNewCurriculum: async function (context, curriculum) {
            let newCurriculum = []
            curriculum.forEach(cs => {
                newCurriculum.push({
                    user_id: parseInt(cs.subject.user_id),
                    subject_id: parseInt(cs.subject.id),
                    semester: parseInt(cs.semester),
                    study_id: parseInt(cs.study.id),
                    faculty_id: parseInt(cs.faculty.id),
                    academic_year: cs.academic_year,
                    hours_of_lectures: parseInt(cs.hours_of_lectures),
                    hours_of_exercises: parseInt(cs.hours_of_exercises),
                    hours_of_seminars: parseInt(cs.hours_of_seminars),
                    ects: parseInt(cs.ects)
                })
            })


            await axios.post('createNewCurriculum', newCurriculum).then(res => {
                if (res.status === 200) {
                    context.commit('ADD_CURRICULUM', res.data)
                } else {
                    context.commit('SET_NOTIFICATION', {
                        text: res.data.msg,
                        color: 'error',
                        visible: true
                    })
                }
                return res.status
            })

        },
        getCurriculum: async function (context) {
            axios.get('getCurriculum').then(res => {
                if (res.status === 200) {
                    context.commit('SET_CURRICULUM', res.data)

                } else {
                    context.commit('SET_NOTIFICATION', {
                        text: res.data.msg,
                        color: 'error',
                        visible: true
                    })

                }
            })
        },
        editCurriculumLine: async function (context, curriculumLine) {
            axios.post('editCurriculumLine', curriculumLine).then(res => {
                if (res.status === 200) {
                    context.commit('SET_UPDATED_CURRICULUM', curriculumLine)
                    context.commit('SET_NOTIFICATION', {
                        text: 'Uspiješno uređeno',
                        color: 'success',
                        visible: true
                    })
                } else {
                    context.commit('SET_NOTIFICATION', {
                        text: res.data.msg,
                        color: 'error',
                        visible: true
                    })
                }
            })
        },
        deleteCurriculum: async function (context, curriculum) {
            axios.post('deleteCurriculum', curriculum).then(res => {
                if (res.status === 200) {
                    context.commit('SET_NOTIFICATION', {
                        text: 'Uspiješno izbrisani podatci',
                        color: 'success',
                        visible: true
                    })
                } else {
                    context.commit('SET_NOTIFICATION', {
                        text: res.data.msg,
                        color: 'error',
                        visible: true
                    })
                }

                return res.status
            })
        }
    }


})
