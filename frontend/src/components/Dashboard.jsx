// src/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm'; // Import TaskForm component
import Chat from './Chat'; // Import Chat component

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const navigate = useNavigate();

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/tasks', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Function to fetch chat messages from the backend
  const fetchChatMessages = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/chat/messages', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch chat messages');
      }

      const data = await response.json();
      setChatMessages(data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  // Fetch tasks and chat messages when the component mounts
  useEffect(() => {
    fetchTasks();
    fetchChatMessages();
  }, []);

  return (
    <div className="container mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800">Dashboard</h1>
      <p className="mt-2 text-center text-gray-600">
        Welcome to the Team Collaboration Hub! Here you can manage your tasks and chat with your team.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {/* Task List Card */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-semibold text-gray-700">Your Tasks</h2>
          <TaskForm fetchTasks={fetchTasks} /> {/* Include TaskForm */}
          <div className="mt-4 grid grid-cols-1 gap-4">
            {tasks.map((task) => (
              <div key={task._id} className="bg-gray-50 rounded-lg shadow-sm p-4 hover:shadow-lg transition duration-300">
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Messages Card */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-semibold text-gray-700">Chat Messages</h2>
          <Chat fetchChatMessages={fetchChatMessages} /> {/* Include Chat component */}
          <div className="mt-4">
            {chatMessages.length > 0 ? (
              chatMessages.map((message) => (
                <p key={message._id} className="border-b last:border-b-0 py-2 text-gray-700">{message.content}</p>
              ))
            ) : (
              <p className="text-gray-500">No chat messages available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
