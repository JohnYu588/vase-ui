import Vue from 'vue'
import { VsButton } from './button';
import { VsKeepAlive } from './keep-alive';
export interface InstallationOptions {
    router: any,
}
/** The version of vase-ui */
export const version: string

export function install(vue: typeof Vue, options: InstallationOptions): void

export class Button extends VsButton { }

export class KeepAlive extends VsKeepAlive { }
