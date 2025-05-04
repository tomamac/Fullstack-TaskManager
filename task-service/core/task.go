package core

type Task struct {
	ID     uint   `json:"id"`
	Title  string `json:"title"`
	IsDone bool   `json:"isdone"`
	UserID string `json:"userid"`
}
