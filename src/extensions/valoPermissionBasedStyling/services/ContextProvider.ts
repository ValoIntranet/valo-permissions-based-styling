import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export default class ContextProvider {
  private static instance: ContextProvider;

  private constructor(private ctx: ApplicationCustomizerContext | WebPartContext) {}

  /**
   * Get or initiate Context Provider instance
   *
   * @param ctx
   */
  public static getInstance(ctx?: ApplicationCustomizerContext | WebPartContext) {
    // Create a new instance when it doesn't exist or when context is undefined
    if (!ContextProvider.instance) {
      ContextProvider.instance = new ContextProvider(ctx);
    }
    return ContextProvider.instance;
  }

  /**
   * Dispose the instance of the class
   */
  public static dispose() {
    ContextProvider.instance = null;
  }

  /**
   * Return the context
   */
  public static get ctx() {
    return ContextProvider.instance ? ContextProvider.instance.ctx : null;
  }

  /**
   * Set the new context
   */
  public static set ctx(newCtx: ApplicationCustomizerContext | WebPartContext) {
    if (!ContextProvider.instance) {
      this.getInstance(newCtx);
    }
    ContextProvider.instance.ctx = newCtx;
  }
}
