import { exec } from "child_process";
import { PACKAGE_NAME } from "./data";

exec(`npm version patch && npm run build && cd ./${PACKAGE_NAME} && npm publish --access public`);
