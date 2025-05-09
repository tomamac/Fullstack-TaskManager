package middleware

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func Auth(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	// authHeader := c.Get("Authorization")
	// splitJWT := strings.Split(cookie, " ")
	// if len(splitJWT) != 2 {
	// 	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "BadTokenFormat"})
	// }

	// tokenString := strings.Split(cookie, " ")[1]

	token, err := jwt.ParseWithClaims(cookie, jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Unauthorized"})
	}

	claim := token.Claims.(jwt.MapClaims)
	userID, ok := claim["userId"].(string)
	if !ok {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "No such field"})
	}

	c.Locals("userid", userID)

	return c.Next()
}
