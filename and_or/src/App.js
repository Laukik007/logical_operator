import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [state, setstate] = useState({
    1: {
      type: -1,
      value: null,
      children: [],
    },
  });
  const [count, setcount] = useState(1);
  // useEffect(() => {
  //   console.log("state", state);
  // }, [state]);
  const handleChange = (id, val) => {
    console.log("val ", val);
    console.log("inside handlechange");

    if (val === "and") {
      setstate((prev) => {
        let obj = prev[id];
        if (!obj.children.includes(count + 1)) obj.children.push(count + 1);
        if (!obj.children.includes(count + 2)) obj.children.push(count + 2);
        obj.type = "and";
        return {
          ...prev,
          [id]: obj,
          [count + 1]: {
            type: -1,
            value: null,
            children: [],
          },
          [count + 2]: {
            type: -1,
            value: null,
            children: [],
          },
        };
      });

      setcount(count + 2);
    } else if (val === "or") {
      setstate((prev) => {
        let obj = prev[id];
        if (!obj.children.includes(count + 1)) obj.children.push(count + 1);
        if (!obj.children.includes(count + 2)) obj.children.push(count + 2);
        obj.type = "or";
        return {
          ...prev,
          [id]: obj,
          [count + 1]: {
            type: -1,
            value: null,
            children: [],
          },
          [count + 2]: {
            type: -1,
            value: null,
            children: [],
          },
        };
      });

      setcount(count + 2);
    } else if (val === "true") {
      setstate((prev) => {
        let obj = state[id];
        obj.type = "constant";
        obj.value = true;
        return {
          ...prev,
          [id]: obj,
        };
      });
      setcount(count + 1);
    } else if (val == "false") {
      setstate((prev) => {
        let obj = state[id];
        obj.type = "constant";
        obj.value = false;
        return {
          ...prev,
          [id]: obj,
        };
      });

      setcount(count + 1);
    }

    console.log("count", count);
  };
  function view(id) {
    console.log("id", id);
    let obj = state[id];
    console.log(obj);
    let returnNode = (
      <>
        <div style={{ marginLeft: "1rem" }}>
          <select
            // type={obj.type}
            // value={obj.value}
            onChange={(e) => {
              let newVal = e.target.value;
              handleChange(id, newVal);
            }}
          >
            <option value="choose">Choose</option>
            <option value="false">False</option>
            <option value="true">True</option>
            <option value="and">And</option>
            <option value="or">Or</option>
          </select>
          {obj?.children.length > 0
            ? obj.children.map((id) => {
                console.log("id of children", id);
                return view(id);
              })
            : null}
        </div>
      </>
    );
    return returnNode;
  }

  return (
    <>
      {view(1)}
      {console.log("state from handlechange later", state)}
    </>
  );
}

export default App;
