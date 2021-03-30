import React, { Component, ReactComponentElement } from 'react';

import { MultiTierMenu } from 'multi-tier-menu';
import 'multi-tier-menu/dist/index.css';


export default class App extends Component<any> {
  public render(): ReactComponentElement<any> {
    return (
      <MultiTierMenu text="Working widget 😄" />
    );
  }
}
