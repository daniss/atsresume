import Skills from "../components/Skills";
import DateRange from "../../utility/DateRange";
import Language from "../components/Language";
import Certification from "../components/Certification";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { ResumeContext } from "../../builder";

const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);

const LeftSide = ({ resumeData }) => {
  const { setResumeData } = useContext(ResumeContext);

  const handleSummaryChange = (e) => {
    setResumeData({ ...resumeData, summary: e.target.innerText });
  };

  return (
    <div className="col-span-1 space-y-2">
      {resumeData.summary.length > 0 && (
        <div className="mb-1">
          <h2 className="section-title mb-1 border-b-2 border-gray-300 editable"
              contentEditable
              suppressContentEditableWarning
          >
            Summary
          </h2>
          <p className="content break-words editable"
             contentEditable
             suppressContentEditableWarning
             onBlur={handleSummaryChange}
          >
            {resumeData.summary}
          </p>
        </div>
      )}

      {resumeData.education.length > 0 && (
        <div className="mb-1">
          <h2 className="section-title mb-1 border-b-2 border-gray-300 editable"
              contentEditable
              suppressContentEditableWarning
          >
            Education
          </h2>
          {resumeData.education.map((item, index) => (
            <div key={index} className="mb-1">
              <p className="content i-bold">{item.degree}</p>
              <p className="content">{item.school}</p>
              <DateRange
                startYear={item.startYear}
                endYear={item.endYear}
                id={`education-start-end-date`}
              />
            </div>
          ))}
        </div>
      )}

      <Droppable droppableId="skills" type="SKILLS">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {resumeData.skills.map((skill, index) => (
              <Draggable
                key={`SKILLS-${index}`}
                draggableId={`SKILLS-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-1 ${
                      snapshot.isDragging &&
                      "outline-dashed outline-2 outline-gray-400 bg-white"
                    }`}
                  >
                    <Skills title={skill.title} skills={skill.skills} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Language title="Languages" languages={resumeData.languages} />
      <Certification
        title="Certifications"
        certifications={resumeData.certifications}
      />
    </div>
  );
};

export default LeftSide;
