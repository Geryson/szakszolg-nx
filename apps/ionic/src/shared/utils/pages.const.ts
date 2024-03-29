export const pages = {
    home: 'home',
    admin: {
        _path: 'admin',
        login: 'admin/login',
        logout: 'admin/logout',
        dashboard: 'admin/dashboard',
        users: 'admin/users',
        roles: 'admin/roles',
        profile: 'admin/profile',
        surveysManagement: 'admin/surveys-management',
        mirrorWords: 'admin/mirror-words',
        hangmanWords: 'admin/hangman-words',
        puzzleImages: 'admin/puzzle-images',
        groupingItems: 'admin/grouping-items',
        groupingItems2: 'admin/grouping-items2',
    },
    guest: {
        _path: 'guest',
        token: 'guest/token',
        ageGate: 'guest/age-gate',
        guestRoom: 'guest/guest-room',
        hangman: 'guest/hangman',
        mirrorWords: 'guest/mirror',
        groupingItems: 'guest/grouping-items',
        groupingItems2: 'guest/grouping-items2',
        puzzle: 'guest/puzzle',
        puzzlePicker: 'guest/puzzle-picker',
        schoolFinder: 'guest/school-finder',
    },
    student: {
        _path: 'student',
        enterToken: 'student/enter-token',
        fillSurvey: 'student/fill-survey',
        surveyDetails: 'student/survey-details',
        surveyResults: 'student/survey-results'
    },
}

export function lastPartOf(path: string) {
    return path.split('/').pop()
}

export function firstPartOf(path: string) {
    return path.split('/')[0]
}

export function link(path: string) {
    return `/${path}`
}
