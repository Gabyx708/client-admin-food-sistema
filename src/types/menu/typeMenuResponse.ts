interface MenuResponse {
    data: {
      id: string;
      eatingDate: string;
      closeDate: string;
      uploadDate: string;
      totalOrders: number;
      inProgress: number;
      cancelledOrders: number;
      finishedOrders: number;
      totalRevenue: number;
      totalAllOrders: number;
    };
    orders: Order[];
  }
  
  interface Order {
    id: string;
    idUser: string;
    username: string;
    state: string;
    items: OrderItem[];
  }
  
  interface OrderItem {
    idDish: number;
    description: string;
    quantity: number;
  }
  