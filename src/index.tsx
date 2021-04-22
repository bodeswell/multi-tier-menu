import $ from 'jquery';
import * as _ from 'lodash';
import * as React from 'react';
import { Component, ReactComponentElement } from 'react';
import { ReactComponent as PlusIcon } from './plus-icon.svg';

import 'typeface-poppins';
import styles from './styles.scss';

export interface MenuItem {
    label: string;
    value: string | number;
    separator: boolean;
    description?: string;
    sectionHeading?: string;
    children?: MenuItem[];
}

interface MenuProps extends Component {
    addCallback?: (selection: MenuItem) => any;
    addName?: string;
    callback?: (item: MenuItem) => any;
    menuItems: MenuItem[];
    selection?: MenuItem;
    placeholder?: string
    bland?: boolean;
}

interface MenuState {
    mainMenu: boolean;
    hoverPosition?: number;
    secondaryMenu?: MenuItem;
    selection?: MenuItem;
}

export class MultiTierMenu extends Component<any, MenuState> {
    private uuid: string = Math.floor(Math.random() * 8999999999 + 1000000000).toString();

    public state = {
        mainMenu: false,
        hoverPosition: 56,
        secondaryMenu: {} as MenuItem,
        selection: {} as MenuItem
    };

    public static getDerivedStateFromProps(props: MenuProps, prevState: MenuState): MenuState {
        const placeHolder: MenuItem|undefined = props.placeholder ? {
            label: props.placeholder,
            value: props.placeholder,
            separator: false
        } : undefined;
        if (_.isEmpty(prevState.selection)) {
            return { ...prevState, selection: props.selection || placeHolder || props.menuItems[0] };
        } else if (props.selection && prevState.selection && props.selection.value !== prevState.selection.value) {
            return { ...prevState, selection: props.selection };
        }

        return prevState;
    }

    public componentDidMount(): void {
        this.startCloseListener();
    }

    public componentWillUnmount(): void {
        this.stopCloseListener();
    }

    public render(): ReactComponentElement<any> {
        const containerClass: string = this.props.className ?
            `${this.props.className} ${this.props.bland ? styles.mtmContainerBland : styles.mtmContainer}` :
            ` ${this.props.bland ? styles.mtmContainerBland : styles.mtmContainer}`;
        return (
            <div style={this.props.style}
                 className={containerClass}
                 onClick={this.openMenu.bind(this)}>
                <div className={styles.selectText}>
                    {this.state.selection.label}
                </div>
                <i className={`${styles.arrow} ${styles.arrowDown}`}/>
                {this.getMenuLayout()}
            </div>
        );
    }

    private getMenuLayout(): JSX.Element | null {
        if (_.isEmpty(this.props.menuItems) || !this.state.mainMenu) {
            return null;
        }

        let layoutItems: JSX.Element[] = [];
        let secondLayoutItems: JSX.Element[] = [];
        for (const menuItem of this.props.menuItems) {
            const rightArrow: JSX.Element | null = menuItem.children ?
                <i className={`${styles.arrow} ${styles.arrowRight} ${styles.itemIcon}`}/> : null;
            const description: JSX.Element | null = menuItem.description ?
                <div className={this.props.className ?
                    `${this.props.className}ItemDesc ${styles.itemDesc}` : styles.itemDesc}>
                    {menuItem.description}
                </div> : null;
            const hasSeparator: JSX.Element | null = menuItem.separator ? <hr/> : null;

            layoutItems.push(
                <li key={`item-${menuItem.label}`}
                    onMouseOver={(e: any) => {
                        this.setState({
                            secondaryMenu: menuItem,
                            hoverPosition: this.getRelativeHeight(e, $(`.${styles.mtmMenu}`).first().get(0))
                        });
                    }}
                    onClick={(e) => this.sendSelection(e, menuItem)}>
                    <div className={this.props.className ?
                        `${this.props.className}ItemText ${styles.itemText}` : styles.itemText}>{menuItem.label}</div>
                    {rightArrow}
                    {description}
                    {hasSeparator}
                </li>
            );
        }

        if (this.state.secondaryMenu && this.state.secondaryMenu.children) {
            for (const child of this.state.secondaryMenu.children) {
                const description: JSX.Element | null = child.description ?
                    <div className={this.props.className ?
                        `${this.props.className}ItemDesc ${styles.itemDesc}` : styles.itemDesc}>
                        {child.description}
                    </div> : null;
                const hasSeparator: JSX.Element | null = child.separator ? <hr/> : null;

                secondLayoutItems.push(
                    <li key={`item-${child.label}`} onClick={(e) => this.sendSelection(e, child)}>
                        <div className={this.props.className ?
                            `${this.props.className}ItemText ${styles.itemText}` : styles.itemText}>{child.label}</div>
                        {description}
                        {hasSeparator}
                    </li>
                );
            }

            if (this.props.addName) {
                secondLayoutItems.push(
                    <li key={`item-${this.props.addName}`} onClick={(e) => this.sendAddCallback(e, this.state.secondaryMenu)}>
                        <PlusIcon className={this.props.className ?
                            `${this.props.className}PlusIcon ${styles.plusIcon}` : styles.itemText} />
                        <div className={styles.itemText}>{this.props.addName}</div>
                    </li>
                );
            }
        }

        const layout: JSX.Element | null = layoutItems.length ? (
            <div className={this.props.className ?
                `${this.props.className}MtmMenu ${styles.mtmMenu}` : styles.mtmMenu}>
                <ul>
                    {layoutItems}
                </ul>
            </div>
        ) : null;

        const menuHeight: number = this.props.bland ? 40 : 34;
        const menuPosition: number = this.state.hoverPosition + 56 - ((secondLayoutItems.length * menuHeight / 2));
        const secondLayout: JSX.Element | null = secondLayoutItems.length ? (
            <div className={this.props.className ?
                `${this.props.className}MtmMenu ${styles.mtmMenu}` : styles.mtmMenu}
                 style={{ top: `${menuPosition}px` }}>
                <ul>
                    {secondLayoutItems}
                </ul>
            </div>
        ) : null;

        return (
            <div>
                {layout}
                {secondLayout}
            </div>
        );
    }

    private getRelativeHeight(event: any, target: any = event.target): number {
        const bounds: DOMRect = target.getBoundingClientRect();
        return event.clientY - bounds.top;
    }

    private openMenu(): void {
        if (_.isEmpty(this.state.mainMenu))
            this.setState({ mainMenu: true });
    }

    private sendAddCallback(event: any, selection: MenuItem): void {
        event.stopPropagation();
        this.setState({ mainMenu: false, secondaryMenu: undefined, hoverPosition: undefined });
        if (this.props.addCallback) this.props.addCallback(selection);
    }

    private sendSelection(event: any, selection: MenuItem): void {
        event.stopPropagation();
        this.setState({ selection: selection, mainMenu: false, secondaryMenu: undefined, hoverPosition: undefined });
        if (this.props.callback) this.props.callback(selection);
    }

    private startCloseListener(): void {
        const containerClass: string = this.props.bland ? styles.mtmContainerBland : styles.mtmContainer;
        this.stopCloseListener();
        $(document).on(`click.menuclose${this.uuid}`, (event: any) => {
            const $target: JQuery = $(event.target).first();
            if (!$target.hasClass(containerClass) && !$target.parents(`.${containerClass}`).length) {
                this.setState({ mainMenu: false, secondaryMenu: undefined, hoverPosition: undefined });
            } else {
                return;
            }
        });
    }

    private stopCloseListener(): void {
        $(document).off(`click.menuclose${this.uuid}`);
    }
}
