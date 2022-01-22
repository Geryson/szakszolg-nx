export interface IUpdatedAt {
    updatedAt?: Date
}

export interface ITimestamps extends IUpdatedAt {
    createdAt: Date
    deletedAt?: Date
}
