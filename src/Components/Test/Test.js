import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import "./Test.css"

// const options = [
//   { label: "Grapes 🍇", value: "grapes" },
//   { label: "Mango 🥭", value: "mango" },
//   { label: "Strawberry 🍓", value: "strawberry", disabled: true },
// ];

const options = [
    { label:'Livestream', value: "livestream" },
    { label: 'Video review, Pr', value: "pr" },
    { label: 'Chụp hình quảng cáo, Lookbook', value: "lookbook"},
    { label:'Chụp Feedback', value: "feedback" },
    { label:'Trợ lý (Photographer, Lên ý tưởng,...)', value: "troly" },
    { label: 'Khác', value: "khác" },
    { label: 'Tổng hợp', value: "th", disabled: true },
  ];

  const options2 = [
    { label:'TP Hồ Chí Minh', value: "livestream" },
    { label: 'Hà Nội', value: "pr" },
    { label: 'Đà Nẵng', value: "lookbook"},
    { label:'Huế', value: "feedback" },
    { label:'Cần Thơ', value: "troly" },
    { label: 'Quảng Ninh', value: "khác" },
    { label: 'Nha Trang', value: "th", disabled: true },
  ];





const Example = () => {
  const [selected, setSelected] = useState([]);
  const [selected2, setSelected2] = useState([]);

  return (
    <div>
      <h1>Lĩnh vực</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <div style={{ width:"400px", color:"succsess"}}>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Lĩnh vực"
      />
      </div>
      <br/>

      <h1>Thành phố</h1>
      <pre>{JSON.stringify(selected2)}</pre>
      <div style={{ width:"400px", color:"succsess"}}>
      <MultiSelect
       hasSelectAll={("hasSelectAll", false)}
        options={options2}
        value={selected2}
        onChange={setSelected2}
        labelledBy="Lĩnh vực"
      />
      </div>
    </div>
  );
};

export default Example;