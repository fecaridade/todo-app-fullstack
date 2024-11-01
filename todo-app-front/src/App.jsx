import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/Card';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { Checkbox } from './components/Checkbox';
import { Trash2 } from 'lucide-react';
import './App.css';

export default function TodoApp() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/todos/`)
    const data = await response.json()
    setTodos(data)
  }
  
  const createTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
  
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/todos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTodo })
    })
  
    if (response.ok) {
      setNewTodo('')
      fetchTodos()
    }
  }
  
  const markAsDone = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/todos/${id}/mark-as-done/`, {
      method: 'POST'
    })
  
    if (response.ok) {
      fetchTodos()
    }
  }
  
  const deleteTodo = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/todos/${id}/`, {
      method: 'DELETE'
    })
  
    if (response.ok) {
      fetchTodos()
    }
  }

  return (
    <Card className="todo-card">
      <CardHeader>
        <CardTitle className="todo-title">Todo App</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={createTodo} className="todo-form">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter para adicionar uma nova task"
            className="todo-input"
          />
        </form>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <Checkbox
                checked={todo.is_done}
                onChange={() => markAsDone(todo.id)}
                className="todo-checkbox"
              />
              <span className={`todo-text ${todo.is_done ? 'todo-done' : ''}`}>
                {todo.name}
              </span>
              <Button variant="ghost" className="todo-delete" onClick={() => deleteTodo(todo.id)}>
                <Trash2 className="todo-delete-icon" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
