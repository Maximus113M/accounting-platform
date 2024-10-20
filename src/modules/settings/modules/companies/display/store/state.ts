import { CompanyModel } from '../../data/models/companyModel';
import { EconomicActivity, FiscalResponsibilities, Tax } from '../../data/models/taxData';
import { ThirdModel } from '../../data/models/thrid/thirdModel';

export const useCompaniesState = () => {
  return {
    companyList: [] as CompanyModel[],
    fiscalResponsalities: [] as FiscalResponsibilities[],
    economicActivities: [] as EconomicActivity[],
    taxes: [] as Tax[],
    thirdList: [] as ThirdModel[]
  };
};
