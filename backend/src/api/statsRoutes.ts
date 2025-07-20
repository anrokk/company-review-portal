import express, { Request, Response, Router } from "express";
import statsService from "../services/statsService";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const stats = await statsService.getStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});

export default router;