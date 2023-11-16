"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    DBA_HOST: zod_1.z.string().default('localhost'),
    DBA_USER: zod_1.z.string().default('root'),
    DBA_PASSWORD: zod_1.z.string().default('password'),
    DBA_DATABASE: zod_1.z.string().default('living_vales'),
    DBA_PORT: zod_1.z.coerce.number().default(3306),
    SERVER_PORT: zod_1.z.coerce.number().default(8080),
    SERVER_HOST: zod_1.z.string().default('192.168.60.123')
});
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error('Invalid environment variables!', _env.error.format());
    throw new Error('Invalid environment variables');
}
exports.env = _env.data;
//# sourceMappingURL=index.js.map