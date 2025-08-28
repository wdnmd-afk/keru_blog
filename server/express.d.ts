declare global {
    namespace Express {
        interface Request {
            file?: Multer.File
            requestId?: string
        }
        interface Response {
            sendResponse?(result: any): void
        }
    }
}

export {};
