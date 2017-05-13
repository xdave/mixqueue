/// <reference types="react" />

declare namespace MaterialUI {
	type ReactEl = React.ReactChild | null | boolean

	export interface MuiTheme {
		palette: {
			primary?: string,
			accent?: string,
			error?: string,
		},
		[key: string]: any,
	}

	export interface MuiThemeProviderProps {
		theme?: MuiTheme,
	}
	export class MuiThemeProvider extends React.Component<MuiThemeProviderProps, {}> { }

	export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
		accent?: boolean,
		className?: string,
		compact?: boolean,
		component?: React.ReactType,
		contrast?: boolean,
		disabled?: boolean,
		fab?: boolean,
		focusRipple?: boolean,
		href?: string,
		primary?: boolean,
		raised?: boolean,
		ripple?: boolean,
	}
	export class Button extends React.Component<ButtonProps, {}> { }

	export interface AppBarProps {
		accent?: boolean,
		className?: string,
		primary?: boolean,
	}
	export class AppBar extends React.Component<AppBarProps, {}> { }

	export interface DialogProps {
		className?: string,
		fullScreen?: boolean,
		ignoreBackdropClick?: boolean,
		ignoreEscapeKeyUp?: boolean,
		maxWidth?: 'xs' | 'sm' | 'md' | 'sm',
		onBackdropClick?: () => void,
		onEnter?: () => void,
		onEntering?: () => void,
		onEntered?: () => void,
		onEscapeKeyUp?: () => void,
		onExit?: () => void,
		onExiting?: () => void,
		onExited?: () => void,
		onRequestClose?: () => void,
		open?: boolean,
		paperClassName?: string,
		transition?: any,
		transitionDuration?: number,
	}
	export class Dialog extends React.Component<DialogProps, {}> { }

	export interface DialogActionsProps {
		className?: string,
	}
	export class DialogActions extends React.Component<DialogActionsProps, {}> { }

	export interface DialogContentProps {
		className?: string,
	}
	export class DialogContent extends React.Component<DialogContentProps, {}> { }

	export interface DialogContentTextProps {
		className?: string,
	}
	export class DialogContentText extends React.Component<DialogContentTextProps, {}> { }

	export interface DialogTitleProps {
		className?: string,
	}
	export class DialogTitle extends React.Component<DialogTitleProps, {}> { }

	export interface TextProps {
		align?: 'left' | 'center' | 'right' | 'justify',
		className?: string,
		colorInherit?: boolean,
		component?: string,
		gutterBottom?: boolean,
		noWrap?: boolean,
		paragraph?: boolean,
		secondary?: boolean,
		type?: 'display4' | 'display3' | 'display2' | 'display1' | 'headline' | 'title' | 'subheading' | 'body2' | 'body1' | 'caption' | 'button' | 'body1',
	}
	export class Text extends React.Component<TextProps, {}> { }

	export interface TextFieldProps {
		disabled?: boolean,
		error?: boolean,
		id?: string,
		inputClassName?: string,
		inputProps?: React.HTMLAttributes<HTMLInputElement>,
		label?: ReactEl,
		labelClassName?: string,
		required?: boolean,
		type?: string,
		value?: any,
	}
	export class TextField extends React.Component<TextFieldProps, {}> { }

	export interface TextFieldLabelProps {
		disableAnimation?: boolean,
		className?: string,
		error?: boolean,
		focused?: boolean,
		required?: boolean,
		shrink?: boolean,
	}
	export class TextFieldLabel extends React.Component<TextFieldLabelProps, {}> { }

	export interface InputProps extends React.HTMLAttributes<any> {
		className?: string,
		component?: string,
		disabled?: boolean,
		error?: boolean,
		inputClassName?: string,
		type?: string,
		disableUnderline?: boolean,
		value?: any,
	}
	export class Input extends React.Component<InputProps, {}> { }

	export interface InputLabelProps {
		animated?: boolean,
		className?: string,
		error?: boolean,
		focused?: boolean,
		required?: boolean,
		shrink?: boolean,
	}
	export class InputLabel extends React.Component<InputLabelProps, {}> { }

	export interface MenuProps extends React.HTMLAttributes<any> {
		anchorEl?: HTMLElement,
		className?: string,
		onEnter?: () => void,
		onEntering?: () => void,
		onEntered?: () => void,
		onExit?: () => void,
		onExiting?: () => void,
		onExited?: () => void,
		onRequestClose?: () => void,
		open?: boolean,
		transitionDuration?: string,
	}
	export class Menu extends React.Component<MenuProps, {}> { }

	export interface MenuItemProps {
		className?: string,
		component?: React.ReactType,
		selected?: boolean,
		onClick?: (e: React.MouseEvent<any>) => void,
		[key: string]: any;
	}
	export class MenuItem extends React.Component<MenuItemProps, {}> { }

	export interface CardProps {
		className?: string,
		raised?: boolean,
	}
	export class Card extends React.Component<CardProps, {}> { }

	export interface CardActionsProps {
		className?: string,
		disableActionSpacing?: boolean,
	}
	export class CardActions extends React.Component<CardActionsProps, {}> { }

	export interface CardContentProps {
		className?: string,
	}
	export class CardContent extends React.Component<CardContentProps, {}> { }

	export interface CardMediaProps {
		className?: string,
	}
	export class CardMedia extends React.Component<CardMediaProps, {}> { }

	export interface CardHeaderProps {
		className?: string,
		avatar?: ReactEl,
		subheader?: ReactEl,
		title?: ReactEl,
	}
	export class CardHeader extends React.Component<CardHeaderProps, {}> { }

	export interface IconProps {
		accent?: boolean,
		action?: boolean,
		className?: string,
		contrast?: boolean,
		disabled?: boolean,
		error?: boolean,
		primary?: boolean,
	}
	export class Icon extends React.Component<IconProps, {}> { }

	export interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
		accent?: boolean,
		className?: string,
		contrast?: boolean,
		disabled?: boolean,
		iconClassName?: string,
		ripple?: boolean,
	}
	export class IconButton extends React.Component<IconButtonProps, {}> { }

	export interface ListProps {
		className?: string,
		component?: React.ReactType,
		disablePadding?: boolean,
		subheader?: ReactEl,
	}
	export class List extends React.Component<ListProps, {}> { }

	export interface ListItemProps {
		className?: string,
		component?: React.ReactType,
		button?: boolean,
		dense?: boolean,
		divider?: boolean,
		disableGutters?: boolean,
		onClick?: (e: React.MouseEvent<any>) => void,
	}
	export class ListItem extends React.Component<ListItemProps, {}> { }

	export interface ListItemIconProps {
		className?: string,
	}
	export class ListItemIcon extends React.Component<ListItemIconProps, {}> { }

	export interface ListItemSecondaryActionProps {
		className?: string,
	}
	export class ListItemSecondaryAction extends React.Component<ListItemSecondaryActionProps, {}> { }

	export interface ListItemTextProps {
		className?: string,
		inset?: boolean,
		primary?: ReactEl,
		secondary?: ReactEl,
	}
	export class ListItemText extends React.Component<ListItemTextProps, {}> { }

	export interface ListSubheaderProps {
		className?: string,
		inset?: boolean,
		primary?: boolean,
	}
	export class ListSubheader extends React.Component<ListSubheaderProps, {}> { }

	export interface CircularProgressProps {
		className?: string,
		mode?: 'determinate' | 'indeterminate' | 'indeterminate',
		size?: number,
		value?: number,
	}
	export class CircularProgress extends React.Component<CircularProgressProps, {}> { }

	export interface LayoutProps {
		className?: string,
		component?: React.ReactType,
		container?: boolean,
		item?: boolean,
		xs?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
		sm?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
		md?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
		lg?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
		xl?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
		align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'flex-start',
		direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
		gutter?: 0 | 8 | 16 | 24 | 40,
		justify?: 'center' | 'flex-end' | 'space-between' | 'space-around' | 'flex-start'
		wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
	}
	export class Layout extends React.Component<LayoutProps, {}> { }

	export interface ToolbarProps {
		className?: string;
		guttres?: boolean;
	}
	export class Toolbar extends React.Component<ToolbarProps, {}> { }

	export interface AvatarProps {
		alt?: string,
		className?: string,
		component?: React.ReactType,
		sizes?: string,
		src?: string,
		srcSet?: string,
	}
	export class Avatar extends React.Component<AvatarProps, {}> { }

	export interface PaperProps {
		className?: string,
		elevation?: number,
		disableRipple?: boolean,
	}
	export class Paper extends React.Component<PaperProps, {}> { }

	export interface DividerProps {
		absolute?: boolean,
		className?: string,
		inset?: boolean,
		light?: boolean,
	}
	export class Divider extends React.Component<DividerProps, {}> { }

	export interface DrawerProps {
		anchor?: 'left' | 'top' | 'right' | 'bottom',
		className?: string,
		docked?: boolean,
		elevation?: number,
		enterTransitionDuration?: number,
		leaveTransitionDuration?: number,
		onRequestClose?: () => void,
		open?: boolean,
		paperClassName?: string,
	}
	export class Drawer extends React.Component<DrawerProps, {}> { }
}





