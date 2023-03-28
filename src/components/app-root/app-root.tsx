import { Component, h, Listen, State, Watch } from '@stencil/core';
import { v4 as uuid } from 'uuid';
import type { Color } from '../../types';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() colors: Color[] = [];

  @Listen('colorSubmitted')
  onColorAdded(event: CustomEvent<string>) {
    this.colors = [...this.colors, { uuid: uuid(), color: '', label: event.detail }];
  }

  @Listen('colorChanged')
  onColorChanged(event: CustomEvent<Color>) {
    const index = this.colors.findIndex(color => color.uuid === event.detail.uuid);
    if (index === -1) {
      return;
    }
    this.colors = [...this.colors.slice(0, index), event.detail, ...this.colors.slice(index + 1)];
  }

  getOutput() {
    return `:root {\n  ${this.colors.map(({ color, label }) => `--${label.toLocaleLowerCase()}: ${color};`).join('\n  ')}\n}`;
  }

  render() {
    return (
      <div>
        <header>
          <h1>css-variable-theme-builder</h1>
        </header>

        <add-color />
        {this.colors.map(({ uuid, color, label }) => (
          <color-picker color={color} uuid={uuid} label={label} />
        ))}
        <pre>
          <code>{this.getOutput()}</code>
        </pre>
      </div>
    );
  }

  @Watch('colors')
  onColors() {
    localStorage.setItem('css-variable-theme-builder:colors', JSON.stringify(this.colors));
  }

  componentWillLoad() {
    this.colors = JSON.parse(localStorage.getItem('css-variable-theme-builder:colors') || '[]');
  }
}
