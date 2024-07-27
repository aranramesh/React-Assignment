import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
import "./segment.css";

function Segment() {
  const [show, setShow] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);

  const schemaOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setSegmentName("");
    setSelectedSchemas([]);
  };

  const handleAddSchema = () => {
    setSelectedSchemas([...selectedSchemas, ""]);
  };

  const handleSchemaChange = (index, value) => {
    const newSchemas = [...selectedSchemas];
    newSchemas[index] = value;
    setSelectedSchemas(newSchemas);
  };

  const handleSaveSegment = () => {
    const segmentData = {
      "segment name": segmentName,
      schema: selectedSchemas
        .filter(schema => schema !== "")
        .map(schema => {
          const schemaObj = schemaOptions.find(option => option.value === schema);
          return { [schema]: schemaObj.label };
        })
    };
    console.log(JSON.stringify(segmentData, null, 2));
    Swal.fire({
      title: "Segment Saved successfully!",
      text: "Check the console for the query",
      icon: "success",
      customClass: {
        popup: 'swal-custom'
      }
    });
    handleClose();
  };

  return (
    <div className="segment-container">
      <Button variant="transparent" className="border-white border-1 text-white rounded-0" onClick={handleShow}>
        Save segment
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <div className="offcanvas-header-custom">
          <IoIosArrowBack className="back-icon" onClick={handleClose} />
          <span>Saving Segment</span>
        </div>
        <Offcanvas.Body>
          <input
            type="text"
            placeholder="Enter the Name of the Segment"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            className="segment-name-input"
          />
          <p>To save your segment, you need to add the schemas to build the query</p>
          <div>
            <div className="schema-box">
              <p className=""> <span className="green-circle"></span> User</p>
              <p className=""> <span className="red-circle"></span> Group</p>
            </div>
          </div>
          <div className="schema-container">
            {selectedSchemas.map((schema, index) => (
              <select
                key={index}
                value={schema}
                onChange={(e) => handleSchemaChange(index, e.target.value)}
                className="schema-select"
              >
                <option value="">Add schema to segment</option>
                {schemaOptions.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={selectedSchemas.includes(option.value) && schema !== option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            ))}
          </div>

          <button
            onClick={handleAddSchema}
            className="add-schema-btn"
            disabled={selectedSchemas.length >= schemaOptions.length}
          >
            + Add new schema
          </button>

          <div className="button-group">
            <Button variant="success" onClick={handleSaveSegment}>Save the Segment</Button>
            <Button variant="danger" onClick={handleClose}>Cancel</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Segment;
