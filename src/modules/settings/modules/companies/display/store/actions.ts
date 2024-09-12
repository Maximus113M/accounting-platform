import { useSettingsStore } from '.';

//const salesRepositoryImp = new SalesRepositoryImpl(new SalesDatasourceImpl());
//const salesUseCase = new SalesUseCase(salesRepositoryImp);

export const createSale = async () => {
  try {
    useSettingsStore
    // const res = await salesUseCase.create(toFirebaseSales(sale), file);
    // return { status: statusMessages.success, message: 'success', id: res };
  } catch (error: any) {
    // const { code, message, details } = 'response' in error ? error.response.data.error : error;
    // return { status: statusMessages.fail, error: new CustomError(code, message, details) };
  }
};


export enum SalesActivityTypes {
  createSale = 'Creación de Venta',
  editSale = 'Edición de Venta',
  deleteSale = 'Eliminación de Venta',
  paymentError = 'Registro Error de Pago',
  refund = 'Devolución',
  updateBaseCash = 'Edición de Base Caja',
  printBill = 'Impresión de factura',
}