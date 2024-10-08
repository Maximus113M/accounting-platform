import { useCompaniesStore } from '.';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { CompaniesDatasourceImpl } from '../../data/datasources/companiesDatasource';
import { CompaniesRepositoryImpl } from '../../data/respositories/companiesRepositoryImpl';
import { CompaniesUseCases } from '../../domain/use-cases/companiesUseCases';
import { exceptiosResponseHandler } from 'src/core/helpers/exceptions';
import { CompanyModel, companyModelToJson } from '../../data/models/companyModel';

const companiesRepositoryImp = new CompaniesRepositoryImpl(new CompaniesDatasourceImpl());
const companiesUseCases = new CompaniesUseCases(companiesRepositoryImp);

export const getCompanies = async (accessToken: string) => {
  try {
    const companiesStore= useCompaniesStore();
    companiesStore.companyList= await companiesUseCases.getAllCompanies(accessToken);
    return { status: statusMessages.success, message: 'Empresas obtenidas!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const getCompany = async (serial: number, accessToken: string) => {
  try {
    const resp = await companiesUseCases.getCompany(serial, accessToken);
    return { status: statusMessages.success, message: 'Empresa obtenida!', data: resp };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const createCompany = async (company: CompanyModel, accessToken: string) => {
  try {
    await companiesUseCases.createCompany(companyModelToJson(company) ,accessToken);
    
    return { status: statusMessages.success, message: 'Empresa creada!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const updateCompany = async (company: CompanyModel, accessToken: string) => {
  try {
    await companiesUseCases.updateCompany(company.serial, companyModelToJson(company) ,accessToken);
    
    return { status: statusMessages.success, message: 'Empresa creada!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const cloneCompany = async ({serial, groupNumber, accessToken}:{serial: number, groupNumber: number, accessToken: string}) => {
  try {
    await companiesUseCases.cloneCompany(serial, groupNumber  ,accessToken);
    
    return { status: statusMessages.success, message: 'Empresa clonada!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const deleteCompany = async (companyId: number, accessToken: string) => {
  try {
    await companiesUseCases.deleteCompany(companyId ,accessToken);
    
    return { status: statusMessages.success, message: 'Empresa eliminada' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};

export const getEconomicActivities = async (accessToken: string) => {
  try {
    const companiesStore= useCompaniesStore();
    const resp = await companiesUseCases.getEconomicActivities(accessToken);
    companiesStore.economicActivities= [...resp];
    console.log('Get EconomicActivities Done!');
    return { status: statusMessages.success, message: 'Actividades economicas obtenidas!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const getFiscalResponsabilities = async (accessToken: string) => {
  try {
    const companiesStore= useCompaniesStore();
    const resp = await companiesUseCases.getFiscalResponsabilities(accessToken);
    companiesStore.fiscalResponsalities= [...resp];
    console.log('Get FiscalResponsabilities Done!');
    return { status: statusMessages.success, message: 'Responsabilidades Fiscales obtenidas!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const getTaxes = async (accessToken: string) => {
  try {
    const companiesStore= useCompaniesStore();
    const resp = await companiesUseCases.getTaxes(accessToken);
    companiesStore.taxes= [...resp];
    console.log('Get Taxes Done!');
    return { status: statusMessages.success, message: 'Tributos obtenidos!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
