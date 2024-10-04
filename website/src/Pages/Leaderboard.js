import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { FaTrophy } from 'react-icons/fa';
import './Leaderboard.css';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5001/get-all-users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const formattedData = data.map(user => ({
                    id: user[0],
                    username: user[1],
                    points: user[2]
                }));
                const sortedData = formattedData.sort((a, b) => b.points - a.points);
                setUsers(sortedData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsers();
    }, []);

    const sortedUsers = users.sort((a, b) => b.points - a.points);

    return (
        <div className='bodytypeshit'>
            <div >  
                <div className='text-info mt-5 font-weight-bold mb-4 fs-3'>
                    <FaTrophy className='me-3' /> Leaderboard
                </div>      
                <div className='table-of-stuff w-75 align-items-center justify-content-center mx-auto'>
                    <table className='table table-stripped'>
                        <thead className='table-light'>
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">Name</th>
                                <th scope="col">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
