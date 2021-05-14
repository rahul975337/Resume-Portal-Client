import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { projectFirestore, projectStorage } from "./firebase";

function App() {
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [resume, setResume] = useState("ld");
  const [pic, setPic] = useState("dd");
  // to handle option clear
  // const [value, setValue] = useState("");

  const handleDepartment = async (e) => {
    setDepartment(e.target.value);
    // if (!department)
    //   return toast("Please select a department", { type: "dark" });
  };

  // const values = [
  //   { value: "it", label: "IT and Software" },
  //   {
  //     value: "bank",
  //     label: "Banking",
  //   },
  //   { value: "insurance", label: "Insurance" },
  //   { value: "buisness", label: "Buisness" },
  // ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const company = e.target.company.value;
    const designation = e.target.designation.value;
    if (phone.length !== 10)
      return toast("Please enter 10 digit mobile number", { type: "dark" });
    if (!department)
      return toast("Please select a department", { type: "dark" });
    if (
      !department ||
      !name ||
      // !resume ||
      // !pic ||
      (!phone && phone.length() !== 10) ||
      !email ||
      !company ||
      !designation
    ) {
      return toast("Please fill all the details correctly ", { type: "error" });
    }

    await projectFirestore
      .collection(department)
      .doc(email)
      .set({
        department: department,
        name: name,
        phone: phone,
        email: email,
        company: company,
        designation: designation,
        resume: resume,
        pic: pic,
      })
      .then(() => {
        toast("Successfully Filled", { type: "success" });
      })
      .catch((error) => {
        alert(error.message);
      });
    // setDepartment("");
    setName("");
    setPhone("");
    setEmail("");
    setCompany("");
    setDesignation("");
    setResume("");
    setPic("");
    // setValue("");
  };
  const handleResume = async (e) => {
    const file = e.target.files[0];

    const storageRef = projectStorage.ref();
    if (!file) return toast("please select a file", { type: "dark" });
    const fileRef = storageRef.child(file.name);
    await fileRef
      .put(file)
      .then(() => {
        alert("Resume upload successful");
      })
      .catch((error) => {
        toast("please select a file", { type: "dark" });
      });
    setResume(await fileRef.getDownloadURL());
  };
  const handlePic = async (e) => {
    const file = e.target.files[0];
    const storageRef = projectStorage.ref();
    if (!file) return toast("please select a file", { type: "dark" });
    const fileRef = storageRef.child(file.name);
    await fileRef
      .put(file)
      .then(() => {
        alert("Picture upload successful");
      })
      .catch((error) => {
        toast("please select a file", { type: "dark" });
      });
    setPic(await fileRef.getDownloadURL());
  };

  return (
    <div className="app">
      <ToastContainer position="bottom-center" />
      <div className=" add-project-box">
        <form onSubmit={handleSubmit}>
          {/* name */}
          <div className="add-project-form">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Name</label>
          </div>
          {/*  phone*/}
          <div className="add-project-form">
            <input
              type="number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Phone</label>
          </div>
          {/*  city*/}
          {/*  state*/}

          {/*  experience*/}
          {/* email */}
          <div className="add-project-form">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          {/* currentcompany */}
          <div className="add-project-form">
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <label>Company</label>
          </div>
          {/* designation */}
          <div className="add-project-form">
            <input
              type="text"
              name="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
            <label>Designation</label>
          </div>

          {/*  department*/}
          <div className="add-project-form" id="menu-box">
            <label>Department</label>
            <div className="box">
              <select onChange={handleDepartment}>
                <option value="" selected></option>
                <option value="it">IT Software</option>

                <option value="bank">Banking</option>
                <option value="insurance">Insurance</option>
                <option value="buisness">Buisness</option>
              </select>
            </div>
          </div>
          <div className="buttons">
            <span className="upload-btn-wrapper">
              <button className="btn">Resume</button>
              <input type="file" onChange={handleResume} />
            </span>
            <span className="upload-btn-wrapper">
              <button className="btn">Picture</button>
              <input type="file" onChange={handlePic} />
            </span>
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default App;
