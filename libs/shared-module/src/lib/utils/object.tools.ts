export function shallowCopy<T>(obj: T): T {
    return { ...obj }
}

export function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
}

export function isEmpty<T>(obj: T): boolean {
    return Object.keys(obj).length === 0
}

export interface Omit2 {
    <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
        [K2 in Exclude<keyof T, K[number]>]: T[K2]
    }
}

export const omit: Omit2 = (obj, ...keys) => {
    const result = {} as {
        [K in keyof typeof obj]: typeof obj[K]
    }
    let key: keyof typeof obj
    for (key in obj) {
        if (!keys.includes(key)) {
            result[key] = obj[key]
        }
    }
    return result
}
