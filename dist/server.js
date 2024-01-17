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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const check_key_request_1 = require("./middlewares/check-key-request");
const env_1 = require("./env");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
function createServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use((0, cookie_parser_1.default)());
        app.use(express_1.default.json());
        app.use('/api', check_key_request_1.checkKeyRequest, routes_1.default);
        app.all(['/api', '/api/*'], (req, res) => {
            res.sendStatus(404);
        });
        const staticDir = path_1.default.join(__dirname, '..', 'static');
        app.use(express_1.default.static(staticDir));
        app.get('*', (req, res) => {
            const indexHtml = path_1.default.join(__dirname, '..', 'public', 'index.html');
            res.sendFile(indexHtml);
        });
        app.listen(env_1.env.SERVER_PORT, () => {
            console.log('Server start on Port ' + env_1.env.SERVER_PORT);
        });
    });
}
createServer();
//# sourceMappingURL=server.js.map