import path from "path";
import { fusebox } from "fuse-box";

const dev = ["-d", "--dev"].some((arg) => process.argv.includes(arg));
const env = process.env.NODE_ENV;
const prod = env === "production";
const appRoot = ".";
const homeDir = path.join(appRoot, "src");
const outDir = path.join(appRoot, "docs");
const output = "app.$hash.js";
const vendor = "vendor.$hash.js";
const styles = "styles.$hash.css";
const template = path.join(homeDir, "index.html");

const fuse = fusebox({
  target: "browser",
  entry: path.join(homeDir, "index.tsx"),
  cache: !prod,
  webIndex: {
    template,
    publicPath: ".",
  },
  env: {
    NODE_ENV: process.env.NODE_ENV as string,
  },
  devServer: dev,
});

if (dev) {
  fuse
    .runDev({ bundles: { distRoot: outDir, app: output, vendor, styles } })
    .catch((err) => console.log(err));
} else {
  fuse
    .runProd({
      bundles: { distRoot: outDir, app: output, vendor, styles },
      uglify: true,
    })
    .catch((err) => console.log(err));
}
