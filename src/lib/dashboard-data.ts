export interface MonthlyRevenue {
  month: string;
  revenue: number;
  orders: number;
  remeras: number;
  jeans: number;
  vestidos: number;
  abrigos: number;
  calzado: number;
}

export interface TopProduct {
  name: string;
  units: number;
  revenue: number;
  category: string;
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
  { month: 'Ene', revenue: 45000, orders: 890, remeras: 18000, jeans: 11250, vestidos: 9000, abrigos: 2250, calzado: 4500 },
  { month: 'Feb', revenue: 42000, orders: 820, remeras: 15960, jeans: 11760, vestidos: 7560, abrigos: 1680, calzado: 5040 },
  { month: 'Mar', revenue: 52000, orders: 980, remeras: 13000, jeans: 15600, vestidos: 6240, abrigos: 9360, calzado: 7800 },
  { month: 'Abr', revenue: 48000, orders: 910, remeras: 9600, jeans: 13440, vestidos: 4800, abrigos: 12000, calzado: 8160 },
  { month: 'May', revenue: 55000, orders: 1050, remeras: 8250, jeans: 13750, vestidos: 4400, abrigos: 17600, calzado: 11000 },
  { month: 'Jun', revenue: 62000, orders: 1200, remeras: 11160, jeans: 13640, vestidos: 6200, abrigos: 17360, calzado: 13640 },
];

export const TOTAL_REVENUE = 304000;
export const TOTAL_ORDERS = 5850;
export const AVG_TICKET = 52;
export const GROWTH = 18;

export const TOP_PRODUCTS: TopProduct[] = [
  { name: 'Jean Slim Fit Tiro Alto', units: 1420, revenue: 56800, category: 'Jeans' },
  { name: 'Campera de Cuero Premium', units: 980, revenue: 49000, category: 'Abrigos' },
  { name: 'Remera Algodon Pima', units: 2100, revenue: 42000, category: 'Remeras' },
  { name: 'Botines Chelsea Cuero', units: 760, revenue: 38000, category: 'Calzado' },
  { name: 'Vestido Midi Floral', units: 640, revenue: 25600, category: 'Vestidos' },
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
    title: 'Ticket promedio',
    insight: 'El ticket promedio es $52. Quienes compran jeans gastan 40% mas que el promedio.',
    impact: 'Upsell de accesorios (cinturones, carteras) en checkout',
    gradient: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(52,211,153,0.05))',
  },
  {
    title: 'Concentracion geografica',
    insight: 'Bs As + CABA generan 64% de los ingresos. Hay oportunidad en el interior.',
    impact: 'Expandir puntos de entrega y envio gratis a Cordoba y Santa Fe',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))',
  },
];
