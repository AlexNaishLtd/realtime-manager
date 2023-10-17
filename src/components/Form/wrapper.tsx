type FormWrapperProps = {
  onSubmit: () => void;
  fullWidth?: boolean;
  [key: string]: any;
};

export const FormWrapper = ({ onSubmit, children, fullWidth, ...props }: FormWrapperProps) => {
  return (
    <form
      className={`text-sm space-y-4${props.className ? ` ${props.className}` : ''} ${fullWidth ? 'w-full' : 'w-80'}`}
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};
