import WorkExperiences from "./workExperience/ui/WorkExperiences";
import Projects from "./projects/ui/Projects";

const RightSide = ({resumeData}) => {
  return (
    <main className="col-span-2 space-y-2">
      {resumeData.workExperience.length > 0 && (
        <section>
          <WorkExperiences/>
        </section>
      )}
      {resumeData.projects.length > 0 && (
        <section>
          <Projects/>
        </section>
      )}
    </main>
  );
};

export default RightSide;
