import React, { useContext } from "react";
import {ResumeContext} from "../../builder";
import { translations } from "../../utility/translations";
import { useLanguage } from "../../../hooks/useLanguage";

const Skills = ({ title, skills }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const { language } = useLanguage();

  const handleTitleChange = (e) => {
    const newSkills = [...resumeData.skills];
    newSkills.find((skillType) => skillType.title === title).title = e.target.innerText;
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const getTranslatedTitle = (originalTitle) => {
    if (originalTitle === "Technical Skills") {
      return translations[language].technicalSkills;
    } else if (originalTitle === "Soft Skills") {
      return translations[language].softSkills;
    }
    return originalTitle;
  };

  return (
    skills && skills.length > 0 && (
      <>
        <h2 className="section-title mb-1 border-b-2 border-gray-300 editable" contentEditable suppressContentEditableWarning onBlur={handleTitleChange}>
          {getTranslatedTitle(title)}
        </h2>
        <p className="sub-content">{skills.join(", ")}</p>
      </>
    )
  );
};

export default Skills;
