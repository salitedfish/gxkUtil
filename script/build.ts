import { exec } from "child_process";
import consola from "consola";
import { PACKAGE_NAME } from "./data";

const build = async () => {
  consola.info("Test");
  exec("pnpm run test");

  consola.info("Clean up");
  exec(`rm -rf ./${PACKAGE_NAME}`);

  consola.info("Rollup");
  exec("rollup -c rollup.config.ts --configPlugin typescript");

  consola.info("Clean up");
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
