
type ScreenProps = {
  children: React.ReactElement;
  condition: boolean;
};

export const Screen = ({ children, condition }: ScreenProps) => {
  if ( ! condition ) {
    return null;
  }

  return <>{ children }</>;
};