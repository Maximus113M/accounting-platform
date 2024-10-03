class CityModel{
    dianCode: number;
    name: string;

    constructor({
        dianCode, 
        name
    }:{
        dianCode?: number, 
        name?: string
    }){
        this.dianCode= dianCode?? 0; //68276;
        this.name= name?? '';
    }
}

const cityFromJson= (json: any)=>{
    return new CityModel({dianCode: json.codigo_dian, name: json.nombre });
}

export { CityModel, cityFromJson }