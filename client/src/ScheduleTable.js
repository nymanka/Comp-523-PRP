import React from 'react';
import './ScheduleTable.css';

function ScheduleTable({ users }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Student</th>
                    <th>Title</th>
                    <th>Advisor</th>
                    <th>Committee</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{[user.schedulingData.date," ", user.schedulingData.time]}</td>
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
                    </tr>
                ))}
            </tbody>
        </table>
    );
}


export default ScheduleTable;