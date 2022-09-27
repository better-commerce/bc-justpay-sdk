import { JuspayException } from './juspay-exception';

export class AuthenticationException extends JuspayException {
    constructor(httpResponseCode: any, status: string, errorCode: string, errorMessage: string) {
        super(httpResponseCode, status, errorCode, errorMessage);
    }

};

