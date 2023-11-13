"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = exports.config = void 0;
const knex_1 = require("knex");
const env_1 = require("./env");
exports.config = {
    client: 'mysql',
    connection: {
        host: env_1.env.DBA_HOST,
        user: env_1.env.DBA_USER,
        password: env_1.env.DBA_PASSWORD,
        database: env_1.env.DBA_DATABASE,
        port: env_1.env.DBA_PORT,
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    },
    pool: {
        min: 0,
        max: 10,
    }
};
exports.knex = (0, knex_1.knex)(exports.config);
//# sourceMappingURL=database.js.map