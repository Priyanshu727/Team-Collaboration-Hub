import React, { useState } from 'react';

const Chat = () => {
    const [content, setContent] = useState('');

    const handleSendMessage = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8081/api/chat', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content, chatRoom: 'yourChatRoomId' }), // Replace with actual chat room ID
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();
            console.log('Message sent:', data);
            setContent(''); // Reset input field
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <form onSubmit={handleSendMessage} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Send Message</h2>
            <textarea
                placeholder="Type your message..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border border-gray-300 rounded p-2 mb-4 w-full"
                required
            ></textarea>
            <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4">
                Send Message
            </button>
        </form>
    );
};

export default Chat;
