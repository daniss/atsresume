import { usePrintMode } from '../../hooks/usePrintMode';

const ContentEditableSafe = ({ 
  children, 
  contentEditable = true, 
  suppressContentEditableWarning = true,
  onBlur,
  className,
  ...props 
}) => {
  const isPrintMode = usePrintMode();

  // In print mode, render as static content without contentEditable
  if (isPrintMode) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  // In edit mode, render with contentEditable
  return (
    <div
      contentEditable={contentEditable}
      suppressContentEditableWarning={suppressContentEditableWarning}
      onBlur={onBlur}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export default ContentEditableSafe;