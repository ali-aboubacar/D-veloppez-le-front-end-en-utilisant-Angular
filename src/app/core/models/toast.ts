export interface ToastEvent {
    message: string,
    type: ToastType
}

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export const errorType = (error: any): ToastType => {

    let errorTypeField: ToastType
    switch(error.status){
      case 400:
         errorTypeField = 'info'
        break;
      case 406:
        errorTypeField = 'warning'
        break;
      case 404:
      errorTypeField = 'error'
        break;
      default:
      errorTypeField = 'error'
    }
    return errorTypeField;
}