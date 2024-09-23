import { getRolNameFromNumber, statusMessages } from 'src/core/helpers/generalHelpers';
import { UserModel } from 'src/models/userModel';
import { useAuthStore } from 'src/modules/auth/display/store';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const accessRols= {
    admin:['admin'],
    adminAndTeachers:['admin','instructor'],
    all:['admin','instructor','student'],
}

export const checkIfAuthenticated= async( 
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
)=>{
    const authStore= useAuthStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const path: string = to.path;
    //Don't need auth
    if(!requiresAuth){
        if(path === '/' && authStore.signInUser.accessToken !== ''){
            next({name: '/main/'});
            return;
        }
        next();
        return;
    }
    //If Not has token
    if(authStore.signInUser.accessToken === ''){
        const isValidToken= await checkIfTokenIsValid();
        if(!isValidToken){
            authStore.signInUser= new UserModel({});
            console.log('Go to Sign In!!!');
            next({name: ''});
            return;
        }
    }
    if(!validateCanAccess(to, getRolNameFromNumber(authStore.signInUser.rol, true))){
        //Redirect
        console.log('Can not access!!!');
        next(from);
        return;
    }
    console.log('Go Next Route!!! '+'path: '+path);
    next();
}

const validateCanAccess= (to: RouteLocationNormalized, rol: string)=>{
    if((to.meta.access as Array<string>).find((accessRol)=> accessRol === rol)){
        return true;
    }

    return false;
}

const checkIfTokenIsValid= async(): Promise<boolean> =>{
    const authStore= useAuthStore();
    const token= sessionStorage.getItem('token');
    if(!token) return false;

    const resp= await authStore.getSignInUser(token);
    if(resp.status === statusMessages.fail) return false;
    
    return true;
}

