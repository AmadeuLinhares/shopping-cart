import depcheck from "depcheck";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname);

const options: depcheck.Options = {
  ignoreBinPackage: false,
  skipMissing: false,
  ignorePatterns: ["build", "node_modules"],
  ignoreMatches: [
    "vitest",
    "eslint",
    "husky",
    "lint-staged",
    "tsup",
    "tsx",
    "prettier",
    "@typescript-eslint/*",
    "@vitest/*",
    "@eslint/*",
    "@commitlint/*",
    "commitlint",
    "@tailwindcss/postcss",
    "@testing-library/dom",
    "@testing-library/react",
    "@types/react",
    "@types/react-dom",
    "eslint-config-next",
    "tailwindcss",
    "typescript",
    "@tanstack/eslint-plugin-query",
    "tw-animate-css",
  ],
};

void depcheck(projectRoot, options, (unused) => {
  const unusedDeps = [...unused.dependencies, ...unused.devDependencies];

  if (unusedDeps.length > 0) {
    console.error("\n❌ Unused dependencies found:\n");
    unusedDeps.forEach((dep) => console.error(`  - ${dep}`));
    console.error("\nPlease remove them before committing.\n");
    process.exit(1);
  } else {
    // eslint-disable-next-line no-console
    console.log("✅ No unused dependencies found.");
    process.exit(0);
  }
});
