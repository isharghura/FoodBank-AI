import React from 'react';

// Sample user data
const users = [
    { id: 1, name: 'person1', points: 120 },
    { id: 2, name: 'person2', points: 200 },
    { id: 3, name: 'person3', points: 150 },
    { id: 4, name: 'person4', points: 180 },
    { id: 5, name: 'person5', points: 220 },
];

const Ranks = () => {
    // Sort users by points in descending order
    const sortedUsers = users.sort((a, b) => b.points - a.points);

    return (
        <div>
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Ranks;
