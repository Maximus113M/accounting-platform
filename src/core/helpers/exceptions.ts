class ServerException {
    public readonly code: number;
    public readonly data: any;
    constructor({code, data}:{code?: number, data?: string}) {
      this.code = code?? 0;
      this.data = data;
    }
  }

  const exceptiosResponseHandler= ({error, message}:{error: any, message?: string}) :string =>{
    //debugger
    if(message){
      return message;
    }
    let response= 'Ocurrió un error al procesar la solicitud';

    if(!(error instanceof ServerException)){
      return response;
    }

    if (error.code === 0) {
      return response;
    }

    if(!error.data.response.data.errors && !error.data.response.data.error){
      switch (error.code){
        case 400 :
          return 'No se pudieron procesar los datos enviados...'

        case 401 :
          return 'No tienes permiso para continuar...'

        case 404 :
          return 'No se encontró el recurso solicitado...'

        case 500:
          return 'Ha ocurrido un error en el servidor...'

        default:
          return response;
      }
    }
    if(error.data.response.data.errors){
      if(typeof error.data.response.data.errors === 'object'){
        const errorKeys= Object.keys(error.data.response.data.errors);
        if (errorKeys.length === 0) return response;

        response= error.data.response.data.errors[errorKeys[0]];

      }else if(typeof error.data.response.data.errors === 'string'){
        response= error.data.response.data.errors;
      }
    }else{
      if(typeof error.data.response.data.error === 'object'){
        const errorKeys= Object.keys(error.data.response.data.errors);
        if (errorKeys.length === 0) return response;

        response= error.data.response.data.errors[errorKeys[0]];

      }else if(typeof error.data.response.data.error === 'string'){
        response= error.data.response.data.error;
      }
    }

    return response;
  }

  export  { ServerException, exceptiosResponseHandler }
