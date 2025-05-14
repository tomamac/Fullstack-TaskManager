package main

import (
	"fmt"
	// "log"
	"os"
	"strconv"
	"task-service/adapters"
	"task-service/core"
	"task-service/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	// "github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// if err := godotenv.Load(); err != nil {
	// 	log.Fatal("load .env error")
	// }

	host := os.Getenv("POSTGRES_HOST")
	port, _ := strconv.Atoi(os.Getenv("POSTGRES_PORT"))
	databaseName := os.Getenv("POSTGRES_DB")   //"taskitDB"
	username := os.Getenv("POSTGRES_USER")     //"postgres"
	password := os.Getenv("POSTGRES_PASSWORD") //"root"

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
	app.Use(cors.New((cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowCredentials: true,
	})))
	app.Use("/api/tasks", middleware.Auth)
	app.Post("/api/tasks", taskHandler.CreateTask)
	app.Get("/api/tasks", taskHandler.GetTasks)
	app.Get("/api/tasks/:id", taskHandler.GetTask)
	app.Put("/api/tasks/:id", taskHandler.UpdateTask)
	app.Delete("/api/tasks/:id", taskHandler.DeleteTask)

	app.Listen(":8002")
}
