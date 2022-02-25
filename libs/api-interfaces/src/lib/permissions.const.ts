import { IUser } from './user.interface'
import { IRole } from './role.interface'

export const ABILITIES = {
    BROWSE: 'browse',
    READ: 'read',
    EDIT: 'edit',
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
export const check = (user: IUser, permission: { resource: string; ability: string }) => {
    if (!user?.roles?.length) return false
    const permissions = user.roles.map((role) => (role as IRole).permissions).flat()
    return permissions.length
        ? !!(
              permissions.includes('*::*') ||
              permissions.includes(`*::${permission.resource}`) ||
              permissions.includes(`${permission.ability}::*`) ||
              permissions.includes(`${permission.ability}::${permission.resource}`)
          )
        : false
}
