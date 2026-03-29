import {describe, it, expect} from "vitest";
import request from "supertest";
import express from "express";
import authRouter from "./auth.ts";

import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);

const testUser = {
    email: `test_${Date.now()}@mail.ru`, 
    username: "TestUser",
    password: "password123",
};

describe("Auth API", () => {
    // 1. Тест РЕГИСТРАЦИИ
    it("POST /register - успешная регистрация", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send(testUser);

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toHaveProperty("id");
        expect(res.body.user.username).toBe(testUser.username);
    });

    // 2. Тест ДУБЛИКАТА
    it("POST /register - ошибка если пользователь существует", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send(testUser); 

        expect(res.status).toBe(409);
        expect(res.body.error).toContain("уже существует");
    });

    // 3. Тест ВХОДА
    it("POST /login - успешный вход", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: testUser.email,
            password: testUser.password,
        });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toHaveProperty("email");
    });

    // 4. Тест НЕВЕРНОГО ПАРОЛЯ
    it("POST /login - ошибка неверный пароль", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: testUser.email,
            password: "wrong_password",
        });

        expect(res.status).toBe(401);
        expect(res.body.error).toContain("пароль");
    });

    // 5. Тест НЕВЕРНОГО EMAIL
    it("POST /login - ошибка неверный email", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: "notexist@mail.ru",
            password: "password123",
        });

        expect(res.status).toBe(401);
        expect(res.body.error).toContain("email");
    });
});
