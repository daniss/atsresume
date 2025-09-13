import ContentEditableSafe from "../../utility/ContentEditableSafe";

const Certification = ({ title, certifications }) => {
  const handleTitleChange = () => {
    // Since this is a static title, we don't need to update the data for this specific case
    // But we add the functionality for consistency with other sections
  };

  return (
    certifications.length > 0 &&
    <div>
      <ContentEditableSafe className="section-title mb-1 border-b-2 border-gray-300 editable" onBlur={handleTitleChange}>
        {title}
      </ContentEditableSafe>
      <ul className="sub-content list-disc ul-padding">
        {certifications.map((certification, index) => (
          <li key={index}>{certification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Certification;