package main

import (
	"fmt"
	"log"
	"task-service/adapters"
	"task-service/core"
	"task-service/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const (
	host         = "localhost"
	port         = 5432
	databaseName = "taskitDB"
	username     = "postgres"
	password     = "root"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("load .env error")
	}

	app := fiber.New()

	//connect db

	dsn := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, username, password, databaseName)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect to the database")
	}

	db.AutoMigrate(&core.Task{})

	//set up service and adapters
	taskRepo := adapters.NewGormTaskRepository(db)
	taskService := core.NewTaskService(taskRepo)
	taskHandler := adapters.NewHttpTaskHandler(taskService)

	//routes
	app.Use("/api/tasks", middleware.Auth)
	app.Post("/api/tasks", taskHandler.CreateTask)
	app.Get("/api/tasks", taskHandler.GetTasks)
	app.Put("/api/tasks/:id", taskHandler.UpdateTask)
	app.Delete("/api/tasks/:id", taskHandler.DeleteTask)

	app.Listen(":8002")
}
