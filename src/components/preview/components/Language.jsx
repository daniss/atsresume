import ContentEditableSafe from "../../utility/ContentEditableSafe";

const Language = ({ title, languages }) => {

  const handleTitleChange = () => {
    // Since this is a static title, we don't need to update the data for this specific case
    // But we add the functionality for consistency with other sections
  };

  return (
    languages.length > 0 && (
      <div>
        <ContentEditableSafe className="section-title mb-1 border-b-2 border-gray-300 editable" onBlur={handleTitleChange}>
          {title}
        </ContentEditableSafe>
        <p className="sub-content">{languages.join(", ")}</p>
      </div>
    )
  );
};

export default Language;