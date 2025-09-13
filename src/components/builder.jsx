"use client"

import React, {createContext, useState, useEffect} from "react";
import Meta from "../components/meta/Meta";
import FormCloseOpenBtn from "../components/FormCloseOpenBtn";
import Preview from "../components/preview/ui/Preview";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import LanguageSelector from "../components/utility/LanguageSelector";
import SaveStatusIndicator from "../components/utility/SaveStatusIndicator";
import { LanguageProvider } from "../hooks/useLanguage";
import { TemplateProvider } from "../components/utility/TemplateContext";
import { useAutoSave } from "../hooks/useAutoSave";
import dynamic from "next/dynamic";
import Form from "../components/form/ui/Form";

const ResumeContext = createContext(DefaultResumeData);

// server side rendering false
const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function Builder() {
  const { saveData, loadData, hasSavedData, lastSaved, isSaving } = useAutoSave();
  
  // resume data - use default initially to prevent hydration mismatch
  const [resumeData, setResumeDataState] = useState(DefaultResumeData);
  const [mounted, setMounted] = useState(false);

  // Load saved data after component mounts to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedData = loadData();
      if (savedData) {
        setResumeDataState(savedData);
      }
    }
  }, [loadData]);

  // Enhanced setResumeData with auto-save
  const setResumeData = (newData) => {
    setResumeDataState(newData);
    if (mounted) {
      saveData(newData);
    }
  };

  // form hide/show
  const [formClose, setFormClose] = useState(false);

  // language state
  const [language, setLanguage] = useState('en');

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const updatedData = {...resumeData, profilePicture: event.target.result};
        setResumeData(updatedData);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e) => {
    const updatedData = {...resumeData, [e.target.name]: e.target.value};
    setResumeData(updatedData);
  };

  return (
    <LanguageProvider language={language} setLanguage={setLanguage}>
      <TemplateProvider>
        <ResumeContext.Provider
          value={{
            resumeData,
            setResumeData,
            handleProfilePicture,
            handleChange,
            lastSaved,
            isSaving,
            hasSavedData
          }}
        >
          <Meta
            title="ATSResume | Get hired with an ATS-optimized resume"
            description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes. Our platform uses the latest technology to analyze and optimize your resume for maximum visibility and success with applicant tracking systems. Say goodbye to frustration and wasted time spent on manual resume formatting. Create your winning resume with ATSResume today and get noticed by employers."
            keywords="ATS-friendly, Resume optimization, Keyword-rich resume, Applicant Tracking System, ATS resume builder, ATS resume templates, ATS-compliant resume, ATS-optimized CV, ATS-friendly format, ATS resume tips, Resume writing services, Career guidance, Job search in India, Resume tips for India, Professional resume builder, Cover letter writing, Interview preparation, Job interview tips, Career growth, Online job applications, resume builder, free resume builder, resume ats, best free resume builder, resume creator, resume cv, resume design, resume editor, resume maker"
          />
          <LanguageSelector />
          <div className="f-col gap-4 md:flex-row justify-evenly max-w-7xl md:mx-auto md:h-screen">
            {!formClose && (
              <Form/>
            )}
            <Preview/>
          </div>
          <FormCloseOpenBtn formClose={formClose} setFormClose={setFormClose}/>
          <Print/>
          <SaveStatusIndicator/>
        </ResumeContext.Provider>
      </TemplateProvider>
    </LanguageProvider>
  );
}
export {ResumeContext};
