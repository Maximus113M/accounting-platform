import { Notify, QSpinnerGears, QSpinnerComment, QSpinnerCube, QSpinnerDots, QSpinnerFacebook, QSpinnerGrid, QSpinnerHourglass, QSpinnerIos, 
    QSpinnerOval, QSpinnerPuff, QSpinnerTail} from 'quasar';
import { statusMessages } from '../helpers/generalHelpers';
import { ref } from 'vue';

const globalNotify= ref<any | undefined>(undefined);

export const customNotify= ({status, message, position, progress, time= 2000, spinner}:{status: statusMessages, message: string, position?: string, progress?: boolean, time?: number, spinner?: spinnerType})=>{
    if(globalNotify.value){
        globalNotify.value()
    }
    
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
    globalNotify.value= Notify.create({
        color: color,
        icon: icon,
        message: message,
        progress: progress,
        spinner: getSpinnerType(spinner),
        timeout: time 
    });
    return globalNotify.value;
}

export enum spinnerType { 
    None,
    Gears,
    Comment,
    Cube,
    Dots,
    Facebook,
    Grid,
    Hourglass,
    Ios,
    Oval,
    Puff,
    Tail
}

const getSpinnerType= (type: spinnerType | undefined)=>{
    switch (type) {
        case spinnerType.Comment:
            return QSpinnerComment;

        case spinnerType.Cube:
            return QSpinnerCube;

        case spinnerType.Dots:
            return QSpinnerDots;

        case spinnerType.Facebook: 
            return QSpinnerFacebook;

        case spinnerType.Gears:    
            return QSpinnerGears;

        case spinnerType.Grid:
            return QSpinnerGrid;

        case spinnerType.Hourglass: 
            return QSpinnerHourglass;

        case spinnerType.Ios:
            return QSpinnerIos;

        case spinnerType.Oval:      
            return QSpinnerOval;

        case spinnerType.Puff:    
            return QSpinnerPuff;

        case spinnerType.Tail:     
            return QSpinnerTail;
    
        default:
            return false;
    }
}