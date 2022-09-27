import { JuspayException } from '../generic/juspay-exception';

export class APIException extends JuspayException {
    constructor(httpResponseCode: any, status: string, errorCode: string, errorMessage: string) {
        super(httpResponseCode, status, errorCode, errorMessage);
    }

};

