"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const node_crypto_1 = require("node:crypto");
const zod_1 = require("zod");
const database_1 = require("../database");
class UsersController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUserSchema = zod_1.z.object({
                password: zod_1.z.string(),
                email: zod_1.z.string(),
            });
            const { email, password } = createUserSchema.parse(req.body);
            const user = yield (0, database_1.knex)("users").select().where("email", email).first();
            const validate = user && bcrypt_1.default.compareSync(password, user.password);
            if (validate) {
                let sessionId = (0, node_crypto_1.randomUUID)();
                return res.status(201).send({
                    user,
                    sessionId: sessionId,
                });
            }
            return res.status(401).send({ message: "Unauthorized" });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSchema = zod_1.z.object({
                name: zod_1.z.string(),
                password: zod_1.z.string(),
                email: zod_1.z.string(),
            });
            const { name, password, email } = userSchema.parse(req.body);
            const hash_password = yield bcrypt_1.default.hash(password, 5);
            const user = yield (0, database_1.knex)("users").select().where("email", email).first();
            if (!user) {
                yield (0, database_1.knex)("users").insert({
                    id: (0, node_crypto_1.randomUUID)(),
                    name,
                    email,
                    password: hash_password,
                });
                return res.status(201).send();
            }
            else {
                return res.status(401).send({ message: "User already Exists" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield (0, database_1.knex)("users").select().where("id", id).first();
            const userSchema = zod_1.z.object({
                name: zod_1.z.string(),
                email: zod_1.z.string(),
                password: zod_1.z.string().optional(),
            });
            const { name, email, password } = userSchema.parse(req.body);
            const hash_password = password
                ? yield bcrypt_1.default.hash(password, 5)
                : user === null || user === void 0 ? void 0 : user.password;
            yield (0, database_1.knex)("users")
                .update({ name, email, password: hash_password })
                .where("id", id);
            return res.status(200).end();
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield (0, database_1.knex)("users").where("id", id).del();
            return res.status(200).end();
        });
    }
    fetchAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield (0, database_1.knex)("users").orderBy("name");
            res.status(200).json(users);
        });
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map