export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  detailedDescription: string;
  keySpecialties: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  message?: string;
  date: string;
  status: 'new' | 'contacted' | 'resolved';
  adminNotes?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}
