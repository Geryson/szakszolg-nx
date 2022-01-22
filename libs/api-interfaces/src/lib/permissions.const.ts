export const ABILITIES = {
    BROWSE: 'browse',
    READ: 'read',
    EDIT: 'edit',
    UPDATE: 'update',
    DELETE: 'delete',
    PLAY: 'play',
}

export const RESOURCES = {
    USERS: 'users',
    ROLES: 'roles',
    PUZZLES: 'puzzles',
    MIRROR_WORDS: 'mirror-words',
    SCHOOLS: 'schools',
    SCHOOL_CATEGORIES: 'school-categories',
    HANGMAN_WORDS: 'hangman-words',
    GROUPING_WORDS: 'grouping-words',
    SURVEYS: 'surveys',
    SURVEY_QUESTIONS: 'survey-questions',
    SURVEY_QUESTION_CATEGORIES: 'survey-question-categories',
}

export const permission = (resource: string, ability: string) => `${ability}::${resource}`
