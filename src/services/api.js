import axios from 'axios';

const API_URL = 'https://api.sampleapis.com/coffee/hot';

export const getCoffees = () => axios.get(API_URL);
export const addCoffee = (coffee) => axios.post(API_URL, coffee);
export const updateCoffee = (id, coffee) => axios.put(`${API_URL}/${id}`, coffee);
export const deleteCoffee = (id) => axios.delete(`${API_URL}/${id}`);

