import React, {useContext} from 'react';
import DateRange from "../../../../utility/DateRange";
import Link from "next/link";
import {ResumeContext} from "../../../../builder";
import { translations } from "../../../../utility/translations";
import { useLanguage } from "../../../../../hooks/useLanguage";
import { PrintSafeDroppable, PrintSafeDraggable } from "../../../../utility/PrintSafeWrapper";
import ContentEditableSafe from "../../../../utility/ContentEditableSafe";

const Projects = () => {
  const {resumeData} = useContext(ResumeContext);
  const { language } = useLanguage();
  return (
    <PrintSafeDroppable droppableId="projects">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <ContentEditableSafe className="section-title mb-1 border-b-2 border-gray-300 editable">
            {translations[language].projects}
          </ContentEditableSafe>
          {resumeData.projects.map((item, index) => (
              <PrintSafeDraggable
                key={`${item.name}-${index}`}
                draggableId={`PROJECTS-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <article
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-1 ${
                      snapshot?.isDragging &&
                      "outline-dashed outline-2 outline-gray-400 bg-white"
                    }`}
                  >
                    <header className="flex flex-row justify-between space-y-1">
                      <h3 className="content i-bold">{item.name}</h3>
                      <DateRange
                        startYear={item.startYear}
                        endYear={item.endYear}
                        id={`projects-start-end-date`}
                      />
                    </header>

                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="content"
                    >
                      {item.link}
                    </Link>
                    <p className="content">{item.description}</p>

                    <PrintSafeDroppable
                      droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                    >
                      {(provided) => (
                        <ul
                          className="list-disc ul-padding content"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {typeof item.keyAchievements === "string" &&
                            item.keyAchievements
                              .split("\n")
                              .map((achievement, subIndex) => (
                                <PrintSafeDraggable
                                  key={`${item.name}-${index}-${subIndex}`}
                                  draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                  index={subIndex}
                                >
                                  {(provided, snapshot) => (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`
                                            hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                            ${
                                        snapshot?.isDragging &&
                                        "outline-dashed outline-2 outline-gray-400 bg-white"
                                      }`}
                                    >
                                      <ContentEditableSafe
                                        dangerouslySetInnerHTML={{
                                          __html: achievement,
                                        }}
                                      />
                                    </li>
                                  )}
                                </PrintSafeDraggable>
                              ))}
                          {provided.placeholder}
                        </ul>
                      )}
                    </PrintSafeDroppable>
                  </article>
                )}
              </PrintSafeDraggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </PrintSafeDroppable>
  );
};

export default Projects;
