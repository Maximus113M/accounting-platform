enum statusMessages {
    success = 'success',
    fail = 'fail',
    info = 'info',
    warning= 'warning'
}

const getRolNameFromNumber=(rol: number, isKey= false)=>{
    switch(rol){
        case 1:
            return  isKey ? 'admin' : 'Administrador';
        case 2:
            return  isKey ? 'instructor' : 'Instructor';
        case 3:
            return  isKey ? 'student' : 'Aprendiz';
        default:
            return 'Sin rol'
    }
}














export { statusMessages, getRolNameFromNumber }