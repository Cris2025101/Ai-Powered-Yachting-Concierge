interface YagaProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  isGlutenFree: boolean;
  isVegan: boolean;
  isPescatarian: boolean;
  availability: boolean;
}

interface YagaCategory {
  id: string;
  name: string;
  products: YagaProduct[];
}

interface YagaCatalog {
  categories: YagaCategory[];
  lastUpdated: Date;
} 