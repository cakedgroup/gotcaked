import express from "express";

export function errorHandler(err: Error, req: express.Request, _res: express.Response) {
    if (err) {
        if (err.message === "User does not exist" || err.message === "User not found" ||
            err.message === "No users found" || err.message === "Credentials not found" ||
            err.message === "Category not found" || err.message === "Tag not found" ||
            err.message === "Recipe not found" || err.message === "Comment not found" ||
            err.message === "Rating not found" || err.message === "Picture does not exist") {
            _res.status(404).json({ status: "error", message: err.message });
        } else if (err.message === "User already exists") {
            _res.status(409).json({ status: "error", message: err.message });
        } else if (err.message === "No JWT Key") {
            _res.status(400).json({ status: "error", message: err.message });
        } else if (err.message === "Admin can´t be deleted") {
            _res.status(403).json({ status: "error", message: err.message });
        } else if (err.message === "Category does not exist") {
            _res.status(422).json({ status: "error", message: err.message });
        } else {
            _res.status(500).json({ status: "error", message: err.message });
        }
    }
}