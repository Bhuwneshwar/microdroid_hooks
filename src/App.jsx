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

  useEffect(() => {}, []);
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
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        className="search"
        value={search}
        placeholder="Search"
      />
      <div className="btns">
        {filtering.map((v,i) => {
          return (
            <button key={i} onClick={(e) => trigger(v)}>
              {v.replace(/[.\-/]/gi, " ")}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default App;
