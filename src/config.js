import c from "config";

export const serverConfig = {
    PORT: c.get("PORT") || 30000
}