import { useState } from 'react';

export interface PlanDay {
    day: number;
    items: any[];
}

export default () => {
    const [plan, setPlan] = useState<PlanDay[]>([]);


    const addDay = () => {
        setPlan([...plan, { day: plan.length + 1, items: [] }]);
    };

    const addToDay = (day: number, item: any) => {
        setPlan(plan.map(d => d.day === day ? { ...d, items: [...d.items, item] } : d));
    };

    const removeItem = (day: number, id: string) => {
        setPlan(plan.map(d => d.day === day ? {
            ...d,
            items: d.items.filter(i => i.id !== id)
        } : d));
    };

    return { plan, addDay, addToDay, removeItem };
};
