import React, { useContext } from "react";
import {ResumeContext} from "../../builder";
import { translations } from "../../utility/translations";
import { useLanguage } from "../../../hooks/useLanguage";
import ContentEditableSafe from "../../utility/ContentEditableSafe";

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
      <div>
        <ContentEditableSafe className="section-title mb-1 border-b-2 border-gray-300 editable" onBlur={handleTitleChange}>
          {getTranslatedTitle(title)}
        </ContentEditableSafe>
        <p className="sub-content">{skills.join(", ")}</p>
      </div>
    )
  );
};

export default Skills;
