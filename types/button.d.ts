import { VaseUIComponent, VaseUIComponentSize } from './component'

/** Button type */
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

/** Button Component */
export declare class VsButton extends VaseUIComponent {
    /** Button size */
    size: VaseUIComponentSize

    /** Button type */
    type: ButtonType

    /** Determine whether it's a plain button */
    plain: boolean

    /** Determine whether it's a round button */
    round: boolean

    /** Determine whether it's loading */
    circle: boolean

    /** Disable the button */
    disabled: boolean

    /** Button icon, accepts an icon name of Element icon component */
    icon: string
}