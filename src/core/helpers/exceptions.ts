export class ServerException extends Error {
    public readonly code: string;
    constructor(code: string, message?: string) {
      super(`error: ${code + ' - ' + message}`);
      this.name = 'ServerException';
      this.code = code;
    }
  }