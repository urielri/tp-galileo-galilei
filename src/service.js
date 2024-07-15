import { API_LOCAL, API_CLOUD } from "./constants.js";

export function getEnvironment() {
  const origin = window.location.origin;
  if (origin.match(/localhost/)) {
    return API_LOCAL;
  }
  return API_CLOUD;
}

export async function getScientist(id) {
  try {
    const response = await fetch(`${getEnvironment()}/scientist/${id}`);
    console.log("response", response);
    return await response.json();
  } catch (error) {}
}

export async function getScientists() {
  try {
    const response = await fetch(`${getEnvironment()}/scientists`);
    console.log("response", response);
    return await response.json();
  } catch (error) {}
}

export async function health() {
  try {
    const response = await fetch(getEnvironment(), {
      headers: {
        Origin: "http://localhost:5500",
      },
    });

    return await response.json();
  } catch (error) {}
}
