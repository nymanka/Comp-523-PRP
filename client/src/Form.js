import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './Form.css';

function Form() {
    const { user, updateFormData, updateWaiveOption } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        id: '',
        titleOfPRPTopic: '',
        researchAdvisor: '',
        prpSubmitted: '',
        nameOfJournal: '',
        paperAccepted: '',
        reviewsAvailable: '',
        partResponsibleFor: '',
        presentationScope: '',
        listenWaiver: '',
    });
    
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [waiverOption, setWaiverOption] = useState('');

    useEffect(() => {
      if (user && user.formData) {
        setFormData(user.formData); // Load current user's saved formData from AuthContext
        // Check if all fields in formData are not empty
        const isFormEmpty = Object.values(user.formData).every(value => value === '');
        setIsReadOnly(!isFormEmpty);
      }
      if (user && user.waive) {
      setWaiverOption(user.waive === 'yes' ? 'waiver' : 'non-waiver');
      }
    }, [user]);


    const handleInputChange = (event) => {
        if (!isReadOnly) {
            const { name, value } = event.target;
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };


  const handleFormSubmit = async (event) => {
  event.preventDefault();
  try {
      await axios.post('http://localhost:5000/saveFormData', { userId: user.id, formData }); //Post to Database
      updateFormData(formData); //Update user context of formData
      setIsReadOnly(true); // Make fields read-only after saving
      await axios.post('http://localhost:5000/saveWaiveOption', { userId: user.id, waive: waiverOption === 'waiver' ? 'yes' : 'no' }); // Post to Database
      updateWaiveOption(waiverOption === 'waiver' ? 'yes' : 'no' ); //Update user context of waiveOption
      console.log('Form data saved successfully');
  } catch (error) {
      console.error('Error saving form data', error);
  }
};


  const handleEdit = () => {
    setIsReadOnly(false); // Make fields not read-only to edit
};

const handleClearForm = () => {
  setFormData({
    name: '',
    id: '',
    titleOfPRPTopic: '',
    researchAdvisor: '',
    prpSubmitted: '',
    nameOfJournal: '',
    paperAccepted: '',
    reviewsAvailable: '',
    listenWaiver: '',
  });
  setIsReadOnly(false);
};

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="form-container">
      <h2>PRP Research Form - Part 1</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Waiver Option:</label>
          <div className="radio-container">
            <div className="radio-option">
              <input type="radio" id="nonWaiver" name="waiverOption" value="non-waiver" checked={waiverOption === 'non-waiver'} onChange={() => setWaiverOption('non-waiver')} />
              <label htmlFor="nonWaiver">PRP</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="waiver" name="waiverOption" value="waiver" checked={waiverOption === 'waiver'} onChange={() => setWaiverOption('waiver')} />
              <label htmlFor="waiver">Waiver</label>
            </div>
          </div>
        </div>
        {/* Render common form fields */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
        </div>

        <div className="form-group">
          <label htmlFor="id">ID#:</label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleInputChange} required readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
        </div>

        <div className="form-group">
          <label htmlFor="titleOfPRPTopic">Title of PRP topic:</label>
          <input type="text" id="titleOfPRPTopic" name="titleOfPRPTopic" value={formData.titleOfPRPTopic} onChange={handleInputChange} required readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
        </div>

        <div className="form-group">
          <label htmlFor="researchAdvisor">Research Advisor:</label>
          <input type="text" id="researchAdvisor" name="researchAdvisor" value={formData.researchAdvisor} onChange={handleInputChange} required readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
        </div>

        <div className="form-group">
  <label>Has this PRP topic already been submitted to a peer-reviewed conference or journal?</label>
  <div className="radio-container">
    <div className="radio-option">
      <input type="radio" id="prpSubmittedYes" name="prpSubmitted" value="Yes" checked={formData.prpSubmitted === 'Yes'} onChange={handleInputChange} readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
      <label htmlFor="prpSubmittedYes">Yes</label>
    </div>
    <div className="radio-option">
      <input type="radio" id="prpSubmittedNo" name="prpSubmitted" value="No" checked={formData.prpSubmitted === 'No'} onChange={handleInputChange} readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
      <label htmlFor="prpSubmittedNo">No</label>
    </div>
  </div>
</div>

        <div className="form-group">
          <label htmlFor="nameOfJournal">If yes, give the name of the conference or journal (Don't forget to upload your paper in Profile):</label>
          <input type="text" id="nameOfJournal" name="nameOfJournal" value={formData.nameOfJournal} onChange={handleInputChange} readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
        </div>

        <div className="form-group">
  <label>If yes, was the paper accepted?</label>
  <div className="radio-container">
    <div className="radio-option">
      <input type="radio" id="paperAcceptedYes" name="paperAccepted" value="Yes" checked={formData.paperAccepted === 'Yes'} onChange={handleInputChange} readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
      <label htmlFor="paperAcceptedYes">Yes</label>
    </div>
    <div className="radio-option">
      <input type="radio" id="paperAcceptedNo" name="paperAccepted" value="No" checked={formData.paperAccepted === 'No'} onChange={handleInputChange} readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
      <label htmlFor="paperAcceptedNo">No</label>
    </div>
    {/* Conditional rendering for the notification date input */}
    {formData.paperAccepted === 'Yes' && (
      <div className="notification-date-input">
        <label htmlFor="notificationDate">Notification Date:</label>
        <input type="date" id="notificationDate" name="notificationDate" value={formData.notificationDate || ''} onChange={handleInputChange} readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
      </div>
    )}
  </div>
</div>

<div className="form-group">
  <label>Are reviews currently available to your committee or will they become available prior to the presentation?</label>
  <div className="radio-container">
    <div className="radio-option">
      <input type="radio" id="reviewsAvailableYes" name="reviewsAvailable" value="Yes" checked={formData.reviewsAvailable === 'Yes'} onChange={handleInputChange} readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
      <label htmlFor="reviewsAvailableYes">Yes</label>
    </div>
    <div className="radio-option">
      <input type="radio" id="reviewsAvailableNo" name="reviewsAvailable" value="No" checked={formData.reviewsAvailable === 'No'} onChange={handleInputChange} readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
      <label htmlFor="reviewsAvailableNo">No</label>
    </div>
  </div>
</div>

{waiverOption === 'waiver' && (
    <>
        <div className="form-group">
          <label htmlFor="listenWaiver">Who listened to your waiver talk?</label>
          <input type="text" id="listenWaiver" name="listenWaiver" value={formData.listenWaiver} onChange={handleInputChange} required readOnly={isReadOnly} className={isReadOnly ? 'readonly' : ''}/>
        </div>
    </>
)}
            <button type="submit" onClick={handleFormSubmit}>Save</button>
            <button type="button" onClick={handleEdit} disabled={!isReadOnly}>Edit</button>
            <button type="button" onClick={handleClearForm}>Clear Form</button>
      </form>
    </div>
  );
}

export default Form;