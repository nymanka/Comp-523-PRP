import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Form.css';

function Form() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    id: '',
    titleOfPRPTopic: '',
    researchAdvisor: '',
    prpSubmitted: '',
    fullAuthorList: '',
    paperAccepted: '',
    reviewsAvailable: '',
    partResponsibleFor: '',
    presentationScope: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Assuming you'll replace 'http://localhost:5000/saveFormData' with your actual backend endpoint
    try {
      await axios.post('http://localhost:5000/saveFormData', { userId: user.id, formData });
      console.log('Form data saved successfully');
      // navigate('/home'); // or any other route after successful form submission
    } catch (error) {
      console.error('Error saving form data', error);
    }
  };

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="form-container">
      <h2>PRP Research Form - Part 1</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID#:</label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="titleOfPRPTopic">Title of PRP topic:</label>
          <input type="text" id="titleOfPRPTopic" name="titleOfPRPTopic" value={formData.titleOfPRPTopic} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="researchAdvisor">Research Advisor:</label>
          <input type="text" id="researchAdvisor" name="researchAdvisor" value={formData.researchAdvisor} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
  <label>Has this PRP topic already been submitted to a peer-reviewed conference or journal?</label>
  <div className="radio-container">
    <div className="radio-option">
      <input type="radio" id="prpSubmittedYes" name="prpSubmitted" value="Yes" checked={formData.prpSubmitted === 'Yes'} onChange={handleInputChange} />
      <label htmlFor="prpSubmittedYes">Yes</label>
    </div>
    <div className="radio-option">
      <input type="radio" id="prpSubmittedNo" name="prpSubmitted" value="No" checked={formData.prpSubmitted === 'No'} onChange={handleInputChange} />
      <label htmlFor="prpSubmittedNo">No</label>
    </div>
  </div>
</div>

        <div className="form-group">
          <label htmlFor="fullAuthorList">If yes, give the full author list:</label>
          <input type="text" id="fullAuthorList" name="fullAuthorList" value={formData.fullAuthorList} onChange={handleInputChange} />
        </div>

        <div className="form-group">
  <label>If yes, was the paper accepted?</label>
  <div className="radio-container">
    <div className="radio-option">
      <input type="radio" id="paperAcceptedYes" name="paperAccepted" value="Yes" checked={formData.paperAccepted === 'Yes'} onChange={handleInputChange} />
      <label htmlFor="paperAcceptedYes">Yes</label>
    </div>
    <div className="radio-option">
      <input type="radio" id="paperAcceptedNo" name="paperAccepted" value="No" checked={formData.paperAccepted === 'No'} onChange={handleInputChange} />
      <label htmlFor="paperAcceptedNo">No</label>
    </div>
    {/* Conditional rendering for the notification date input */}
    {formData.paperAccepted === 'Yes' && (
      <div className="notification-date-input">
        <label htmlFor="notificationDate">Notification Date:</label>
        <input type="date" id="notificationDate" name="notificationDate" value={formData.notificationDate || ''} onChange={handleInputChange} />
      </div>
    )}
  </div>
</div>

<div className="form-group">
  <label>Are reviews currently available to your committee or will they become available prior to the presentation?</label>
  <div className="radio-container">
    <div className="radio-option">
      <input type="radio" id="reviewsAvailableYes" name="reviewsAvailable" value="Yes" checked={formData.reviewsAvailable === 'Yes'} onChange={handleInputChange} />
      <label htmlFor="reviewsAvailableYes">Yes</label>
    </div>
    <div className="radio-option">
      <input type="radio" id="reviewsAvailableNo" name="reviewsAvailable" value="No" checked={formData.reviewsAvailable === 'No'} onChange={handleInputChange} />
      <label htmlFor="reviewsAvailableNo">No</label>
    </div>
  </div>
</div>

<div className="form-group">
  <label htmlFor="partResponsibleFor">What part of the research were you responsible for?</label>
  <textarea 
    id="partResponsibleFor" 
    name="partResponsibleFor" 
    value={formData.partResponsibleFor} 
    onChange={handleInputChange} 
    required 
    rows="4" // Adjust the number of rows as needed
    className="form-textarea">
  </textarea>
</div>

<div className="form-group">
  <label>Will you present the entire research project or just your contribution?</label>
  <div className="radio-container">
    <div className="radio-option">
      <input type="radio" id="presentationScopeEntire" name="presentationScope" value="Entire Project" checked={formData.presentationScope === 'Entire Project'} onChange={handleInputChange} />
      <label htmlFor="presentationScopeEntire">Entire Project</label>
    </div>
    <div className="radio-option">
      <input type="radio" id="presentationScopeContribution" name="presentationScope" value="My Contribution" checked={formData.presentationScope === 'My Contribution'} onChange={handleInputChange} />
      <label htmlFor="presentationScopeContribution">My Contribution</label>
    </div>
  </div>
</div>


        
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Form;
