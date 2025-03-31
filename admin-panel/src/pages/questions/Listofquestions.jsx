import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';

const Listofquestions = () => {
  const { name } = useParams();
  
  // Sample questions data (replace with your actual data source)
  const categories = {
    basics: [
      { id: 1, question: "What is your name?", answer: "My name is AI Assistant" },
      { id: 2, question: "What is your purpose?", answer: "To help users with information" }
    ],
    lifestyle: [
      { id: 1, question: "What's your favorite hobby?", answer: "Helping users 24/7" },
      { id: 2, question: "Do you need sleep?", answer: "No, I'm always available" }
    ],
    // Add more categories...
  };

  const categoryName = name?.toUpperCase() || 'Unknown';
  const questions = categories[name] || [];
  return (
    <>
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/questions" className="btn btn-outline-secondary">
          <ArrowLeft className="me-2" /> Back
        </Link>
        <h2 className="text-center mb-0">{categoryName} Questions</h2>
        <div style={{ width: '120px' }}></div> {/* Spacer for alignment */}
      </div>

      <div className="row g-4">
        {questions.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">No questions found for this category</div>
          </div>
        ) : (
          questions.map((q) => (
            <div key={q.id} className="col-12">
              <div className="card shadow-sm mb-3">
                <div className="card-body">
                  <h5 className="card-title text-primary">Question #{q.id}</h5>
                  <p className="fw-bold mb-3">{q.question}</p>
                  <div className="bg-light p-3 rounded">
                    <h6 className="text-success">Answer:</h6>
                    <p className="mb-0">{q.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    
    </>
  )
}

export default Listofquestions
