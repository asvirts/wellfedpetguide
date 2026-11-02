import { defineEnv, string } from "void/env";

export default defineEnv({
  AMAZON_TAG: string().default(""),
});
