import Skills from "../components/Skills";
import DateRange from "../../utility/DateRange";
import Language from "../components/Language";
import Certification from "../components/Certification";
import { translations } from "../../utility/translations";
import { useLanguage } from "../../../hooks/useLanguage";
import { PrintSafeDroppable, PrintSafeDraggable } from "../../utility/PrintSafeWrapper";
import React, { useContext } from "react";
import { ResumeContext } from "../../builder";
import ContentEditableSafe from "../../utility/ContentEditableSafe";

const LeftSide = ({ resumeData }) => {
  const { setResumeData } = useContext(ResumeContext);
  const { language } = useLanguage();

  const handleSummaryChange = (e) => {
    setResumeData({ ...resumeData, summary: e.target.innerText });
  };

  return (
    <aside className="col-span-1 space-y-2">
      {resumeData.summary.length > 0 && (
        <section className="mb-1">
          <ContentEditableSafe className="section-title mb-1 border-b-2 border-gray-300 editable">
            {translations[language].summary}
          </ContentEditableSafe>
          <ContentEditableSafe className="content break-words editable" onBlur={handleSummaryChange}>
            {resumeData.summary}
          </ContentEditableSafe>
        </section>
      )}

      {resumeData.education.length > 0 && (
        <section className="mb-1">
          <ContentEditableSafe className="section-title mb-1 border-b-2 border-gray-300 editable">
            {translations[language].education}
          </ContentEditableSafe>
          {resumeData.education.map((item, index) => (
            <article key={index} className="mb-1">
              <h3 className="content i-bold">{item.degree}</h3>
              <p className="content">{item.school}</p>
              <DateRange
                startYear={item.startYear}
                endYear={item.endYear}
                id={`education-start-end-date`}
              />
            </article>
          ))}
        </section>
      )}

      <section>
        <PrintSafeDroppable droppableId="skills">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {resumeData.skills.map((skill, index) => (
                <PrintSafeDraggable
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
                        snapshot?.isDragging &&
                        "outline-dashed outline-2 outline-gray-400 bg-white"
                      }`}
                    >
                      <Skills title={skill.title} skills={skill.skills} />
                    </div>
                  )}
                </PrintSafeDraggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </PrintSafeDroppable>
      </section>

      <section>
        <Language title={translations[language].languages} languages={resumeData.languages} />
      </section>

      <section>
        <Certification
          title={translations[language].certifications}
          certifications={resumeData.certifications}
        />
      </section>
    </aside>
  );
};

export default LeftSide;
