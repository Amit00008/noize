import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { FaReply } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const socket = io(process.env.REACT_APP_SOCKET);

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);
    const [replyTo, setReplyTo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const accessToken = localStorage.getItem('spotifyAccessToken');
                if (accessToken) {
                    const response = await axios.get('https://api.spotify.com/v1/me', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    setUser(response.data);
                }
            } catch (err) {
                setError('Failed to fetch user information.');
            }
        };

        fetchUserInfo();

        socket.on('receiveMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('sendMessage', { user, message, replyTo }, (err) => {
                if (err) {
                    setError('Failed to send message.');
                }
            });
            setMessage('');
            setReplyTo(null);
        }
    };

    const handleReply = (msg) => {
        setReplyTo(msg);
    };

    return (
        <div className="bg-black text-white min-h-screen p-4 flex justify-center items-center">
            <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-purple-500 text-center">Chat Room</h2>
                {user && <h3 className="text-xl mt-2 text-center">Logged in as: {user.display_name}</h3>}
                {error && <div className="text-red-500 text-center mt-2">{error}</div>}
                <div className="mt-4 overflow-y-auto max-h-96">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2 p-2 border-b border-gray-700 flex items-start">
                            <img src={msg.user.images[0].url} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
                            <div className="flex-grow">
                                <strong className="text-purple-400">{msg.user.display_name}: </strong>
                                {msg.replyTo && (
                                    <div className="text-gray-400 text-sm">
                                        Replying to: <strong>{msg.replyTo.user.display_name}</strong> - {msg.replyTo.message}
                                    </div>
                                )}
                                <div>{msg.message}</div>
                            </div>
                            <button
                                className="text-sm mt-1 ml-2"
                                onClick={() => handleReply(msg)}
                            >
                                <FaReply />
                            </button>
                        </div>
                    ))}
                </div>
                {replyTo && (
                    <div className="mt-2 p-2 border border-purple-500 rounded">
                        Replying to: <strong>{replyTo.user.display_name}</strong> - {replyTo.message}
                        <button
                            className="ml-2 text-red-500"
                            onClick={() => setReplyTo(null)}
                        >
                            Cancel
                        </button>
                    </div>
                )}
                <div className="mt-4 flex">
                    <input
                        type="text"
                        className="flex-grow p-2 bg-gray-800 text-white rounded-l focus:outline-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        className="p-2 bg-purple-500 rounded-r"
                        onClick={sendMessage}
                    >
                        <IoIosSend />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;