import { useState, useEffect } from "react";
import "./App.css";
import links from "./लिंक्स2.json";
import axios from "axios";

function App() {
  const [link, setLink] = useState(links);
  const [bash_url, setBase_url] = useState("");
  const [Result, setResult] = useState("click on button");

  useEffect(() => {}, []);
  const trigger = async (v) => {
    try {
      if (bash_url == "") return setResult("please select any device");

      const res = await axios.get(bash_url + v);
      console.log(res);
      //alert(res);
    } catch (e) {
      // alert(e);
      console.log(e);
      setResult("Maybe worked.");
    }
  };
  return (
    <>
      <h2> Device Control web Hooks</h2>
      <div>
        {link.devices.map((v) => {
          return (
            <div className="devices">
              <input
                onChange={(e) => setBase_url(e.target.value)}
                type="radio"
                name="device"
                id={v.link}
                value={v.link}
              />
              <label htmlFor={v.link}>{v.name}</label>
            </div>
          );
        })}
      </div>
      <h3>Result : {Result}</h3>
      <div className="btns">
        {link.commands.map((v) => {
          return <button onClick={(e) => trigger(v)}>{v}</button>;
        })}
      </div>
    </>
  );
}

export default App;
