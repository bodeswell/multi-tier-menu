import { MenuItem, MultiTierMenu } from 'multi-tier-menu';
import 'multi-tier-menu/dist/index.css';
import React, { Component, ReactComponentElement } from 'react';

export default class App extends Component<any> {
    public state = {
        selection: ''
    };

    private menuItems: MenuItem[] = [
        {
            label: 'Default Selection',
            value: 'default',
            description: 'A basic budget to manage your overall spending month to month.',
            separator: true
        },
        {
            label: 'Parent2',
            value: 'Parent2',
            separator: false,
            children: [
                {
                    label: 'Child1',
                    value: 'Child1',
                    separator: false
                },
                {
                    label: 'Child2',
                    value: 'Child2',
                    separator: false
                },
                {
                    label: 'Child3',
                    value: 'Child3',
                    separator: false
                },
                {
                    label: 'Child4',
                    value: 'Child4',
                    separator: false
                },
                {
                    label: 'Child5',
                    value: 'Child5',
                    separator: false
                }
            ]
        },
        {
            label: 'Parent3',
            value: 'Parent3',
            separator: false,
            children: [
                {
                    label: 'Child6',
                    value: 'Child6',
                    separator: false
                },
                {
                    label: 'Child7',
                    value: 'Child7',
                    separator: false
                },
                {
                    label: 'Child8',
                    value: 'Child8',
                    separator: false
                },
                {
                    label: 'Child9',
                    value: 'Child9',
                    separator: false
                },
                {
                    label: 'Child10',
                    value: 'Child10',
                    separator: false
                }
            ]
        },
        {
            label: 'Parent4',
            value: 'Parent4',
            separator: false,
            children: [
                {
                    label: 'Child11',
                    value: 'Child11',
                    separator: false
                },
                {
                    label: 'Child12',
                    value: 'Child12',
                    separator: false
                },
                {
                    label: 'Child13',
                    value: 'Child13',
                    separator: false
                },
                {
                    label: 'Child14',
                    value: 'Child14',
                    separator: false
                },
                {
                    label: 'Child15',
                    value: 'Child15',
                    separator: false
                }
            ]
        },
        {
            label: 'Parent5',
            value: 'Parent5',
            separator: false,
            children: [
                {
                    label: 'Child16',
                    value: 'Child16',
                    separator: false
                },
                {
                    label: 'Child17',
                    value: 'Child17',
                    separator: false
                },
                {
                    label: 'Child18',
                    value: 'Child18',
                    separator: false
                },
                {
                    label: 'Child19',
                    value: 'Child19',
                    separator: false
                },
                {
                    label: 'Child20',
                    value: 'Child20',
                    separator: false
                }
            ]
        }
    ];

    public render(): ReactComponentElement<any> {
        return (
            <div>
                <MultiTierMenu menuItems={this.menuItems}
                               addCallback={(selection: MenuItem) =>
                                   this.setState({ selection: `Adding custom subcategory to ${selection.value}` })}
                               addName="Add custom subcategory"
                               className="customPrefix"
                               placeholder="Click Me"
                               bland={false}
                               callback={(item: MenuItem) =>
                                   this.setState({ selection: `${item.value} selected.`})}
                               style={{ position: 'absolute', top: '100px', left: 'calc(50% - 125px)' }}/>
                <h1 style={{ textAlign: 'center', width: '100%'}}>{this.state.selection}</h1>
            </div>
        );
    }
}
