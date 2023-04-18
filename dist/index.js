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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db/db"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./routes/Auth/router"));
const cors_1 = __importDefault(require("cors"));
const router_2 = __importDefault(require("./routes/Admin/router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use((0, cors_1.default)({
    credentials: true,
    origin: ['http://localhost:5173']
}));
const AuthRouter = (0, router_1.default)();
const AdminRouter = (0, router_2.default)();
app.use('/admin', AdminRouter);
app.use('/auth', AuthRouter);
const Start = () => __awaiter(void 0, void 0, void 0, function* () {
    let PORT = process.env.PORT;
    try {
        yield db_1.default.authenticate();
        yield db_1.default.sync();
        app.listen(PORT, () => {
            console.log('server is running on port ' + PORT);
        });
    }
    catch (e) {
        console.log(e);
    }
});
Start();
