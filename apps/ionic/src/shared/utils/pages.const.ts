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
    },
    guest: {
        _path: 'guest',
        token: 'guest/token',
        ageGate: 'guest/age-gate',
        guestRoom: 'guest/guest-room',
        hangman: 'guest/hangman',
        mirror: 'guest/mirror',
        puzzle: 'guest/puzzle',
        survey: 'guest/survey',
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
