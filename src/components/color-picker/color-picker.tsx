import { Component, Prop, h, Event, EventEmitter, State } from '@stencil/core';
import { Color } from '../../types';

@Component({
  tag: 'color-picker',
  styleUrl: 'color-picker.css',
  shadow: true,
})
export class ColorPicker {
  @Prop() color: string;
  @Prop() label: string;
  @Prop() uuid: string;

  @Event() colorChanged: EventEmitter<Color>;

  @State() editing = false;

  render() {
    return (
      <fieldset class="color-picker" id={this.uuid}>
        <legend>
          <label htmlFor={`color-${this.uuid}`}>{this.label}</label>
        </legend>
        <input
          id={`color-${this.uuid}`}
          onChange={event => this.colorChanged.emit({ uuid: this.uuid, label: this.label, color: (event.target as HTMLInputElement).value })}
          type="color"
          value={this.color}
        />
        {this.editing && (
          <input onChange={event => this.colorChanged.emit({ uuid: this.uuid, label: (event.target as HTMLInputElement).value, color: this.color })} value={this.label} />
        )}
        <button onClick={() => (this.editing = !this.editing)}>{this.editing ? 'Close' : 'Edit'}</button>
      </fieldset>
    );
  }
}
