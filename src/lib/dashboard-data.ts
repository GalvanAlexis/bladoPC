export interface MonthlyRevenue {
  month: string;
  revenue: number;
  cost: number;
  orders: number;
  returns: number;
  remeras: number;
  jeans: number;
  vestidos: number;
  abrigos: number;
  calzado: number;
}

export interface DailyData {
  day: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  name: string;
  units: number;
  revenue: number;
  category: string;
  stock: number;
  margin: number;
}

export interface RegionData {
  name: string;
  value: number;
}

export interface WeekdayData {
  day: string;
  orders: number;
}

export interface Recommendation {
  title: string;
  insight: string;
  impact: string;
  gradient: string;
}

export const MONTHLY_DATA: MonthlyRevenue[] = [
  { month: 'Ene', revenue: 45000, cost: 27000, orders: 890, returns: 38, remeras: 18000, jeans: 11250, vestidos: 9000, abrigos: 2250, calzado: 4500 },
  { month: 'Feb', revenue: 42000, cost: 25200, orders: 820, returns: 42, remeras: 15960, jeans: 11760, vestidos: 7560, abrigos: 1680, calzado: 5040 },
  { month: 'Mar', revenue: 52000, cost: 29640, orders: 980, returns: 55, remeras: 13000, jeans: 15600, vestidos: 6240, abrigos: 9360, calzado: 7800 },
  { month: 'Abr', revenue: 48000, cost: 27360, orders: 910, returns: 48, remeras: 9600, jeans: 13440, vestidos: 4800, abrigos: 12000, calzado: 8160 },
  { month: 'May', revenue: 55000, cost: 30800, orders: 1050, returns: 61, remeras: 8250, jeans: 13750, vestidos: 4400, abrigos: 17600, calzado: 11000 },
  { month: 'Jun', revenue: 62000, cost: 34100, orders: 1200, returns: 72, remeras: 11160, jeans: 13640, vestidos: 6200, abrigos: 17360, calzado: 13640 },
];

export const TOTAL_REVENUE = 304000;
export const TOTAL_COST = 174100;
export const TOTAL_GROSS_PROFIT = TOTAL_REVENUE - TOTAL_COST;
export const TOTAL_ORDERS = 5850;
export const TOTAL_RETURNS = 316;
export const AVG_TICKET = 52;
export const GROWTH = 18;

export const PROFIT_MARGIN = ((TOTAL_GROSS_PROFIT / TOTAL_REVENUE) * 100).toFixed(1);
export const ROI = ((TOTAL_GROSS_PROFIT / TOTAL_COST) * 100).toFixed(0);

export const REVENUE_TREND = MONTHLY_DATA.map((m) => m.revenue);
export const ORDER_TREND = MONTHLY_DATA.map((m) => m.orders);

export const DAILY_DATA: DailyData[] = [
  { day: 'Lun 2', revenue: 2100, orders: 42 },
  { day: 'Mar 3', revenue: 2800, orders: 55 },
  { day: 'Mie 4', revenue: 3100, orders: 61 },
  { day: 'Jue 5', revenue: 3500, orders: 70 },
  { day: 'Vie 6', revenue: 3900, orders: 78 },
  { day: 'Sab 7', revenue: 2900, orders: 58 },
  { day: 'Dom 8', revenue: 1300, orders: 25 },
  { day: 'Lun 9', revenue: 2200, orders: 44 },
  { day: 'Mar 10', revenue: 2700, orders: 53 },
  { day: 'Mie 11', revenue: 3200, orders: 63 },
  { day: 'Jue 12', revenue: 3600, orders: 72 },
  { day: 'Vie 13', revenue: 4100, orders: 82 },
  { day: 'Sab 14', revenue: 3000, orders: 60 },
  { day: 'Dom 15', revenue: 1400, orders: 28 },
  { day: 'Lun 16', revenue: 2300, orders: 46 },
  { day: 'Mar 17', revenue: 2600, orders: 51 },
  { day: 'Mie 18', revenue: 3300, orders: 65 },
  { day: 'Jue 19', revenue: 3700, orders: 74 },
  { day: 'Vie 20', revenue: 4200, orders: 84 },
  { day: 'Sab 21', revenue: 3100, orders: 62 },
  { day: 'Dom 22', revenue: 1500, orders: 30 },
  { day: 'Lun 23', revenue: 2400, orders: 48 },
  { day: 'Mar 24', revenue: 2900, orders: 57 },
  { day: 'Mie 25', revenue: 3400, orders: 67 },
  { day: 'Jue 26', revenue: 3800, orders: 76 },
  { day: 'Vie 27', revenue: 4300, orders: 86 },
  { day: 'Sab 28', revenue: 3200, orders: 64 },
  { day: 'Dom 29', revenue: 1600, orders: 32 },
  { day: 'Lun 30', revenue: 2500, orders: 50 },
];

