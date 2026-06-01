export type BookStatus = 'locked' | 'progress' | 'completed';
export type BookColorFamily = 'indigo' | 'violet' | 'emerald' | 'amber';

export interface LibraryData {
  carreras: CarreraData[];
}

export interface CarreraData {
  id: string;           
  slug: string;         
  name: string;         
  shortName: string;    
  color: string;        
  colorFamily: BookColorFamily;
  icon: string;         
  years: YearData[];    
}

export interface YearData {
  year: number;         
  title: string;        
  materias: BookData[];
}

export interface BookData {
  slug: string;         
  name: string;         
  fullName: string;     
  status: BookStatus;
  colorIndex: number;   
  hasContent: boolean;  
  topicsFilePath: string | null;  
  topics: TopicEntry[]; 
}

export interface TopicEntry {
  id: string;           
  title: string;        
  level: 2 | 3;         
  hasContent: boolean;  
  charCount: number;    
}

export const BOOK_COLOR_PALETTES: Record<BookColorFamily, string[]> = {
  indigo:  ['#1e3a5f','#1a3a6b','#1e3a80','#1d3461','#162447','#1f4068','#1b2a4a','#243b6e'],
  violet:  ['#4a1d6b','#3d1460','#551d77','#3b1456','#4e1b70','#421960','#380f55','#5a2080'],
  emerald: ['#0f3d1a','#0a3015','#123d1a','#0c3818','#0e3516','#113a1a','#0d3214','#153f1c'],
  amber:   ['#3d2800','#4a3000','#3a2500','#4d3200','#3f2900','#452d00','#382200','#503600'],
};
