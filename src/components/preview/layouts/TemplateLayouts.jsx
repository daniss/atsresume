import Header from "../components/Header";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";

export const ClassicLayout = ({ resumeData, icons }) => (
  <article>
    <Header resumeData={resumeData} icons={icons}/>
    <hr className="border-dashed my-2"/>
    <div className="grid grid-cols-3 gap-6">
      <LeftSide resumeData={resumeData}/>
      <RightSide resumeData={resumeData}/>
    </div>
  </article>
);

export const ModernLayout = ({ resumeData, icons }) => (
  <article>
    <Header resumeData={resumeData} icons={icons}/>
    <hr className="border-solid my-4 border-gray-300"/>
    <main className="space-y-6">
      <RightSide resumeData={resumeData}/>
      <hr className="border-solid border-gray-200"/>
      <LeftSide resumeData={resumeData}/>
    </main>
  </article>
);

export const ExecutiveLayout = ({ resumeData, icons }) => (
  <article>
    <Header resumeData={resumeData} icons={icons}/>
    <hr className="border-dashed my-2"/>
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <RightSide resumeData={resumeData}/>
      </div>
      <div className="col-span-1">
        <LeftSide resumeData={resumeData}/>
      </div>
    </div>
  </article>
);

export const MinimalLayout = ({ resumeData, icons }) => (
  <article className="space-y-8">
    <Header resumeData={resumeData} icons={icons}/>
    <main className="space-y-8">
      <RightSide resumeData={resumeData}/>
      <div className="border-l-2 border-gray-200 pl-6 ml-4">
        <LeftSide resumeData={resumeData}/>
      </div>
    </main>
  </article>
);