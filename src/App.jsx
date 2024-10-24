import { useState, useEffect } from "react";
import "./App.css";
import links from "./लिंक्स2.json";
import axios from "axios";

function App() {
  const [link, setLink] = useState(links);
  const [filtering, setFiltering] = useState(
    links.commands.sort((a, b) => a.localeCompare(b))
  );
  const [bash_url, setBase_url] = useState("");
  const [search, setSearch] = useState("");
  const [Result, setResult] = useState("click on button");

  const [deviceHooks, setDeviceHooks] = useState([]);
  const [deviceName, setDeviceName] = useState("");
  const [deviceLink, setDeviceLink] = useState("");

  // Getting data from localStorage
  const getData = () => {
    const storedData = localStorage.getItem("deviceHooks");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log({ parsedData });
      setDeviceHooks(parsedData);
    } else {
      console.log("No data found");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Storing data in localStorage
  const setData = (data) => {
    // const data = { name: "John", age: 30 };
    localStorage.setItem("deviceHooks", JSON.stringify(data));
  };

  const addDevice = () => {
    if (deviceName === "") return alert("device name is required");
    if (deviceLink === "") return alert("device link is required");
    setDeviceHooks((prev) => {
      const newArray = [...prev, { link: deviceLink, name: deviceName }];
      setData(newArray);
      return newArray;
    });
  };

  const deleteDevice = () => {
    const removeDevice = deviceHooks.filter((h) => h.link !== bash_url);
    setDeviceHooks(removeDevice);
    setData(removeDevice);
  };

  useEffect(() => {
    if (search.length === 0) {
      setFiltering(link.commands.sort((a, b) => a.localeCompare(b)));
    } else {
      //const dynamicValue = 'apple';
      const pattern = new RegExp(search, "i"); // Create regex object with dynamic value

      //const arr =

      //const filteredArr = arr.filter((item) => pattern.test(item));
      //console.log(filteredArr); // Output: ['apple']

      const filtered = link.commands.filter((v) =>
        pattern.test(v.replace(/[.\-/]/gi, " "))
      );
      console.log(filtered);
      setFiltering(filtered.sort((a, b) => a.localeCompare(b)));
    }
  }, [search]);
  const trigger = async (v) => {
    try {
      if (bash_url == "") {
        setResult("please select any device");
        alert("Please select a device ");
        return;
      }
      setResult("Please wait...");

      const { data } = await axios.get(bash_url + v);
      console.log({ data });
      setResult("Triggered fired.");

      //alert(res);
    } catch (e) {
      alert(e.message);
      console.log(e);
      setResult("invalid web hook.");
    }
  };
  return (
    <>
      <h2> Device Control web Hooks</h2>
      <div>
        {deviceHooks.map((v) => {
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
        <button onClick={deleteDevice}>Delete Device</button>
      </div>
      <br />
      <div>
        <label htmlFor="deviceName">Device Name</label>
        <input
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          id="deviceName"
          type="text"
          placeholder="Enter Device Name"
        />
        <br />
        <label htmlFor="deviceLink">Device Link</label>
        <input
          value={deviceLink}
          onChange={(e) => setDeviceLink(e.target.value)}
          type="text"
          id="deviceLink"
          placeholder="Paste a device link"
        />
        <br />
        <button onClick={addDevice}>Add</button>
      </div>
      <h3>Result : {Result}</h3>
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        className="search"
        value={search}
        placeholder="Search"
      />
      <div className="btns">
        {filtering.map((v, i) => {
          return (
            <button key={i} onClick={(e) => trigger(v)}>
              {v.replace(/[.\-/]/gi, " ")}
            </button>
          );
        })}
      </div>
      <div>
        App Link
        <a href="https://play.google.com/store/apps/details?id=com.arlosoft.macrodroid&pcampaignid=web_share">
          MacroDroid App in Playstore
        </a>
        <br />
        Macro Download
        <a href={"hooks.micro"} download={true}>
          {" "}
          download micro
        </a>
      </div>
    </>
  );
}

export default App;
