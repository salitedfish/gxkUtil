import { exec } from "child_process";

exec("jest", (error) => {
  if (error) {
    console.error(error);
  }
});
