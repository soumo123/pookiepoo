import React, { useState } from 'react'
import styles from '../../css/QuestionUpload.module.css';
import axiosInstance from '../../axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

const Addquestion = () => {
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState([{ id: 1, text: '' }]);
    const [allowMultiple, setAllowMultiple] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [weight, setWeight] = useState(1)
    const navigate = useNavigate()
    const QUESTION_CATEGORIES = [
        'Basics',
        'Lifestyle',
        'Personality',
        'Ask Me About',
        'Profession',
        'Relationship Goals'
    ];

    const weights = [
        1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5
    ]

    const addOption = (e) => {
        e.preventDefault();
        setOptions([...options, {
            id: options.length + 1,
            text: ''
        }]);
    };

    const removeOption = (id) => {
        
        if (options.length > 1) {
            setOptions(options.filter(option => option.id !== id));
        }
    };

    const updateOptionText = (id, text) => {
        setOptions(options.map(option =>
            option.id === id ? { ...option, text } : option
        ));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const questionData = {
            text: questionText,
            options: options.map(option => option.text),
            category: selectedCategory.toLowerCase(),
            weight: Number(weight),
            multipleSelect: allowMultiple,
        };

        // Basic validation
        if (!selectedCategory) {
            alert('Please select a category');
            return;
        }

        if (!questionText.trim()) {
            alert('Please enter a question');
            return;
        }

        // if (options.some(option => !option.text.trim())) {
        //     // alert('All options must have text');
        //     return;
        // }
        console.log('Submitting question:', questionData);
        const result = await axiosInstance.post(`/createques`, questionData)
        if (result.status === 201) {
            setQuestionText("")
            setOptions([{ id: 1, text: '' }])
            setAllowMultiple(false)
            setSelectedCategory('')
            setWeight(1)
            toast.success("Question added",{
                autoClose: 2000,
                position: "top-center",
              })
            setTimeout(() => {
                navigate("/questions")
            }, 2000);
        }else{
            toast.error("Question not added",{
                autoClose: 2000,
                position: "top-center",
              })
        }

    };
    return (
        <>
          <ToastContainer />
            <div className="card shadow-sm">
                <div className="card-body">
                    {/* <div className={`${styles.questionUploadContainer} bg-light`}> */}
                    {/* <div className="card shadow-lg"> */}
                    
                        <div className="card-body">
                            <h2 className="mb-4">Create New Question</h2>

                            {/* Category Selection */}
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="mb-4">
                                        <label className="form-label">Question Category</label>
                                        <select
                                            className="form-select"
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        >
                                            <option value="">Select a category</option>
                                            {QUESTION_CATEGORIES.map(category => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="mb-4">
                                        <label className="form-label">Weight</label>
                                        <select
                                            className="form-select"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                        >
                                            <option value="">Select weight</option>
                                            {weights.map(weight => (
                                                <option key={weight} value={weight}>
                                                    {weight}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>


                            {/* Question Text */}
                            <div className="mb-4">
                                <label className="form-label">Question Text</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={questionText}
                                    onChange={(e) => setQuestionText(e.target.value)}
                                    placeholder="Enter your question here..."
                                />
                            </div>

                            {/* Answer Options */}
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <label className="form-label">Answer Options</label>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="multipleSelect"
                                            checked={allowMultiple}
                                            onChange={(e) => setAllowMultiple(e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="multipleSelect">
                                            Allow Multiple Answers
                                        </label>
                                    </div>
                                </div>

                                <div id="optionsContainer">
                                    {options.map((option, index) => (
                                        <div key={option.id} className={`${styles.optionItem} mb-3`}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={`Option ${index + 1}`}
                                                value={option.text}
                                                onChange={(e) => updateOptionText(option.id, e.target.value)}
                                            />
                                            <div className={styles.optionActions}>
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => removeOption(option.id)}
                                                    disabled={options.length === 1}
                                                >
                                                    <i className="bi bi-dash-lg"></i>
                                                </button>
                                                <button
                                                    className="btn btn-outline-success btn-sm"
                                                    onClick={addOption}
                                                >
                                                    <i className="bi bi-plus-lg"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={addOption}
                                >
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Add Another Option
                                </button>
                            </div>

                            {/* Preview Section */}
                            <div className={styles.previewSection}>
                                <h5>Preview</h5>
                                {selectedCategory && (
                                    <span className={`badge bg-primary mb-2 ${styles.categoryBadge}`}>
                                        {selectedCategory}
                                    </span>
                                )}
                                <div className="mb-2">
                                    {questionText || "Your question will appear here"}
                                </div>
                                <div>
                                    {options.map((option) => (
                                        <span key={option.id} className={styles.optionPreview}>
                                            {option.text || `Option ${option.id}`}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-2 text-muted">
                                    <small>
                                        {allowMultiple ? 'Multiple selections allowed' : 'Single selection only'}
                                    </small>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-4 d-flex justify-content-end gap-2">
                                <button className="btn btn-secondary">Cancel</button>
                                <button className="btn btn-primary" onClick={handleSubmit}>Save Question</button>
                            </div>
                        </div>
                  
                    {/* </div> */}
                </div>
                {/* </div> */}
            </div>

        </>
    )
}

export default Addquestion
