"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
exports.handler = (req, res) => {
    const formData = req.body;
    console.log(formData);
    return res.json(formData);
};
