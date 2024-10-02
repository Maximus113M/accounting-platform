class CityModel{
    dianCode: string;
    name: string;

    constructor({dianCode, name}:{dianCode?: string, name?: string}){
        this.dianCode= dianCode?? '';
        this.name= name?? '';
    }
}

const cityFromJson= (json: any)=>{
    return new CityModel({dianCode: json.codigo_dian, name: json.nombre });
}

export { CityModel, cityFromJson }