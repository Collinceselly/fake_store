import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


// Delivery options
export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},
{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},
{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];


// Getting a delivery options when an ID is provided
export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    })

    return deliveryOption || deliveryOption[0];

}


// Calculating the dateString by adding the todays date and number of days depending on the option chosen and displaying it in the described format
export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();

    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

    const dateString = deliveryDate.format('dddd, MMMM, DD');

    return dateString;
}