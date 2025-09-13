import React, {useContext} from 'react';
import {ResumeContext} from "../../../../builder";
import WorkExperience from "../components/WorkExperience";
import { translations } from "../../../../utility/translations";
import { useLanguage } from "../../../../../hooks/useLanguage";
import { PrintSafeDroppable } from "../../../../utility/PrintSafeWrapper";
import ContentEditableSafe from "../../../../utility/ContentEditableSafe";

const WorkExperiences = () => {
  const {resumeData} = useContext(ResumeContext);
  const { language } = useLanguage();

  return (
    <PrintSafeDroppable droppableId="work-experience">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <ContentEditableSafe className="section-title mb-1 border-b-2 border-gray-300 editable">
            {translations[language].workExperience}
          </ContentEditableSafe>
          {resumeData.workExperience.map((item, index) => (
            <WorkExperience
              key={index}
              item={item}
              index={index}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </PrintSafeDroppable>
  );
};

export default WorkExperiences;
