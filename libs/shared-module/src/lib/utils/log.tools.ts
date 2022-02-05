function cons(method: string, from: string, message: string, ...optionalParams: any[]) {
    const date = new Date()
    ;(console as any)[method](
        `(${date.getHours()}:${date.getMinutes()}::${date.getSeconds()}) [${from}] ${message}`,
        ...optionalParams,
    )
}

export class Log {
    static debug(from: string, message: string, ...optionalParams: any[]) {
        cons('debug', from, message, ...optionalParams)
    }

    static info(from: string, message: string, ...args: any[]): void {
        cons('log', from, message, ...args)
    }

    static warn(from: string, message: string, ...args: any[]): void {
        cons('warn', from, message, ...args)
    }

    static error(from: string, message: string, ...args: any[]): void {
        cons('error', from, message, ...args)
    }
}
