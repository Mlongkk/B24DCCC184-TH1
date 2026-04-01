export const validateDestination = (form: any) => {
    if (!form.name) return 'Name is required';
    if (!form.type) return 'Type is required';
    if (!form.price) return 'Price is required';
    if (!form.image) return 'Image is required';
    return null;
};