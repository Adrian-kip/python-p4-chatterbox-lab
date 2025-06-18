import React, { useState, useEffect } from 'react';

function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5000/messages');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="message-list">
      {messages.map(message => (
        <div key={message.id} className="message">
          <p><strong>{message.username}:</strong> {message.body}</p>
          <small>{new Date(message.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default MessageList;