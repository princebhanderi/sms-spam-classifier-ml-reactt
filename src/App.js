import React, { useState } from 'react';
import axios from 'axios';
import bg from './assets/BG_pattern.svg';
import ball from './assets/BG_ball.svg';
import vector from './assets/Vector.svg';
import spam from './assets/Spam.svg';
import not_spam from './assets/Not_Spam.svg';
import menu from './assets/Menu.svg';
import Typewriter from './components/typewriter'
function App() {
  const [message, setMessage] = useState('');
  const [prediction, setPrediction] = useState('');
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (event) => {
    setChecking(true);
    event.preventDefault();
    try {
      console.log(message);
      const response = await axios.post('http://127.0.0.1:5000/predict', { message });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setPrediction('Error predicting message');
    }
    setChecking(false);
  };

  return (
    <div className="bg-[#070B1D] w-screen h-screen relative overflow-hidden">

      <img src={bg} alt='bg' className=' h-screen absolute bottom-0 left-0'/>
      <img src={ball} alt='ball' className=' w-1/2 absolute -bottom-3 left-1/4'/>
      <img src={vector} alt='vector' className='absolute h-[15vh] top-[41vh] left-[5vh]' />
      <img src={menu} className=' absolute top-[5vh] right-[5vh] w-[2vw]'/>

      <h1 className=' text-white roboto-regular text-[4vh] absolute left-[5vh] top-[6vh]'>SpamScan</h1>
      
      <div className='flex absolute top-[25vh] left-[15vw]'>

        <div className=' text-white max-w-[50vw] '>
          <p className=' dm-sans text-[#898A8C] text-[3.5vh] tracking-wider'>Powered by AI</p>

          <p className=' roboto300 text-[5vh] font-extralight max-w-[35vw] tracking-wide'><span className=' roboto-regular text-[#1156C6]'>SpamScan:</span><Typewriter/></p>

          <p className=' max-w-[32vw] opacity-95 roboto300 mt-2 tracking-widest text-[2.5vh]'>SpamScan utilizes cutting-edge technology to accurately detect and filter out spam content, ensuring your communications remain clean, secure, and uninterrupted.</p>
        </div>
        
        <div className=' ml-[5vw] mt-[3vh] relative'>
          <form onSubmit={handleSubmit} className=''>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className={"roboto300 bg-[#070B1D] text-[#AAAAAA] border rounded-lg text-[2vh] py-4 px-5 h-[28vh] w-[28vw] border-white " + ((prediction === "Spam" || prediction === "Not Spam") ? (prediction === "Spam" ? "shadow-[0px_1.58px_6.33px_0px_#26282E37,6px_6px_6.7px_0px_#F56C89]": "shadow-[0px_1.58px_6.33px_0px_#26282E37,6px_6px_6.7px_0px_#21DDB8]") :"shadow-[0px_1.58px_6.33px_0px_#26282E37,6px_3px_6.7px_0px_#FFFFFF25]")} placeholder='Enter your message'/>
            <br />
            <button type="submit" disabled={!message} className={ message ? "py-2 px-3 dm-sans text-white rounded-lg  w-[12vw] mt-3  bg-[#044FC7]" : "py-2 px-3 dm-sans text-white opacity-80 rounded-lg  w-[12vw] mt-3 bg-[#0E3981] cursor-not-allowed"}>{ checking ? "Checking..." :"Check Now!"}</button>
          </form>

          {(prediction === 'Spam' || prediction === 'Not Spam') ? 
          (
            prediction === 'Spam' ?
            (
              <div className=' absolute bottom-1 left-[13vw]'>
                <img src={spam} className=' h-[4.5vh]'/>
              </div>
            ):
            (
              <div className=' absolute bottom-1 left-[13vw]'>
                <img src={not_spam} className=' h-[4.5vh]'/>
              </div>
            )
          ):
          (
            prediction ? 
            (
              <div className=' absolute bottom-2 left-[13vw]'>
                <p className=' text-white'>{prediction}</p>
              </div>
            ):
            (
              <></>
            )
          )
        }
        </div>
      
      </div>

      <p className=' absolute roboto-regular max-w-[3vw] text-white text-[1.5vh] bottom-[5vh] left-[5vh] opacity-95'>WE ARE IN TOP</p>
      <p className=' absolute roboto-regular text-white text-[1.5vh] bottom-[6vh] right-[5vh]'>#SpamDetection_PoweredbyAI</p>
      <p className=' absolute roboto-regular text-white text-[1.5vh] -rotate-90 top-[48vh] right-[2vh] underline'>Let’s Start With Us</p>
    </div>
  );
}

export default App;