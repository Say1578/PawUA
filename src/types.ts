export interface Product {
    id: number;
    user_id: number;
    category_id: number;
    name: string;
    price: number;
    description?: string;
    region: string;
    email: string;
    phone: string;
    additional_phone?: string;
    telegram?: string;
    images: string[];
    created_at: Date;
    updated_at: Date;
    user_name: string;
}

export const categories = [
  { id: 1, name: "Кіт" },
  { id: 2, name: "Пес" },
  { id: 3, name: "Риба" },
  { id: 4, name: "Жаба" },
  { id: 5, name: "Змія" },
  { id: 6, name: "Ящірка" },
  { id: 7, name: "Папуг" }
];

export const regions = [
  "Київська", "Львівська", "Харківська", "Одеська", "Дніпропетровська",
  "Вінницька", "Полтавська", "Черкаська", "Чернігівська", "Закарпатська",
  "Волинська", "Хмельницька", "Житомирська", "Тернопільська", "Миколаївська",
  "Запорізька", "Сумська", "Рівненська", "Чернівецька", "Кіровоградська",
  "Івано-Франківська", "Луганська", "Донецька", "Херсонська"
];