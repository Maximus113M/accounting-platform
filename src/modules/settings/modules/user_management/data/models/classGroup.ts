class ClassGroup{
    id: number;
    code: number;
    number: number;
    name: string;

    constructor({
        id,
        code,
        number,
        name,
    }:{
        id?: number;
        code?: number;
        number?: number;
        name?: string;
    }){
        this.id= id?? 0;
        this.code= code?? 0;
        this.number= number?? 0;
        this.name= name?? '';
    }
}

const classGroupFromJson= (json: any)=>{
    return new ClassGroup({
        id: json.id,
        code: json.code,
        number: json.number,
        name: json.name,
    });
}

const classGroupToJson= (classGroup: ClassGroup)=>{
    return {
        id: classGroup.id,
        code: classGroup.code,
        number: classGroup.number,
        name: classGroup.name,
    };
}

export{ ClassGroup, classGroupFromJson, classGroupToJson }