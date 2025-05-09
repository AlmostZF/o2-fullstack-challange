import { ApiResponse } from "./response_status_codes.model";

export enum response_status_codes {
    success = 200,
    bad_request = 400,
    unauthorized = 401,
    internal_server_error = 500,
    created = 201,
}

export function formatResponse<T>(
    data: T,
    message: string = "Success",
    status: number = response_status_codes.success
): ApiResponse<T> {
    return {
        status,
        success: true,
        message,
        data,
    };
}

export function formatError(
    message: string,
    error: any = null,
    status: number = response_status_codes.internal_server_error
): ApiResponse<null> {
    return {
        status,
        success: false,
        message,
        error,
    };
}