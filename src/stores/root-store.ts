import { defineStore } from 'pinia';
import { CityModel } from 'src/models/cityModel';

export const useRootStore = defineStore('root', {
  state: () => ({
    currentRoute: '/main/',
    cities: [] as CityModel[],
    documentTypes: [
      'Registro civil',
      'Tarjeta de identidad',
      'Cédula de ciudadanía',
      'Tarjeta de extranjería',
      'tarjeta extranjera',
      'NIT',
      'Pasaporte',
      'Documento de identificación extranjero',
      'NUIP',
      'No obligado a registrarse en el RUT PN',
      'Permiso especial de permanencia PEP',
      'Sin identificación del exterior o para uso definido por la DIAN',
      'Nit de otro pais/Sin identificación del exterior (43 medios magnéticos)',
      'Salvoconducto de permanencia'
    ],
    regimeTypes: [
      '001 Gran Contribuyente',
      '002 Responsable de IVA',
      '003 No responsable de IVA',
      '004 Empresa del Estado',
    ],
//  economicActivities: [
//     '0010 Asalariado',
//     '0020 Pensionados',
//     '0081 Personas naturales y sucesiones ilíquidas sin actividad económica',
//     '0082 Personas naturales subsidiadas por terceros',
//     '0090 Rentistas de Capital, solo para personas naturales',
//     '0111 Cultivo de cereales (excepto arroz), legumbres y semillas oleaginosas',
//     '0112 Cultivo de arroz',
//     '0113 Cultivo de hortalizas, raíces y tuberculos',
//     '0114 Cultivo de tabaco',
//     '0115 Cultivo de plantas textiles',
// ];
//  fiscalResponsibilities: [
//     'Gran contribuyente',
//     'Autorretenedor',
//     'Agente de retención IVA',
//     'Régimen simple de tributación',
//     'No aplica - Otros',
// ];
  }),
  getters: {
    
  },
  actions: {
    changeRoute(route: string) {
      this.currentRoute = route;
      this.router.push(this.currentRoute);
      console.log('Route: '+this.currentRoute)
    },
  },
});
