import axios from "axios";


export const loadFeriados = async () => {
  try {
    const response = await axios.get('/feriados.json')
    return response.data;    
  } catch (error) {
    console.error('Error loading feriados:', error);
    return [];
  }
};


