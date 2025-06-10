import React from 'react';

const LearningModule = ({ children, title, description }) => {
  return (
    <div className="learning-module">
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      <div className="module-content">
        {children}
      </div>
    </div>
  );
};

export default LearningModule;