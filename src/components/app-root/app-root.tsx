import { Component, h, Listen, State, Watch } from '@stencil/core';
import { v4 as uuid } from 'uuid';
import type { Color } from '../../types';
import getContrastColor from '../../fns/getContrastColor';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() colors: Color[] = [];

  @Listen('colorSubmitted')
  onColorAdded(event: CustomEvent<string>) {
    this.colors = [
      ...this.colors,
      { uuid: uuid(), color: '', label: event.detail },
    ];
  }

  @Listen('colorChanged')
  onColorChanged(event: CustomEvent<Color>) {
    const index = this.colors.findIndex(
      color => color.uuid === event.detail.uuid,
    );
    if (index === -1) {
      return;
    }
    this.colors = [
      ...this.colors.slice(0, index),
      event.detail,
      ...this.colors.slice(index + 1),
    ];
  }

  getColors() {
    return this.colors.map(({ color, label }) => [
      `--${label.toLocaleLowerCase()}`,
      `${color}`,
    ]);
  }

  getOutput() {
    return `:root {\n  ${this.getColors()
      .map(o => o.join(': '))
      .join(';\n  ')}\n}`;
  }

  getElements() {
    return this.colors.map(({ color, label }) => (
      <div>
        <span
          class="label"
          style={{
            backgroundColor: `var(--${label.toLocaleLowerCase()})`,
            color: getContrastColor(color),
            display: 'inline-block',
            textAlign: 'center',
            width: '100px',
          }}
        >
          {label}
        </span>
        <span> | </span>
        <span
          class="value"
          style={{
            backgroundColor: getContrastColor(color),
            color: `var(--${label.toLocaleLowerCase()})`,
          }}
        >{`var(--${label.toLocaleLowerCase()})`}</span>
      </div>
    ));
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
        <color-preview
          backgroundColorVar="--background"
          colorVar="--foreground"
          elements={this.getElements()}
          style={Object.fromEntries(this.getColors())}
        />
      </div>
    );
  }

  @Watch('colors')
  onColors() {
    localStorage.setItem(
      'css-variable-theme-builder:colors',
      JSON.stringify(this.colors),
    );
  }

  componentWillLoad() {
    this.colors = JSON.parse(
      localStorage.getItem('css-variable-theme-builder:colors') || '[]',
    ).filter(({ label }) => !!label);
  }
}