declare module 'material-ui/Button' {
	export import Button = MaterialUI.Button
	export import ButtonProps = MaterialUI.ButtonProps
	export default Button
}

declare module 'material-ui/AppBar' {
	export import AppBar = MaterialUI.AppBar
	export import AppBarProps = MaterialUI.AppBarProps
	export default AppBar
}

declare module 'material-ui/Dialog' {
	export import Dialog = MaterialUI.Dialog
	export import DialogProps = MaterialUI.DialogProps

	export import DialogActions = MaterialUI.DialogActions
	export import DialogActionsProps = MaterialUI.DialogActionsProps

	export import DialogContent = MaterialUI.DialogContent
	export import DialogContentProps = MaterialUI.DialogContentProps

	export import DialogContentText = MaterialUI.DialogContentText
	export import DialogContentTextProps = MaterialUI.DialogContentTextProps

	export import DialogTitleProps = MaterialUI.DialogTitleProps
	export import DialogTitle = MaterialUI.DialogTitle
}

declare module 'material-ui/Text' {
	export import Text = MaterialUI.Text
	export import TextProps = MaterialUI.TextProps
	export default Text
}

declare module 'material-ui/TextField' {
	export import TextField = MaterialUI.TextField
	export import TextFieldProps = MaterialUI.TextFieldProps
	export default TextField
}

