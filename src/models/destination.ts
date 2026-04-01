import { useState } from 'react';

export interface Destination {
  id: string;
  name: string;
  type: 'beach' | 'mountain' | 'city';
  price: number;
  rating: number;
  image: string;
  foodCost: number;
  hotelCost: number;
  travelCost: number;
}

const KEY = 'destinations';

export default () => {
  const [data, setData] = useState<Destination[]>([
    {
      id: '1',
      name: 'Đà Nẵng',
      type: 'beach',
      price: 300,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355',
      foodCost: 80,
      hotelCost: 120,
      travelCost: 100,
    },
    {
      id: '2',
      name: 'Sa Pa',
      type: 'mountain',
      price: 250,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1608037521244-f1c6c7635194',
      foodCost: 60,
      hotelCost: 100,
      travelCost: 90,
    },
    {
      id: '3',
      name: 'Hà Nội',
      type: 'city',
      price: 200,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1585155770447-2f66e2a397b5',
      foodCost: 70,
      hotelCost: 90,
      travelCost: 40,
    },
    {
      id: '4',
      name: 'Phú Quốc',
      type: 'beach',
      price: 400,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1597047084897-51e81819a499',
      foodCost: 100,
      hotelCost: 150,
      travelCost: 150,
    },
    {
      id: '5',
      name: 'Đà Lạt',
      type: 'mountain',
      price: 220,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1578898887932-dce23a595ad4',
      foodCost: 60,
      hotelCost: 100,
      travelCost: 60,
    },
    {
      id: '6',
      name: 'TP Hồ Chí Minh',
      type: 'city',
      price: 280,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
      foodCost: 90,
      hotelCost: 120,
      travelCost: 70,
    }
  ]);

  const getDataDestination = () => {
    const raw = localStorage.getItem(KEY);

    if (!raw) {
      // chưa có gì → dùng fake
      localStorage.setItem(KEY, JSON.stringify(data));
      setData(data);
      return;
    }

    const localData = JSON.parse(raw);

    // 👉 merge fake + local (tránh trùng id)
    const merged = [
      ...data,
      ...localData.filter(
        (item: any) => !data.find(d => d.id === item.id)
      )
    ];

    setData(merged);
  };

  const save = (d: Destination[]) => {
    localStorage.setItem(KEY, JSON.stringify(d));
    setData(d);
  };

  const add = (item: Destination) => save([item, ...data]);
  const remove = (id: string) => save(data.filter(i => i.id !== id));
  const update = (item: Destination) => save(data.map(i => i.id === item.id ? item : i));

  return { data, getDataDestination, add, remove, update };
};