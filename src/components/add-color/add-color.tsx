import { Component, Event, EventEmitter, h, State } from '@stencil/core';

@Component({
  tag: 'add-color',
  shadow: true,
})
export class AddColor {
  @State() colorName: string;

  @Event() colorSubmitted: EventEmitter<string>;

  onInput(event: Event) {
    this.colorName = (event.target as HTMLInputElement).value;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.colorSubmitted.emit(this.colorName);
    this.colorName = '';
  }

  render() {
    return (
      <form onSubmit={event => this.onSubmit(event)}>
        <fieldset>
          <legend>
            <label htmlFor="add-color">Add Color</label>
          </legend>
          <input type="text" id="add-color" placeholder="eg. primary" onChange={event => this.onInput(event)} value={this.colorName} />
        </fieldset>
        <button onClick={event => this.onSubmit(event)}>Add color</button>
      </form>
    );
  }
}