declare module 'material-ui/TextFieldLabel' {
	export import TextFieldLabel = MaterialUI.TextFieldLabel
	export import TextFieldLabelProps = MaterialUI.TextFieldLabelProps
	export default TextFieldLabel
}

declare module 'material-ui/Input' {
	export import Input = MaterialUI.Input
	export import InputProps = MaterialUI.InputProps
	export default Input
}

declare module 'material-ui/InputLabel' {
	export import InputLabel = MaterialUI.InputLabel
	export import InputLabelProps = MaterialUI.InputLabelProps
	export default InputLabel
}

declare module 'material-ui/Menu' {
	export import Menu = MaterialUI.Menu
	export import MenuProps = MaterialUI.MenuProps

	export import MenuItem = MaterialUI.MenuItem
	export import MenuItemProps = MaterialUI.MenuItemProps
}

declare module 'material-ui/Card' {
	export import Card = MaterialUI.Card
	export import CardProps = MaterialUI.CardProps

	export import CardActions = MaterialUI.CardActions
	export import CardActionsProps = MaterialUI.CardActionsProps

	export import CardContent = MaterialUI.CardContent
	export import CardContentProps = MaterialUI.CardContentProps

	export import CardHeader = MaterialUI.CardHeader
	export import CardHeaderProps = MaterialUI.CardHeaderProps

	export import CardMedia = MaterialUI.CardMedia
	export import CardMediaProps = MaterialUI.CardMediaProps
}

declare module 'material-ui/Icon' {
	export import Icon = MaterialUI.Icon
	export import IconProps = MaterialUI.IconProps
	export default Icon
}

