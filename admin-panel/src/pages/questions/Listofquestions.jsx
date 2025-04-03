import React, { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import axiosInstance from '../../axiosInstance';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Listofquestions = () => {
  const { name } = useParams();
  const [questions, setQuestions] = useState([])
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [search, setSerach] = useState("")
  const [lastTypingTime, setLastTypingTime] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  // Sample questions data (replace with your actual data source)

  const categoryName = name?.toUpperCase() || 'Unknown';
  // const questions = categories[name] || [];

  const advsearch = (e) => {
    setLastTypingTime(new Date().getTime())
    setSerach(e.target.value)
  }

  const getAllQuestions = async () => {
    try {
      const result = await axiosInstance.get(`/getquestions?query=${search}&category=${name}&limit=${limit}&offset=${offset}`)
      if (result.status === 200) {
        setQuestions(result.data.data)
        setTotalPages(Math.ceil(result.data.totalData / limit));
      }
    } catch (error) {
      console.log(error)
      setQuestions([])
      setTotalPages(0)
    }
  }

  const handlePageChange = (event, value) => {
    setOffset((value - 1) * limit);
};

  useMemo(() => {
    getAllQuestions()
  }, [])

  useEffect(() => {
    if (lastTypingTime) {
      const timer = setTimeout(() => {
        const getAllQuestions = async () => {
          try {
            const response = await axiosInstance.get(
              `/getquestions?query=${search}&category=${name}&limit=${limit}&offset=0`
            );
            if (response.status === 200) {
              setQuestions(response.data.data)
              setTotalPages(Math.ceil(response.data.totalData / limit));

            }
          } catch (error) {
            console.log("An error occurred while fetching data.");
          }
        };

        getAllQuestions()

      }, 1000);
      return () => clearTimeout(timer)
    }
  }, [search])



  return (
    <>
      <div className='container'>
        <div className='row d-flex align-items-center'>
          <dv class="col-4">
            <Link to="/questions" className="btn btn-outline-secondary">
              <ArrowLeft className="me-2" /> Back
            </Link>
          </dv>
          <dv class="col-4">
            <h2 className="text-center mb-0">{categoryName} Questions</h2>
          </dv>
          {
            questions.length === 0 ? (
              ""
            ):(
<div class="col-4">
            <div style={{ width: "300px" }}>
              <div class="search-container">
                <form class="d-flex" role="search">
                  <input class="form-control search-input" type="search" placeholder="Search for anything..." value={search} aria-label="Search" onChange={advsearch} />
                  <button class="search-btn" type="submit">
                    <i class="bi bi-search search-icon"></i>
                  </button>
                </form>
              </div>
            </div> {/* Spacer for alignment */}
          </div>
            )
          }
          
        </div>

      </div>
      {/* <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/questions" className="btn btn-outline-secondary">
          <ArrowLeft className="me-2" /> Back
        </Link>
        <h2 className="text-center mb-0">{categoryName} Questions</h2>
        <div>
          <div class="search-container">
            <form class="d-flex" role="search">
              <input class="form-control search-input" type="search" placeholder="Search for anything..." aria-label="Search" />
              <button class="search-btn" type="submit">
                <i class="bi bi-search search-icon"></i>
              </button>
            </form>
          </div>
        </div>
      </div> */}

      <div className="container mt-4" style={{ maxHeight: "60vh", overflowY: "scroll" }}>
        <div className="row g-4">
          {questions.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">No questions found for this category</div>
            </div>
          ) : (
            questions.map((q, index) => (
              <div key={q.id} className="col-12">
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h5 className="card-title text-primary">Question: {index + 1}</h5>
                    <p className="fw-bold mb-3">{q.text}</p>
                    <div className="bg-light p-3 rounded">
                      <h6 className="text-success">Answer:</h6>
                      {
                        q.options.map((ele,index) => (
                          <p className="mb-0">{index+1}. {ele}.</p>
                        ))
                      }

                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className='container mt-4'>
      <Pagination count={totalPages} variant="outlined" color="secondary" onChange={handlePageChange} />
        </div>      
    </>
  )
}

export default Listofquestions
