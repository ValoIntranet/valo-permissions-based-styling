import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';
import { PermissionStyling, PermissionStylingProps } from './components/permissionStyling';
import { Log } from '@microsoft/sp-core-library';
import ContextProvider from './services/ContextProvider';

export interface IValoPermissionBasedStylingAppProperties {
  visitor: string;
  editor: string;
  owner: string;
  debug: boolean;
}

export const LOG_SOURCE: string = 'ValoPermissionBasedStylingApp';

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ValoPermissionBasedStylingApp extends BaseApplicationCustomizer<IValoPermissionBasedStylingAppProperties> {
  private static _headerPlaceholder: PlaceholderContent;

  public async onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized`);
    ContextProvider.getInstance(this.context);
    this.context.application.navigatedEvent.add(this, this.render);
  }

  /**
   * onDispose of the control
   */
  public async onDispose() {
    if (ValoPermissionBasedStylingApp._headerPlaceholder && ValoPermissionBasedStylingApp._headerPlaceholder.domElement) {
      ReactDom.unmountComponentAtNode(ValoPermissionBasedStylingApp._headerPlaceholder.domElement);
    }
  }

  /**
   * Renders the permissions based styling
   */
  private render() {
    if (!ValoPermissionBasedStylingApp._headerPlaceholder || !ValoPermissionBasedStylingApp._headerPlaceholder.domElement) {
      ValoPermissionBasedStylingApp._headerPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, {
        onDispose: this.onDispose
      });
    }

    // The extension should not assume that the expected placeholder is available.
    if (!ValoPermissionBasedStylingApp._headerPlaceholder) {
      Log.error(LOG_SOURCE, new Error(`The expected top placeholder was not found. The extension will not be loaded`));
      return;
    }

    // Set context if update would happen
    ContextProvider.ctx = this.context;
    console.log(this.properties);
    const element: React.ReactElement<PermissionStylingProps> = React.createElement(PermissionStyling, { ...this.properties });
    ReactDom.render(element, ValoPermissionBasedStylingApp._headerPlaceholder.domElement);
  }
}
