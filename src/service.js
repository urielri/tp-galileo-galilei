import { API_LOCAL, API_CLOUD } from "./constants.js";

export function getEnvironment() {
  const origin = window.location.origin;
  if (origin.match(/localhost/) || origin.match(/127.0.0.1/)) {
    return API_CLOUD;
  }
  return API_CLOUD;
}

export async function getScientist(id) {
  try {
    const response = await fetch(`${getEnvironment()}/scientist/${id}`);
    return await response.json();
  } catch (error) {
    throw new Error(`No se pudo obtener el cientifico con ID: ${id}`);
  }
}

export async function getScientists() {
  try {
    const response = await fetch(`${getEnvironment()}/scientists`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("No se pudo obtener los cientificos");
  }
}

/**
 * @returns {Promise<{status: string}>}
 */
export async function health() {
  try {
    const response = await fetch(getEnvironment());
    return {
      status: response.ok,
    };
  } catch (error) {
    throw new Error("No se pudo establecer conexion con el servidor");
  }
}
