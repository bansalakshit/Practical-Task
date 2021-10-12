export interface MessageResponse {
    status: number
    message: string
}

export interface GetTaskInfo {
    id: string
    name: string
    category: number
}
