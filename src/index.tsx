import * as React from 'react';
import { Component, ReactComponentElement } from 'react';
import './styles.module.scss';

export class MultiTierMenu extends Component<any> {
  public render(): ReactComponentElement<any> {
    return (
      <div className="test">
        Example Component: {this.props.text}
      </div>
    );
  }
}
