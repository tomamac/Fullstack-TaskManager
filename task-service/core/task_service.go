package core

import "fmt"

//Primary port
type TaskService interface {
	CreateTask(task *Task) error
	GetTasks(userid string) ([]Task, error)
	GetTasksByTitle(userid string, title string) ([]Task, error)
	GetTaskByID(userid string, id uint) (Task, error)
	UpdateTask(task Task) error
	DeleteTask(id uint) error
}

type taskServiceImpl struct {
	repo TaskRepository
}

func NewTaskService(repo TaskRepository) TaskService {
	return &taskServiceImpl{repo: repo}
}

func (s *taskServiceImpl) CreateTask(task *Task) error {
	//Business logic

	if err := s.repo.Save(task); err != nil {
		return err
	}

	return nil
}

func (s *taskServiceImpl) GetTasks(userid string) ([]Task, error) {
	//Business logic

	tasks, err := s.repo.GetAll(userid)

	if err != nil {
		return nil, err
	}

	return tasks, nil
}

func (s *taskServiceImpl) GetTasksByTitle(userid string, title string) ([]Task, error) {
	//Business logic

	_title := fmt.Sprintf("%%%s%%", title)

	tasks, err := s.repo.Search(userid, _title)

	if err != nil {
		return nil, err
	}

	return tasks, nil
}

func (s *taskServiceImpl) GetTaskByID(userid string, id uint) (Task, error) {
	task, err := s.repo.GetByID(userid, id)

	if err != nil {
		return task, err
	}

	return task, nil
}

func (s *taskServiceImpl) UpdateTask(task Task) error {
	if err := s.repo.Update(task); err != nil {
		return err
	}

	return nil
}

func (s *taskServiceImpl) DeleteTask(id uint) error {
	if err := s.repo.Delete(id); err != nil {
		return err
	}

	return nil
}
