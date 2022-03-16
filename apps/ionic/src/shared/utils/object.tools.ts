export function shallowCopy<T>(obj: T): T {
    return { ...obj }
}

export function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
}

export function isEmpty<T>(obj: T): boolean {
    return Object.keys(obj).length === 0
}

export function areEqual<T extends object>(object1: T | undefined, object2: T | undefined): boolean {
    const keys = Object.keys
    const type1 = typeof object1
    const type2 = typeof object2

    return object1 && object2 && type1 === 'object' && type1 === type2
        ? keys(object1).length === keys(object2).length &&
              keys(object1).every((key) => areEqual((object1 as any)[key], (object2 as any)[key]))
        : object1 === object2
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

export function debounce<TRes>(f: () => TRes, interval = 300): Promise<TRes> {
    let timer: NodeJS.Timeout | null = null
    if (timer) clearTimeout(timer)
    return new Promise((resolve) => {
        timer = setTimeout(() => resolve(f()), interval)
    })
}
