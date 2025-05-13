package adapters

import (
	"task-service/core"

	"gorm.io/gorm"
)

// Secondary adapter
type GormTaskRepository struct {
	db *gorm.DB
}

func NewGormTaskRepository(db *gorm.DB) core.TaskRepository {
	return &GormTaskRepository{db: db}
}

func (r *GormTaskRepository) Save(task *core.Task) error {
	if result := r.db.Create(&task); result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *GormTaskRepository) GetAll(userid string) ([]core.Task, error) {
	var tasks []core.Task

	result := r.db.Where("user_id = ?", userid).Find(&tasks)

	if result.Error != nil {
		return nil, result.Error
	}

	return tasks, nil
}

func (r *GormTaskRepository) Search(userid string, title string) ([]core.Task, error) {
	var tasks []core.Task

	result := r.db.Where("user_id = ?", userid).Where("title LIKE ?", title).Find(&tasks)

	if result.Error != nil {
		return nil, result.Error
	}

	return tasks, nil
}

func (r *GormTaskRepository) GetByID(userid string, id uint) (core.Task, error) {
	var task core.Task

	result := r.db.Where("user_id = ?", userid).First(&task, id)

	if result.Error != nil {
		return task, result.Error
	}

	return task, nil
}

func (r *GormTaskRepository) Update(task core.Task) error {
	result := r.db.Save(&task)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (r *GormTaskRepository) Delete(id uint) error {
	var task core.Task
	result := r.db.Delete(&task, id)

	if result.Error != nil {
		return result.Error
	}

	return nil
}
