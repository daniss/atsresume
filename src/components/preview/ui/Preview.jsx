/* eslint-disable react/jsx-no-undef */
import {FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube,} from "react-icons/fa";
import {CgWebsite} from "react-icons/cg";
import React, {useContext} from "react";
import {ResumeContext} from "../../builder";
import dynamic from "next/dynamic";
import ModalHighlightMenu from "../components/ModalHighlightMenu";
import A4PageWrapper from "../components/A4PageWrapper";
import {onDragEndHandler} from "../utils/onDrugEndHandler";
import usePrintMode from "../../../hooks/usePrintMode";
import { useTemplate } from "../../utility/TemplateContext";
import { ClassicLayout, ModernLayout, ExecutiveLayout, MinimalLayout } from "../layouts/TemplateLayouts";

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.DragDropContext;
    }),
  {ssr: false}
);

const Preview = () => {
  const {resumeData} = useContext(ResumeContext);
  const { currentTemplate, currentFont } = useTemplate();
  const isPrintMode = usePrintMode();
  const icons = [
    {name: "github", icon: <FaGithub/>},
    {name: "linkedin", icon: <FaLinkedin/>},
    {name: "twitter", icon: <FaTwitter/>},
    {name: "facebook", icon: <FaFacebook/>},
    {name: "instagram", icon: <FaInstagram/>},
    {name: "youtube", icon: <FaYoutube/>},
    {name: "website", icon: <CgWebsite/>},
  ];

  const getLayoutComponent = () => {
    switch (currentTemplate.layout) {
      case 'single-column':
        return ModernLayout;
      case 'two-column-right':
        return ExecutiveLayout;
      case 'minimal':
        return MinimalLayout;
      case 'two-column-left':
      default:
        return ClassicLayout;
    }
  };

  const LayoutComponent = getLayoutComponent();

  const ResumeContent = () => (
    <div style={{ 
      fontFamily: currentFont.fontFamily,
      color: currentTemplate.colors.primary 
    }}>
      <LayoutComponent resumeData={resumeData} icons={icons} />
    </div>
  );

  return (
    <div className="md:max-w-[60%] sticky top-0 preview rm-padding-print p-6 md:overflow-y-scroll md:h-screen">
      <A4PageWrapper>
        <ModalHighlightMenu/>
        {isPrintMode ? (
          <ResumeContent />
        ) : (
          <DragDropContext onDragEnd={onDragEndHandler}>
            <ResumeContent />
          </DragDropContext>
        )}
      </A4PageWrapper>
    </div>
  );
};

export default Preview;
