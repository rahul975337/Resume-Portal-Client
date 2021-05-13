import { useState } from "react";
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
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const department = e.target.department.value;
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const company = e.target.company.value;
    const designation = e.target.designation.value;

    if (
      !department ||
      !name ||
      !fileUrl ||
      !phone ||
      !email ||
      !company ||
      !designation
    ) {
      return toast("fill all the details", { type: "error" });
    }
    await projectFirestore
      .collection(department)
      .doc(name)
      .set({
        department: department,
        name: name,
        phone: phone,
        email: email,
        company: company,
        designation: designation,
        file: fileUrl,
      })
      .then(() => {
        toast("Successfully Filled", { type: "success" });
      })
      .catch((error) => {
        alert(error.message);
      });
    setDepartment("");
    setName("");
    setPhone("");
    setEmail("");
    setCompany("");
    setDesignation("");
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = projectStorage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };
  return (
    <div className="app">
      <ToastContainer position="bottom-center" />
      <div className=" add-project-box">
        <form onSubmit={handleSubmit}>
          <label className="upload--label">
            <input type="file" onChange={handleFileChange} />
            <span>+</span>
          </label>
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
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Phone</label>
          </div>
          {/*  city*/}
          {/*  state*/}
          {/*  department*/}
          <div className="add-project-form">
            <input
              type="text"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <label>Department</label>
          </div>
          {/*  experience*/}
          {/* email */}
          <div className="add-project-form">
            <input
              type="text"
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

          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default App;

/*
username, phone, email, currentCompy, designation
*/
