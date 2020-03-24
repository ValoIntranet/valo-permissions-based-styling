import * as React from 'react';
import { IValoPermissionBasedStylingAppProperties } from '../../ValoPermissionBasedStylingApplicationCustomizer';
import { SecurityTrimmedControl, PermissionLevel } from "@pnp/spfx-controls-react/lib/SecurityTrimmedControl";
import ContextProvider from '../../services/ContextProvider';
import { SPPermission } from "@microsoft/sp-page-context";
import { Styling } from '../styling';

export interface PermissionStylingProps extends IValoPermissionBasedStylingAppProperties {}

export const PermissionStyling: React.FunctionComponent<PermissionStylingProps> = (props: PermissionStylingProps) => {
  const ctx = ContextProvider.ctx;
  // debugger;
  return (
    <SecurityTrimmedControl context={ctx} level={PermissionLevel.currentWeb} permissions={[SPPermission.manageWeb]} noPermissionsControl={
      <SecurityTrimmedControl context={ctx} level={PermissionLevel.currentList} permissions={[SPPermission.editListItems]} noPermissionsControl={
        <SecurityTrimmedControl context={ctx} level={PermissionLevel.currentList} permissions={[SPPermission.viewPages]}>
          {/* The user has reader permissions - visitor */}
          <Styling css={props.visitor} debug={props.debug} />
        </SecurityTrimmedControl>
      }>
        {/* The user has edit list item permissions - editor */}
        <Styling css={props.editor} debug={props.debug} />
      </SecurityTrimmedControl>
    }>
      {/* The user has manage web permissions - owner */}
      <Styling css={props.owner} debug={props.debug} />
    </SecurityTrimmedControl>
  );
};
