export interface IGraphQLResult<T> {
    data?: T & { __typename?: string }
    loading: boolean
    networkStatus: number
}
