import { useState } from 'react';

export interface PlanDay {
    day: number;
    items: any[];
}

const KEY = 'planner';


export default () => {
    const [plan, setPlan] = useState<PlanDay[]>([]);

    const getData = () => {
        const raw = localStorage.getItem(KEY);
        setPlan(raw ? JSON.parse(raw) : []);
    };

    const save = (newPlan: PlanDay[]) => {
        localStorage.setItem(KEY, JSON.stringify(newPlan));
        setPlan(newPlan);
    }

    const addDay = () => {
        const newPlan = [...plan, { day: plan.length + 1, items: [] }];
        save(newPlan);
    };

    const addToDay = (day: number, item: any) => {
        const newPlan = plan.map(d => d.day === day ? { ...d, items: [...d.items, item] } : d);
        save(newPlan);
    };

    const removeItem = (day: number, id: string) => {
        const newPlan = plan.map(d => d.day === day ? {
            ...d,
            items: d.items.filter(i => i.id !== id)
        } : d);
        save(newPlan);
    };

    return { plan, addDay, addToDay, removeItem, getData };
};
