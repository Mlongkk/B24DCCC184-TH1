import { useModel } from 'umi';

export default () => {
    const { plan } = useModel('planner');

    let food = 0, hotel = 0, travel = 0;

    plan.forEach(day => {
        day.items.forEach(item => {
            food += item.foodCost;
            hotel += item.hotelCost;
            travel += item.travelCost;
        });
    });

    const total = food + hotel + travel;

    return {
        data: [
            { type: 'Food', value: food },
            { type: 'Hotel', value: hotel },
            { type: 'Travel', value: travel },
        ],
        total
    };
};