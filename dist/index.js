"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
require("./config/mongodb-config");
const routes_1 = __importDefault(require("./routes"));
const secret_config_1 = __importDefault(require("./config/secret-config"));
(0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: secret_config_1.default.ORIGIN || 'http://localhost:8080',
    credentials: true
}));
app.use('/api', routes_1.default);
app.use((err, req, res, next) => {
    (0, error_handler_1.default)(err, req, res, next);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
