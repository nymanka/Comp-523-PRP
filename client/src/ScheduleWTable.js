import React from 'react';
import './ScheduleTable.css';

function ScheduleTable({ users }) {
    return (
        <table>
            <thead>
                <tr>
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
                        <td>{user.formData.name}</td>
                        <td>{user.formData.titleOfPRPTopic}</td>
                        <td>{user.schedulingData.advisor}</td>
                        <td>
                            {
                                // If committee is an array, join the elements. Otherwise, just display it.
                                Array.isArray(user.schedulingData.committee)
                                ? user.schedulingData.committee.join(', ')
                                : user.schedulingData.committee
                            }
                        </td>
                        <td>{user.username}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}


export default ScheduleTable;