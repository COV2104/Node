const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
const usersFile = "users.json";
const Joi = require("joi");

// Определение схемы валидации запроса на создание пользователя
const createUserSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  secondName: Joi.string().min(1).required(),
  age: Joi.number().min(0).max(150).required(),
  city: Joi.string().min(1),
});

// Чтение данных из файла
function getUsersFromFile() {
  try {
    const data = fs.readFileSync(usersFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Запись данных в файл
function saveUsersToFile(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf8");
}

// Получение всех пользователей
app.get("/users", (req, res) => {
  const users = getUsersFromFile();
  res.json(users);
});

// Получение пользователя по ID
app.get("/users/:id", (req, res) => {
  const users = getUsersFromFile();
  const user = users.find((user) => user.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "Пользователь не найден" });
  }
});

// Создание пользователя
app.post("/users", (req, res) => {
  const { error, value } = createUserSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    const users = getUsersFromFile();
    const newUser = req.body;
    // Генерируем уникальный ID
    const id = Date.now().toString();
    newUser.id = id;
    users.push(newUser);
    saveUsersToFile(users);
    res.json(newUser);
  }
});

// Обновление пользователя
app.put("/users/:id", (req, res) => {
  const users = getUsersFromFile();
  const userIndex = users.findIndex((user) => user.id === req.params.id);
  if (userIndex !== -1) {
    const updatedUser = req.body;
    updatedUser.id = req.params.id;
    users[userIndex] = updatedUser;
    saveUsersToFile(users);
    res.json(updatedUser);
  } else {
    res.status(404).json({ error: "Пользователь не найден" });
  }
});

// Удаление пользователя
app.delete("/users/:id", (req, res) => {
  const users = getUsersFromFile();
  const userIndex = users.findIndex((user) => user.id === req.params.id);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1)[0];
    saveUsersToFile(users);
    res.json(deletedUser);
  } else {
    res.status(404).json({ error: "Пользователь не найден" });
  }
});

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});
