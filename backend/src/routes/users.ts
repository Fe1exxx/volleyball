import express from "express";
import type { Request, Response } from "express";
import pool from "./db.ts"; 

const router = express.Router();

// GET /api/users - получить всех пользователей
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email FROM users ORDER BY id",
    );
    res.json({ users: result.rows });
  } catch (err) {
    console.error("Ошибка получения пользователей:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// GET /api/users/:id - получить пользователя по ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("Ошибка получения пользователя:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

export default router;
