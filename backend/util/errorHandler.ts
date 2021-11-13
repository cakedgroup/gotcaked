import express from "express";

export function errorHandler(err: Error, req: express.Request, _res: express.Response) {
    if (err) {
        if (err.message === "Password don´t match") {
            _res.status(401).json({ status: "error", message: err.message });
        } else if (err.message === "User does not exist" || err.message === "User not found") {
            _res.status(404).json({ status: "error", message: err.message });
        } else if (err.message === "User already exists") {
            _res.status(409).json({ status: "error", message: err.message });
        } else if (err.message === "No JWT Key") {
            _res.status(400).json({ status: "error", message: err.message });
        } else {
            _res.status(500).json({ status: "error", message: err.message });
        }
    }
}