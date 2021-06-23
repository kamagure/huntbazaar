import React, { useState, useEffect } from 'react';
import Global from '../layouts/Global';
import api from '../../api';
import SweetAlert from 'react-bootstrap-sweetalert';

const Setting = () => {
  // local state for the datetime data and loading
  const [clock, setClock] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Function to show alert overlay when setting succesfully updated
  const updateSuccess = () => {
    const getAlert = () => (
      <SweetAlert
          success
          title="Update Success!"
          onConfirm={() => { setAlert(null); }}
          onCancel={() => { setAlert(null); }}
          timeout={2000}
          confirmBtnText="Continue"
          >
          The data has been successful update!
      </SweetAlert>
    );
    setAlert(getAlert());
  }

  // Function to show alert overlay when setting was failed to be updated 
  const updateFailed = () => {
    const getAlert = () => (
        <SweetAlert
            error
            title="Update Failed"
            onConfirm={() => { setAlert(null); }}
            onCancel={() => { setAlert(null); }}
            timeout={2000}
            confirmBtnText="Continue"
            >
            Failed to edit setting!
        </SweetAlert>
    );
    setAlert(getAlert());
  }


  // onEditSubmit method
  // this asynchronous method used when the submit button is clicked to update the data to api
  // this method will alert the message whether the data updated successfully or failed 
  const onEditSubmit = async () => {
    setLoading(true);
    try {
      const arrClock = clock.split('T')
      const parsedClock = arrClock[0] + ' ' + arrClock[1];  
      await api.updateSetting({
        "datetime": parsedClock
      });
      updateSuccess();
    } catch(error) {
      updateFailed();
      console.log(error.response.data)
    } finally {
      setLoading(false);
    }
  };

  // fetchSetting method
  // this method used to fetch the setting data from api
  // this method will updated the current clock state
  const fetchSetting = () => {
    api.getSetting().then(res => {
      const result = res.data;
      const setting = result.data;
      const arr = setting.datetime.split(' ');
      const clock = arr[0] + 'T' + arr[1];
      setClock(clock);
    })
  }

  // useEffect method
  // Tell the React to call fethSetting after render
  useEffect(() => {
    fetchSetting();
  }, []);
  
  
  // Show spinner while calling login service
  let buttonFill;
  if (!loading) {
      buttonFill = "CHANGE";
  } else {
      buttonFill = <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  }
  return (
    // Use Global template
    
    <Global>
      {/* Setting Card */}
      <div className="card my-3 text-center">
        <div className="card-body">
          
          <h5 className="card-title">Change Due Polling</h5>
          
          {/* Form for edit setting */}
          <form>
            <div className="form-group">
              <label className="uppercase text-dark font-weight-bold">DATE TIME (DD-MM-YYYY HH:MI)</label>
              <input 
                type="datetime-local" 
                className="form-control" 
                id="datetime-local" 
                value={clock}
                onChange={e => setClock(e.target.value)} />
            </div>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={onEditSubmit}
              disabled={loading}
            >
              {buttonFill}
            </button>
            {alert}
          </form>      
        </div>
      </div>
    </Global>
  );
}

export default Setting;