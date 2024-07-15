export interface MenuRequest {
    eatingDate: string;
    closeDate: string;
    options: Array<{
      idDish: number;
      stock: number;
    }>;
  }