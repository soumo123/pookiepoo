import React,{useState,useMemo} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { PlusLg } from 'react-bootstrap-icons';
import axiosInstance from '../../axiosInstance';
import './question.css';

const Questions = () => {

  const navigate = useNavigate()
  const[countObj,setCountObj]=useState({})

  const handleNavigate = ()=>{
    navigate("/addquestion")
  }


  const getAllQuestions = async () => {
    try {
      const result = await axiosInstance.get(`/getcount?query=&category=&limit=${100000}&offset=${0}`)
      if (result.status === 200) {
        setCountObj(result.data.data)

      }
    } catch (error) {
      console.log(error)
      setCountObj({})
    }
  }
    useMemo(() => {
      getAllQuestions()
    }, [])
  
  return (
<div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark fw-bold">Question Categories</h2>
        <button className="btn btn-primary btn-lg" onClick={handleNavigate}>
          <PlusLg className="me-2"/>
          Add Question
        </button>
      </div>

      <div className="row g-4">
        {/* Card 1 */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title fw-bold mb-0">Basics</h5>
                <span className="badge bg-primary">{countObj.basics} Questions</span>
              </div>
              <p className="card-text text-secondary">Fundamental questions for initial setup and configuration</p>
              <div className="d-flex justify-content-end">
                <Link to={`/catques/basics`}className="btn btn-outline-primary">Manage</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title fw-bold mb-0">Lifestyle</h5>
                <span className="badge bg-success">{countObj.lifestyle} Questions</span>
              </div>
              <p className="card-text text-secondary">Daily life and personal preference related questions</p>
              <div className="d-flex justify-content-end">
                <Link to={`/catques/lifestyle`} className="btn btn-outline-primary">Manage</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title fw-bold mb-0">Personality</h5>
                <span className="badge bg-info">{countObj.personality} Questions</span>
              </div>
              <p className="card-text text-secondary">Academic and learning-related question bank</p>
              <div className="d-flex justify-content-end">
                <Link to={`/catques/personality`} className="btn btn-outline-primary">Manage</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title fw-bold mb-0">Ask Me About</h5>
                <span className="badge bg-warning text-dark">{countObj.askme} Questions</span>
              </div>
              <p className="card-text text-secondary">Random question generator for various topics</p>
              <div className="d-flex justify-content-end">
                <Link to={`/catques/askme`} className="btn btn-outline-primary">Manage</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5 */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title fw-bold mb-0">Profession</h5>
                <span className="badge bg-danger">{countObj.profession} Questions</span>
              </div>
              <p className="card-text text-secondary">Career and work-related professional questions</p>
              <div className="d-flex justify-content-end">
                <Link to={`/catques/profession`} className="btn btn-outline-primary">Manage</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm card-hover">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title fw-bold mb-0">Relationship Goals</h5>
                <span className="badge bg-danger">{countObj.relationshipgoals} Questions</span>
              </div>
              <p className="card-text text-secondary">Relationship Goals</p>
              <div className="d-flex justify-content-end">
                <Link to={`/catques/relationshipgoals`} className="btn btn-outline-primary">Manage</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Questions
