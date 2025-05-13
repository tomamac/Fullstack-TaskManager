package core

//Secondary port
type TaskRepository interface {
	Save(task *Task) error
	GetAll(userid string) ([]Task, error)
	Search(userid string, title string) ([]Task, error)
	GetByID(userid string, id uint) (Task, error)
	Update(task Task) error
	Delete(id uint) error
}
