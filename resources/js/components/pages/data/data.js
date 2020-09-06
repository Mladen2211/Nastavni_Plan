export default {
    menuItems: [
        {
            tab: 0,
            name: "Kreiraj novi nastavni plan",
            icon: "mdi-table-large-plus",
            link: "newCurriculum"
        },
        {
            tab: 1,
            name: "Dodaj studij",
            icon: "mdi-teach",
            link: "addNewStudy"
        },
        {
            tab: 2,
            name: "Dodaj fakultet",
            icon: "mdi-bank-plus",
            link: "addFaculty"
        },
        {
            tab: 3,
            name: "Dodaj predmet",
            icon: "mdi-book-open-page-variant",
            link: "addNewSubject"
        },
        {
            tab: 4,
            name: "Dodaj korisnika",
            icon: "mdi-account-plus-outline",
            link: "addNewUser"
        }
    ],
    facultyHeaders: [
        {
            text: '#',
            align: 'start',
            value: 'id'
        },
        {
            text: 'Naziv fakulteta',
            align: 'start',
            value: 'name'
        },
    ],
    studiesHeaders: [
        {
            text: '#',
            align: 'start',
            value: 'id'
        },
        {
            text: 'Naziv studija',
            align: 'start',
            value: 'name'
        },
        {
            text: 'Naziv fakulteta',
            align: 'start',
            value: 'faculty_name'
        }
    ],
    subjectsHeaders: [
        {
            text: '#',
            align: 'start',
            value: 'id'
        },
        {
            text: 'Naziv predmeta',
            align: 'start',
            value: 'name'
        },
        {
            text: 'Ime profesorea',
            align: 'start',
            value: 'professor_first_name'
        },
        {
            text: 'Prezime profesorea',
            align: 'start',
            value: 'professor_last_name'
        },
        {
            text: 'Naziv studija',
            align: 'start',
            value: 'study_name'
        }
    ],
    curriculumHeaders: [
        {
            text: '#',
            align: 'start',
            value: 'id'
        },
        {
            text: 'Naziv predmeta',
            align: 'start',
            value: 'subject_name'
        },
        {
            text: 'Ime profesorea',
            align: 'start',
            value: 'professor_first_name'
        },
        {
            text: 'Prezime profesorea',
            align: 'start',
            value: 'professor_last_name'
        },
        {
            text: 'V',
            align: 'center',
            value: 'hours_of_exercises'
        },
        {
            text: 'P',
            align: 'center',
            value: 'hours_of_lectures'
        },
        {
            text: 'S',
            align: 'center',
            value: 'hours_of_seminars'
        },
        {
            text: 'ECTS',
            align: 'center',
            value: 'ects'
        },
        {
            text: '',
            value: 'actions',
            sortable: false
        },
    ]
}