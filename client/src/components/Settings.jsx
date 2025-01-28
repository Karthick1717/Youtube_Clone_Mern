import React, { useEffect, useState } from 'react';
import './Settings.css';
import axios from "axios";
import { useSelector } from 'react-redux';
import Channel from './Channel';

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="settings-sidebar">
      <h3 className="heading">Settings</h3>
      <ul>
        <li onClick={() => setActiveSection('account-settings')}>Profile Information</li>
        <li onClick={() => setActiveSection('profile-info')}>Account Settings</li>
        <li onClick={() => setActiveSection('upload')}>Upload</li>
      </ul>
    </div>
  );
};


const Content = ({ activeSection }) => {
  const token = useSelector((state) => state.user.token);
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [btn,setbtn]=useState(true)
  const [pass1,setpass1]=useState("")
  const [pass2,setpass2]=useState("")

  const fetchAccountInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:7000/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccountInfo(response.data.message);
    } catch (err) {
      setError('Failed to fetch account info.'); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeSection == 'account-settings' && token) {
      fetchAccountInfo();
    }
  }, [activeSection, token]);
     
    
  if (activeSection === "profile-info") {
    if (!token) {
        return (
            <>
                <p className="settings-content">No Access</p>
            </>
        );
    }
    
    return (
        <>
            <button className="btn1" onClick={() => setbtn(false)}>Change Password</button>
            {!btn && <p className="p" onClick={() => setbtn(true)}>Hide</p>}
            {
                !btn && (
                    <div className="password-container">
                        <label className="password1">Password:</label>
                        <input
                            className="password2"
                            type="password"
                            required
                            onChange={(e) => setpass1(e.target.value)}
                        />
                        <label className="password1">Confirm Password:</label>
                        <input
                            className="password2"
                            type="password"
                            required
                            onChange={(e) => setpass2(e.target.value)}
                        />
                        <button
                            className="btn1"
                            onClick={async () => {
                                if (token) {
                                    if (pass1 === pass2) {
                                        try {
                                            const response = await axios.post('http://localhost:7000/password', { password:pass1 }, {
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                },
                                            });
                                            console.log(response);
                                        } catch (err) {
                                            console.log(err);
                                        }
                                    } else {
                                        console.log("Password and confirm password should be the same");
                                    }
                                }
                            }}
                        >
                            Change
                        </button>
                    </div>
                )
            }
        </>
    );
}

  if (activeSection === 'account-settings') {


  return (
    <div className="settings-content">
      <h3 className="account-settings-title">Profile</h3>
      {loading && <p>Loading...</p>} 
      {error && <p className="error-message">{error}</p>} 
      {accountInfo && (
        <div className="account-info">
          <div className="account-info-item">
            <label className="account-info-label">Name:</label>
            <span className="account-info-value">{accountInfo.name}</span>
          </div>
          <div className="account-info-item">
            <label className="account-info-label">Email:</label>
            <span className="account-info-value">{accountInfo.email}</span>
          </div>
          <div className="account-info-item">
            <label className="account-info-label">Channel:</label>
            <span className="account-info-value">{accountInfo.channel}</span>
          </div>
        </div>
      )}
      {!loading && !error && !accountInfo && <p>No profile information available.</p>} 
    </div>
  );


}
if (activeSection === 'upload'){
  return(
    <>
    <Channel />
    </>
  )
}
};


const Settings = () => {
  const [activeSection, setActiveSection] = useState('account-settings');

  return (
    <div className="settings-wrapper">
      <Sidebar setActiveSection={setActiveSection} />
      <Content activeSection={activeSection} />
    </div>
  );
};

export default Settings;
