import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ScheduleTable.css';

function ScheduleTable({ users }) {
    const navigate = useNavigate();

    const handleUserClick = (userId) => {
        // Navigate to Search page and pass the user ID
        navigate('/search', { state: { userId } });
    };
    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Student</th>
                    <th>Title</th>
                    <th>Advisor</th>
                    <th>Committee</th>
                    <th>User</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{[user.schedulingData.date," ", user.schedulingData.time]}</td>
                        <td>{user.formData.name}</td><td>
                            {user.pdfFileUrl ? (
                                <a href={`http://localhost:5000${user.pdfFileUrl}`} target="_blank" rel="noopener noreferrer">
                                    {user.formData.titleOfPRPTopic}
                                </a>
                            ) : (
                                user.formData.titleOfPRPTopic
                            )}
                        </td>
                        <td>{user.formData.researchAdvisor}</td>
                        <td>
                            {
                                // If committee is an array, join the elements. Otherwise, just display it.
                                Array.isArray(user.schedulingData.committee)
                                ? user.schedulingData.committee.join(', ')
                                : user.schedulingData.committee
                            }
                        </td>
                        <td>
                            <a href="#" onClick={() => handleUserClick(user._id)}>
                                {user.username}
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}


export default ScheduleTable;