"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = exports.Unauthorized = exports.OKResponse = exports.BadRequest = exports.IntServErr = void 0;
const IntServErr = (res) => {
    return res.status(500).json({ message: 'Произошла непредвиденная ошибка' }).end();
};
exports.IntServErr = IntServErr;
const BadRequest = (res, message) => {
    return res.status(400).json({ message }).end();
};
exports.BadRequest = BadRequest;
const OKResponse = (res, message) => {
    return res.status(200).json({ message }).end();
};
exports.OKResponse = OKResponse;
const Unauthorized = (res) => {
    return res.sendStatus(401).end();
};
exports.Unauthorized = Unauthorized;
const Forbidden = (res) => {
    return res.sendStatus(403).end();
};
exports.Forbidden = Forbidden;
