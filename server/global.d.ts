declare module 'express' {
    interface Response {
        sendResponse(result: any): void;
    }
}