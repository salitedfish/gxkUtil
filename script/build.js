import { exec } from "child_process";
// import console from "console";
import { PACKAGE_NAME } from "./data";

const build = async () => {
  console.info("Test");
  exec("pnpm run test");

  console.info("Clean up");
  exec(`rm -rf ./${PACKAGE_NAME}`);

  console.info("Rollup");
  exec("rollup -c rollup.config.ts --configPlugin typescript");

  console.info("Clean up");
  exec(`rm -rf ./${PACKAGE_NAME}/rollup.config.d.ts`);
};

const cli = async () => {
  try {
    await build();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

cli();
