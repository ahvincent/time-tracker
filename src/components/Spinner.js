import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Spinner = () => {

    return (
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
    );
}

export default Spinner;