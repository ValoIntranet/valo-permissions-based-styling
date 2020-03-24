import * as React from 'react';
import { LOG_SOURCE } from '../../ValoPermissionBasedStylingApplicationCustomizer';

export interface StylingProps {
  css: string;
  debug?: boolean;
}

export const Styling: React.FunctionComponent<StylingProps> = (props: StylingProps) => {
  if (props.debug) {
    console.log(`${LOG_SOURCE}: Adding the following styling: ${props.css ? props.css : "NO STYLING TO ADD"}`);
  }
  return (
    props.css ? <style>{props.css}</style> : null
  );
};
