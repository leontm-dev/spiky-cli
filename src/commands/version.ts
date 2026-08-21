// Imports

import { readPackageJSON } from "pkg-types";

// Project-Imports

import checkForOutdatedVersion from "../functions/checkForOutdatedVersion.js";

// Command

export default async function versionCommand() {
  await checkForOutdatedVersion();
  const pkg = await readPackageJSON();
  console.log("The current version is: v" + pkg.version);
}
