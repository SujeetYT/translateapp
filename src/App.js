import './App.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import { Load } from './components/Load';

function App() {
  const [options, setOptions] = useState([]);
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [load, setLoad] = useState(true);
  const [message, setMessage] = useState("Please wait while our server responds...")

  const translate = async ()=>{
    try {
      setLoad(true);
      setMessage("Translating...");
      const params = new URLSearchParams();
      params.append("q", input);
      params.append("source", from);
      params.append("target", to);
      params.append("api_key", 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
      
      const res = await axios.post("https://libretranslate.de/translate", params, {
        Headers : {
          'accept' : 'application/json',
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      })
      setOutput(res.data.translatedText);
      setLoad(false);

    } catch (error) {
      alert(error.message);
      setLoad(false);
    }
  }

  useEffect(()=>{
    axios.get('https://libretranslate.de/languages', 
    {Headers:{'accept' : 'application/json'}}).then(res => {
      // console.log(res.data);
      setOptions(res.data)
      setLoad(false);
    })
  }, [])


  // curl -X GET 'https://libretranslate.de/languages' -H 'accept: application/json'

  return (
    <>
      {load && <Load message={message}/>}
      <div className="App">
        <div className='heading'>
          <div>
            From ({from}):  
            <select onChange={e => setFrom(e.target.value)}>
              {options.map(opt => <option value={opt.code} key={opt.code}>{opt.name}</option>)}
            </select>
          </div>
          <div>
            To ({to}):  
            <select onChange={e => setTo(e.target.value)}>
              {options.map(opt => <option value={opt.code} key={opt.code}>{opt.name}</option>)}
            </select>
          </div>
        </div>
        <div className='mainArea'>
          <div>
            {/* Input text area */}
            <textarea onInput={e => setInput(e.target.value)}></textarea>
          
            {/* Output text area */}
            <textarea defaultValue={output}></textarea>
          </div>

          {/* Translate button */}
          <button type="submit" onClick={e => translate()}>Translate</button>

        </div>

      </div>
    </>
  );
}
    

export default App;
