import "./App.css";
import { useState } from "react";
import Modal from "./t&m_model.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
// import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { useForm } from "react-hook-form";
// import { CardBody } from "react-bootstrap";



export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [otherCourse, setOtherCourse] = useState("");
  const [role, setRole] = useState("");
  const [qualification, setQualification] = useState("");
  const [completionYear, setCompletionYear] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [localAddress, setLocalAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [isSameAddress, setIsSameAddress] = useState(false); 
  const [validated, setValidated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = async (data) => {
    const response = await axios.post("http://localhost:8080/register", data);
    console.log(response);
  };

  const handleCheckboxChange = () => {
    setIsSameAddress(!isSameAddress);  // Toggle the checkbox state
    if (!isSameAddress) {
      setPermanentAddress(localAddress);  // Auto-fill Permanent Address
    } else {
      setPermanentAddress('');  // Clear Permanent Address if checkbox is unchecked
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const termsCondition = () => {
    console.log("Opening modal...");
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal...");
    setModalOpen(false);
  };

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setSelectedCourse(value);

    if (value !== "other") {
      setOtherCourse("");
    }
  };

  return (
    
      
        <Container fluid>
          <Row>
            <div
              className="success-msg alert alert-success alert-dismissible fade hide"
              role="alert"
            >
              <strong>THANKS. Your registration is successful.</strong>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <Col sm={12}>
              <form
                className="registration-form mb-3"
                method="post"
                action=""
                encType="multipart/form-data"
              >
                <Card>
                  <Card.Header>Personal Details</Card.Header>
                  <Card.Body>
                    <Form.Group className="form-group row mb-3">
                      <Form.Label className="col-sm-2 col-form-label">
                        Name
                      </Form.Label>
                      <div className="col-sm-10">
                        <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        id='name'
                        name="name"
                        isInvalid= {!!errors.name}
                        autoFocus                      
                        {...register("name", {
                          required: "Full name is required",
                          pattern: {
                            value: /^[A-Za-z ]+$/,
                            message:  "Full name can only contain letters and spaces", 
                          },
                          minLength: {
                            value: 4,
                            message:
                              "Full name must be at least 4 characters long",
                          },
                          maxLength: {
                            value: 30,
                            message:
                              "Full name must be at most 30 characters long",
                          },
                        })}
                        />
                         {errors.name && (
                      <Form.Control.Feedback type="invalid">
                        {errors.name?.message}
                      </Form.Control.Feedback>
                    )}
                      </div>
                    </Form.Group>

                    <Form.Group className="form-group row mb-3">
                      <Form.Label className="col-sm-2 col-form-label">
                        Email
                      </Form.Label>
                      <div className="col-sm-10">
                        <Form.Control
                          type="text"
                          placeholder="Enter your email address"
                          id='email'
                          name='email'
                          {...register('email',{
                            required: true,
                          })}
                          />
                          {errors.email && (
                            <Form.Control.Feedback type='invalid'>
                              Enter a valid email
                            </Form.Control.Feedback>
                          )}
                      </div>
                    </Form.Group>

                    <Form.Group className="form-group row mb-3">
                      <Form.Label className="col-sm-2 col-form-label" >
                          Phone
                      </Form.Label>                     
                      <div className="col-sm-10">
                        <Form.Control
                        type="text"
                        placeholder="Enter your phone number"
                        id="phone"
                        name="phone"
                        {...register("phone", {
                          required: true,
                          pattern: /^[0-9]+$/,
                          minLength: 10,
                          maxLength: 10,
                        })}
                      />
                     {errors.phone && (
                      <Form.Control.Feedback type="invalid">
                        Enter a proper phone number with 10 digits
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Form.Group>

                    <Form.Group className="form-group row mb-3">
                      <Form.Label className='col-sm-2 col-form-label'>
                        Date of Birth
                      </Form.Label>
                      <div className="col-sm-10">
                        <Form.Control
                        type="date"
                        placeholder="Enter your date of birth"
                        id="dob"
                        name="dob"
                        {...register("dob", {
                          required: true,
                        })}
                        />
                          {errors.dob && (
                      <Form.Control.Feedback type="invalid">
                        Enter your Date of Birth
                      </Form.Control.Feedback>
                    )}
                      </div>
                    </Form.Group>

                    <Form.Group className='form-group row mb-3'>
                    <Form.Label className="col-sm-2 col-form-label">
                    Gender
                  </Form.Label>
                      <div className="col-sm-10">
                      {["radio"].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Male"
                          name="gender"
                          type={type}
                          id="male"
                          {...register("gender", { required: true })}
                          value="male"
                        />
                        <Form.Check
                          inline
                          label="Female"
                          name="gender"
                          type={type}
                          id="female"
                          {...register("gender", { required: true })}
                          value="female"
                        />
                        <Form.Check
                          inline
                          label="Other"
                          name="gender"
                          type={type}
                          id="other"
                          {...register("gender", { required: true })}
                          value="other"
                        />
                      </div>
                    ))}
                      </div>
                    </Form.Group>


                  <Form.Group className="form-group row mb-3">
                  <Form.Label className="col-sm-2 col-form-label">
                    Aadhaar Card
                  </Form.Label>
                  <div className="col-sm-10 row">
                    <div className="col-sm-6">
                      <Form.Control
                        type="file"
                        placeholder="Aadhaar Card Front"
                        id="aadharFront"
                        name="aadharFront"
                        {...register("aadharFront", {
                          required: true,
                        })}
                      />
                      {errors.aadharFront && (
                        <Form.Control.Feedback type="invalid">
                          Upload Aadhaar Card Back Side Photo
                        </Form.Control.Feedback>
                      )}
                      <small className="form-text text-muted">
                        Upload a jpeg/jpg/png file of size not exceeding 4 MB.
                      </small>
                    </div>
                    <div className="col-sm-6">
                      <Form.Control
                        type="file"
                        placeholder="Aadhaar Card Back"
                        id="aadharBack"
                        name="aadharBack"
                        {...register("aadharBack", {
                          required: true,
                        })}
                      />
                      {errors.aadharBack && (
                        <Form.Control.Feedback type="invalid">
                          Upload Aadhaar Card Back Side Photo
                        </Form.Control.Feedback>
                      )}
                      <small className="form-text text-muted">
                        Upload a jpeg/jpg/png file of size not exceeding 4 MB.
                      </small>
                        </div>
                      </div>
                    </Form.Group>
                  </Card.Body>
                </Card>
                 

              <Card>
                <Card.Header>Parent / Guardian Details</Card.Header>
                <Card.Body>
                <Form.Group className="form-group row mb-3">
                  <Form.Label className="col-sm-2 col-form-label">
                    Parent / Guardian / Spouse Name
                  </Form.Label>
                  <div className="col-sm-10">
                  <Form.Control
                      type="text"
                      placeholder="Enter your parent / guardian / spouse name"
                      id="fname"
                      name="fname"
                      autoFocus
                      {...register("fname", {
                        required: true,
                        pattern: /^[A-Za-z ]+$/,
                        minLength: 4,
                        maxLength: 30,
                      })}
                    />
                    {errors.fname && (
                      <Form.Control.Feedback type="invalid">
                        Parent name is required
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Form.Group>

                <Form.Group className="form-group row mb-3">
                <Form.Label className="col-sm-2 col-form-label">
                    Parent / Guardian / Spouse Phone
                  </Form.Label>
                      <div className="col-sm-10">
                      <Form.Control
                      type="text"
                      placeholder="Enter your parent / guardian / spouse phone number"
                      id="fphone"
                      name="fphone"
                      autoFocus
                      {...register("fphone", {
                        required: true,
                        pattern: /^[0-9]+$/,
                        minLength: 10,
                        maxLength: 10,
                      })}
                        />
                         {errors.fname && (
                      <Form.Control.Feedback type="invalid">
                        Parent phone number is required
                      </Form.Control.Feedback>
                    )}
                      </div>
                    </Form.Group>
                  </Card.Body>
                  </Card>

              


                <Card>
                <Card.Header>Residential Details</Card.Header>
              <Card.Body>        
              <Form.Group className="form-group row mb-3">
            <Form.Label className="col-sm-2 col-form-label">Local Address</Form.Label>
            <div className="col-sm-10">
              <Form.Control
                type="text"
                name="laddress"
                id="laddress"
                placeholder="Enter your local address (Where you stay in jaipur)"
                autoFocus
                {...register('laddress', {
                  required:true,
                  pattern: /^[A-Za-z]+$/,
                  minLength: 10,
                  maxLength: 50,
                })}
              />
              {errors.laddress && (
                <Form.Control.Feedback type="invalid">
                  Local Address is required
                </Form.Control.Feedback>
              )}
            </div>
          </Form.Group>

          <Form.Group className="form-group row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="sameAddress"
                  checked={isSameAddress}
                  onChange={handleCheckboxChange}  
                />
            <Form.Label className="col-sm-10 col-form-label"> Permanent address is same as local address</Form.Label> 
              </div>
            </div>
          </Form.Group>
      
          <Form.Group className="form-group row mb-3">
            <Form.Label className="col-sm-2 col-form-label">Permanent Address</Form.Label>
            <div className="col-sm-10">
            <Form.Control
                type="text"
                name="Paddress"
                id="Paddress"
                placeholder="Enter your Permanent address"
                autoFocus
                {...register('Paddress', {
                  required:true,
                  pattern: /^[A-Za-z]+$/,
                  minLength: 10,
                  maxLength: 50,
                })}
              />
              {errors.laddress && (
                <Form.Control.Feedback type="invalid">
                  Permanent Address is required
                </Form.Control.Feedback>
              )}
            </div>
          </Form.Group>

          
          
        </Card.Body>
      </Card>

                <div className="card">
                  <div className="card">
                    <div className="card-header">Educational Details</div>
                    <div className="card-body">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Are you a:
                        </label>
                        <div className="col-sm-10">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="role"
                              value="student"
                              checked="student"
                              onChange={handleRoleChange}
                            />
                            <label className="form-check-label">Student</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="role"
                              value="workingProfessional"
                              checked={role === "workingProfessional"}
                              onChange={handleRoleChange}
                            />
                            <label className="form-check-label">
                              Working Professional
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Conditionally Render Inputs Based on Role Selection */}
                      {role === "student" || (
                        <>
                          <div className="form-group row">
                            <label
                              htmlFor="qualification"
                              className="col-sm-2 col-form-label"
                            >
                              Qualification
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="qualification"
                                value={qualification}
                                onChange={(e) =>
                                  setQualification(e.target.value)
                                }
                                placeholder="Enter your qualification"
                                required
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="completionYear"
                              className="col-sm-2 col-form-label"
                            >
                              Completion Year
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="completionYear"
                                value={completionYear}
                                onChange={(e) =>
                                  setCompletionYear(e.target.value)
                                }
                                placeholder="Enter your completion year"
                                required
                              />
                            </div>
                          </div>
 
                          <div className="form-group row">
                            <label
                              htmlFor="completionYear"
                              className="col-sm-2 col-form-label"
                            >
                              College / University
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="college/university"
                                value={completionYear}
                                onChange={(e) =>
                                  setCompletionYear(e.target.value)
                                }
                                placeholder="Enter your College/University name"
                                required
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {role === "workingProfessional" && (
                        <>
                          <div className="form-group row">
                            <label
                              htmlFor="designation"
                              className="col-sm-2 col-form-label"
                            >
                              Designation
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="designation"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                placeholder="Enter your designation"
                                required
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="company"
                              className="col-sm-2 col-form-label"
                            >
                              Company
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                placeholder="Enter your company name"
                                required
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">Course Details</div>
                  <div className="card-body">
                    <div className="form-group row">
                      <label
                        htmlFor="course"
                        className="col-sm-2 col-form-label"
                      >
                        Course
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-control"
                          name="course"
                          id="course"
                          value={selectedCourse}
                          onChange={handleCourseChange}
                          required
                        >
                          <option value="">Select a course</option>
                          <option value="advanced java">Advanced Java</option>
                          <option value="android">Android</option>
                          <option value="computer basics">
                            Computer Basics
                          </option>
                          <option value="core java">Core Java</option>
                          <option value="digital marketing">
                            Digital Marketing
                          </option>
                          <option value="full stack">
                            Full Stack Development
                          </option>
                          <option value="graphic design">Graphic Design</option>
                          <option value="node js">Node JS</option>
                          <option value="photoshop">Photoshop</option>
                          <option value="php">PHP</option>
                          <option value="python">Python</option>
                          <option value="react js">React JS</option>
                          <option value="web design">Web Design</option>
                          <option value="other">Other Course</option>
                        </select>
                      </div>
                    </div>
                    {selectedCourse === "other" && (
                      <div className="form-group row">
                        <label
                          htmlFor="otherCourse"
                          className="col-sm-2 col-form-label"
                        >
                          Enter your course
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="otherCourse"
                            name="otherCourse"
                            placeholder="Enter the course name"
                            value={otherCourse}
                            onChange={(e) => setOtherCourse(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    )}
                    <div className="form-group row">
                      <label
                        htmlFor="referral"
                        className="col-sm-2 col-form-label"
                      >
                        How did you come to know about us?
                      </label>
                      <div className="col-sm-10">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="referral"
                            id="google"
                            value="Google"
                            required
                          />
                          <label className="form-check-label" htmlFor="google">
                            Google
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="referral"
                            id="facebook"
                            value="Facebook"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="facebook"
                          >
                            Facebook
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="referral"
                            id="instagram"
                            value="Instagram"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="instagram"
                          >
                            Instagram
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="referral"
                            id="collegeTPO"
                            value="College TPO"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="collegeTPO"
                          >
                            College TPO
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="referral"
                            id="friend"
                            value="Friend"
                            required
                          />
                          <label className="form-check-label" htmlFor="friend">
                            Friend
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="form-check form-check-inline">
                        <label className="switch">
                          <input
                            type="checkbox"
                            id="terms"
                            value="terms"
                            required
                            onClick={termsCondition}
                          />
                          <span className="slider round"></span>
                        </label>
                        <label
                          className="form-check-label pl-2 text-muted"
                          htmlFor="terms"
                        >
                          By clicking submit, you agree to our {""}{" "}
                          <span
                            onClick={termsCondition}
                            style={{ color: "blue", cursor: "pointer" }}
                          >
                            Terms & Conditions
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <input
                        type="submit"
                        name="register"
                        className="btn btn-lg btn-primary btn-block"
                        value="Register"
                      />
                    </div>
                  </div>
                </div>
              </form>
              </Col>

              {modalOpen && <Modal show={modalOpen} onClose={closeModal} />}
          </Row>
        </Container>
  );
}


