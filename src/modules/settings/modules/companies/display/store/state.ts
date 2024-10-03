import { CompanyModel } from '../../data/models/companyModel';
import { EconomicActivity, FiscalResponsibilities, Tax } from '../../data/models/taxData';

export const useCompaniesState = () => {
  return {
    companyList: [] as CompanyModel[],
    fiscalResponsalities: [] as FiscalResponsibilities[],
    economicActivities: [] as EconomicActivity[],
    taxes: [] as Tax[],
  };
};