export const TOP_PRODUCTS: TopProduct[] = [
  { name: 'Jean Slim Fit Tiro Alto', units: 1420, revenue: 56800, category: 'Jeans', stock: 340, margin: 58 },
  { name: 'Campera de Cuero Premium', units: 980, revenue: 49000, category: 'Abrigos', stock: 120, margin: 62 },
  { name: 'Remera Algodon Pima', units: 2100, revenue: 42000, category: 'Remeras', stock: 890, margin: 52 },
  { name: 'Botines Chelsea Cuero', units: 760, revenue: 38000, category: 'Calzado', stock: 210, margin: 55 },
  { name: 'Vestido Midi Floral', units: 640, revenue: 25600, category: 'Vestidos', stock: 180, margin: 48 },
  { name: 'Buzo Oversize Polartec', units: 580, revenue: 23200, category: 'Abrigos', stock: 95, margin: 56 },
  { name: 'Zapatilla Urban Canvas', units: 520, revenue: 20800, category: 'Calzado', stock: 310, margin: 50 },
  { name: 'Camisa Oxford Slim', units: 490, revenue: 19600, category: 'Remeras', stock: 270, margin: 54 },
  { name: 'Pollera Tablas', units: 380, revenue: 15200, category: 'Vestidos', stock: 140, margin: 46 },
  { name: 'Cinturon Cuero Hebilla', units: 350, revenue: 7000, category: 'Accesorios', stock: 420, margin: 72 },
];

export const REGION_DATA: RegionData[] = [
  { name: 'Bs As', value: 42 },
  { name: 'CABA', value: 22 },
  { name: 'Cordoba', value: 15 },
  { name: 'Santa Fe', value: 10 },
  { name: 'Otras', value: 11 },
];

export const WEEKDAY_DATA: WeekdayData[] = [
  { day: 'Lun', orders: 640 },
  { day: 'Mar', orders: 820 },
  { day: 'Mie', orders: 910 },
  { day: 'Jue', orders: 1050 },
  { day: 'Vie', orders: 1180 },
  { day: 'Sab', orders: 870 },
  { day: 'Dom', orders: 380 },
];

export const PROJECTION: { month: string; actual?: number; projected?: number }[] = [
  { month: 'Ene', actual: 45000 },
  { month: 'Feb', actual: 42000 },
  { month: 'Mar', actual: 52000 },
  { month: 'Abr', actual: 48000 },
  { month: 'May', actual: 55000 },
  { month: 'Jun', actual: 62000 },
  { month: 'Jul', projected: 58000 },
  { month: 'Ago', projected: 54000 },
  { month: 'Sep', projected: 56000 },
  { month: 'Oct', projected: 61000 },
  { month: 'Nov', projected: 68000 },
  { month: 'Dic', projected: 78000 },
];

export const RECOMMENDATIONS: Recommendation[] = [
  {
    title: 'Stock de abrigos',
    insight: 'Las ventas de abrigos crecieron 150% de enero a junio. La demanda se mantiene alta en julio-agosto.',
    impact: 'Aumentar orden de compra 35% para Julio',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.05))',
  },
  {
    title: 'Lunes: dia debil',
    insight: 'Los lunes concentran solo 11% de las ventas semanales. Es el dia de menor rendimiento.',
    impact: 'Newsletter los lunes con descuento express 20%',
    gradient: 'linear-gradient(135deg, rgba(244,63,94,0.15), rgba(244,63,94,0.05))',
  },
  {
    title: 'Coleccion verano',
    insight: 'Remeras y vestidos representaron 38% de ventas en el semestre. La demanda estacional es alta.',
    impact: 'Iniciar campana de coleccion de verano desde octubre',
    gradient: 'linear-gradient(135deg, rgba(251,146,60,0.15), rgba(251,146,60,0.05))',
  },
  {
    title: 'Margen de accesorios',
    insight: 'Los accesorios tienen 72% de margen vs 54% promedio del catalogo. Estan infrarepresentados.',
    impact: 'Ampliar linea de accesorios y ubicarlos en checkout',
    gradient: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(52,211,153,0.05))',
  },
  {
    title: 'Concentracion geografica',
    insight: 'Bs As + CABA generan 64% de los ingresos. Hay oportunidad en el interior.',
    impact: 'Expandir puntos de entrega y envio gratis a Cordoba y Santa Fe',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))',
  },
];
