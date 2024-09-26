// src/services/api.js
import { API_URL } from '../config';

export const fetchProjects = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