declare module 'material-ui/IconButton' {
	export import IconButton = MaterialUI.IconButton
	export import IconButtonProps = MaterialUI.IconButtonProps
	export default IconButton
}

declare module 'material-ui/List' {
	export import List = MaterialUI.List
	export import ListProps = MaterialUI.ListProps

	export import ListItem = MaterialUI.ListItem
	export import ListItemProps = MaterialUI.ListItemProps

	export import ListItemIcon = MaterialUI.ListItemIcon
	export import ListItemIconProps = MaterialUI.ListItemIconProps

	export import ListItemSecondaryAction = MaterialUI.ListItemSecondaryAction
	export import ListItemSecondaryActionProps = MaterialUI.ListItemSecondaryActionProps

	export import ListItemText = MaterialUI.ListItemText
	export import ListItemTextProps = MaterialUI.ListItemTextProps

	export import ListSubheader = MaterialUI.ListSubheader
	export import ListSubheaderProps = MaterialUI.ListSubheaderProps
}

declare module 'material-ui/Progress' {
	export import CircularProgress = MaterialUI.CircularProgress
	export import CircularProgressProps = MaterialUI.CircularProgressProps
}

declare module 'material-ui/utils/customPropTypes' {
	var options: { muiRequired: any }

	export default options
}

declare module 'material-ui/styles/colors' {
	export const black = '#000000'
	export const white = '#ffffff'

	export const transparent = 'rgba(0, 0, 0, 0)'
	export const fullBlack = 'rgba(0, 0, 0, 1)'
	export const darkBlack = 'rgba(0, 0, 0, 0.87)'
	export const lightBlack = 'rgba(0, 0, 0, 0.54)'
	export const minBlack = 'rgba(0, 0, 0, 0.26)'
	export const faintBlack = 'rgba(0, 0, 0, 0.12)'
	export const fullWhite = 'rgba(255, 255, 255, 1)'
	export const darkWhite = 'rgba(255, 255, 255, 0.87)'
	export const lightWhite = 'rgba(255, 255, 255, 0.54)'

	export const red: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const pink: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const purple: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const deepPurple: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const indigo: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const blue: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const lightBlue: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const cyan: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const teal: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const green: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const lightGreen: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const lime: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const yellow: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const amber: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const orange: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const deepOrange: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const brown: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}

	export const grey: {
		50: string,
		100: string,
		200: string,
		300: string,
		400: string,
		500: string,
		600: string,
		700: string,
		800: string,
		900: string,
		A100: string,
		A200: string,
		A400: string,
		A700: string,
		contrastDefaultColor: string,
	}
}

declare module 'material-ui/Layout' {
	export import Layout = MaterialUI.Layout
	export import LayoutProps = MaterialUI.LayoutProps
	export default Layout
}

declare module 'material-ui/Toolbar' {
	export import Toolbar = MaterialUI.Toolbar
	export import ToolbarProps = MaterialUI.ToolbarProps
	export default Toolbar
}

declare module 'material-ui/styles/theme' {
	export function createMuiTheme(config: any): any;
	export default createMuiTheme;
}

declare module 'material-ui/styles/palette' {
	export function createPalette(config: any): any;
	export default createPalette;
}

declare module 'material-ui/styles/MuiThemeProvider' {
	export import MuiThemeProvider = MaterialUI.MuiThemeProvider
	export import MuiThemeProviderProps = MaterialUI.MuiThemeProviderProps
	export default MuiThemeProvider
}

declare module 'material-ui/Avatar' {
	export import Avatar = MaterialUI.Avatar
	export import AvatarProps = MaterialUI.AvatarProps
	export default Avatar
}

declare module 'material-ui/Paper' {
	export import Paper = MaterialUI.Paper
	export import PaperProps = MaterialUI.PaperProps
	export default Paper
}

declare module 'material-ui/Divider' {
	export import Divider = MaterialUI.Divider
	export import DividerProps = MaterialUI.DividerProps
	export default Divider
}

declare module 'material-ui/Drawer' {
	export import Drawer = MaterialUI.Drawer
	export import DrawerProps = MaterialUI.DrawerProps
	export default Drawer
}
