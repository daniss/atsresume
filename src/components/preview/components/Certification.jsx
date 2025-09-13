import React, { useContext } from "react";
import { ResumeContext } from "../../builder";

const Certification = ({ title, certifications }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleTitleChange = (e) => {
    // Since this is a static title, we don't need to update the data for this specific case
    // But we add the functionality for consistency with other sections
  };

  return (
    certifications.length > 0 &&
    <div>
      <h2 className="section-title mb-1 border-b-2 border-gray-300 editable"
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTitleChange}
      >
        {title}
      </h2>
      <ul className="sub-content list-disc ul-padding">
        {certifications.map((certification, index) => (
          <li key={index}>{certification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Certification;