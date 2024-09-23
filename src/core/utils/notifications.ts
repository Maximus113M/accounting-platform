import { Notify } from 'quasar';
import { statusMessages } from '../helpers/generalHelpers';

export const customNotify= ({status, message, position}:{status: statusMessages, message: string, position?: string})=>{
    position;
    let color=''
    let icon=''
    switch (status) {
        case  statusMessages.success:
            color='light-green-14';
            icon='check_circle'
            break;
        case  statusMessages.fail:
            color='red';
            icon='error'
            break;
        case  statusMessages.info:
            color='blue';
            icon='announcement'
            break;
        case  statusMessages.warning:
            color='orange';
            icon='warning'
            break;
    
        default:
            break;
    }

    // actions: [
    //     { icon: 'close', color: 'white', round: true, handler: () => {} }
    //   ]

    return Notify.create({
        color: color,
        icon: icon,
        message: message,   
    });
}