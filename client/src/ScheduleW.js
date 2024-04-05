import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useAuth } from './AuthContext'; // Ensure this import is correct
import './Schedule.css';

function Schedule() {
    //const { updateSchedulingData } = useAuth();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [schedulingData, setSchedulingData] = useState({
        date: '',
        advisor: '',
        committee: '',
    });

    const [isReadOnly, setIsReadOnly] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users?waive=yes');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);


    const handleUserSelect = (event) => {
      const username = event.target.value;
      setSelectedUserId(username);
      // Find user and set scheduling data if exists
      const user = users.find(u => u.username === username);
      if (user && user.schedulingData) {
          setSchedulingData(user.schedulingData);
          setIsReadOnly(true);
          
      } else {
          setSchedulingData({ date: '', advisor: '', committee: '' });
      }
  }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSchedulingData(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = () => {
      setIsReadOnly(false); // Make fields not read-only to edit
  };

    const handleInfoSubmit = async () => {
        try {
            await axios.post('http://localhost:5000/saveSchedulingData', { selectedUserId, schedulingData });
            setIsReadOnly(true);
            console.log('Scheduling data saved successfully');
        } catch (error) {
            console.error('Error saving scheduling data:', error);
        }
    };

    return (
        <div className="schedule-container">
            <h2>Schedule</h2>
            <div className="dropdown-container">
            <select onChange={handleUserSelect} defaultValue="">
                  <option value="" disabled>Select a user</option>
                  {users.map((user) => (
                      <option key={user.id} value={user.username}>{user.username}</option>
                  ))}
              </select>
            </div>
            {selectedUserId && (
                <div className="user-details">
                    <h3>Scheduling Details</h3>
                    <div className="form-group">
                        <label>Date:</label>
                        <input type="date" name="date" value={schedulingData.date} onChange={handleInputChange} required readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
                    </div>
                    <div className="form-group">
                        <label>Advisor:</label>
                        <input type="text" name="advisor" value={schedulingData.advisor} onChange={handleInputChange} required readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
                    </div>
                    <div className="form-group">
                        <label>Committee:</label>
                        <input type="text" name="committee" value={schedulingData.committee} onChange={handleInputChange} required readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
                    </div>
                    <button onClick={handleInfoSubmit}>Submit</button>
                    <button type="button" onClick={handleEdit} disabled={!isReadOnly}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default Schedule;