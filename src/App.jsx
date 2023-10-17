import React, { useState } from 'react';
import './App.css'

function App() {

  const [submitMessage, setSubmitMessage] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbz-fLO5SZvlegoPA3hxURrsTNFyGpBqg7oRpT8FR7mhbmAMaBSAA68D88Ec0gDp1Sz6gw/exec";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    setIsLoading(true); // Aktifkan loading

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
      });

      if (response.ok) {
        console.log("Success!", response);
        alert('Success seng!!!')
        setSubmitStatus('Success!')
        setSubmitMessage('Data berhasil dikirimkan ke Google Sheets')
        form.reset()
      } else {
        console.error("Error!", response.statusText);
        setSubmitStatus('error!')
        setSubmitMessage(`Error: ${response.statusText}`)
      }
    } catch (error) {
      setSubmitStatus('error!')
      setSubmitMessage(`Error: ${error.message}`)
    } finally {
      setIsLoading(false); // Nonaktifkan loading setelah pengiriman selesai
    }
  };

  return (
    <>
      <form className='form-container' name="submit-to-google-sheet" onSubmit={handleSubmit}>
        <div className="box-input input-name">
          <label htmlFor="username" className='label'>Username : </label>
          <input name="username" type="text" placeholder="Username" required />
        </div>
        <div className="box-input input-name">
          <label htmlFor="nominal" className='label'>Nominal : </label>
          <input name="nominal" type="number" placeholder="Nominal" required />
        </div>
        <button className='cta' type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>

      </form>
    </>
  );
}

export default App;
