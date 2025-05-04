package adapters

import (
	"strconv"
	"task-service/core"

	"github.com/gofiber/fiber/v2"
)

// Primary adapter
type HttpTaskHandler struct {
	service core.TaskService
}

func NewHttpTaskHandler(service core.TaskService) *HttpTaskHandler {
	return &HttpTaskHandler{service: service}
}

func (h *HttpTaskHandler) CreateTask(c *fiber.Ctx) error {
	userid, ok := c.Locals("userid").(string)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "User id missing or invalid"})
	}

	var task core.Task

	if err := c.BodyParser(&task); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Wrong format"})
	}

	task.UserID = userid

	if err := h.service.CreateTask(&task); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Task created",
		"task": task})
}

func (h *HttpTaskHandler) GetTasks(c *fiber.Ctx) error {
	userid, ok := c.Locals("userid").(string)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "User id missing or invalid"})
	}

	title := c.Query("title", "")

	var tasks []core.Task
	var err error

	if title == "" {
		tasks, err = h.service.GetTasks(userid)
	} else {
		tasks, err = h.service.GetTasksByTitle(userid, title)
	}

	if err != nil {
		return c.JSON(fiber.Map{"tasks": tasks})
	}

	return c.JSON(fiber.Map{"tasks": tasks})
}

func (h *HttpTaskHandler) UpdateTask(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Wrong format"})
	}

	var task core.Task

	if err := c.BodyParser(&task); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Wrong format"})
	}

	task.ID = uint(id)

	if err := h.service.UpdateTask(task); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Task updated",
		"task": task})
}

func (h *HttpTaskHandler) DeleteTask(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Wrong format"})
	}

	if err := h.service.DeleteTask(uint(id)); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Task deleted"})
}
