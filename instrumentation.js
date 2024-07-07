import connect from "./app/lib/db.js";

export async function register() {
  console.log("register");
  try {
    connect();
  } catch (error) {
    console.log(error);
  }
}
