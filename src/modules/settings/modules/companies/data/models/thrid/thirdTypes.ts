class ThirdType{
    id: number;
    name: string;
    
    constructor({
        id,
        name,
    }:{
        id?: number;
        name?: string;
    }){
        this.id= id?? 0;
        this.name= name?? '';
    }

    static toJson(thirdType: ThirdType){
        return{
            id: thirdType.id,
            nombre: thirdType.name,
        }
    }

    static fromJson(json: any){
        return new ThirdType({
            id: json.id,
            name: json.nombre,                
        });  
    }
}