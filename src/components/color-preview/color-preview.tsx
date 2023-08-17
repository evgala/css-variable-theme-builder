import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'color-preview',
  styleUrl: 'color-preview.css',
  shadow: true,
})
export class ColorPreview {
  @Prop() backgroundColorVar!: string;
  @Prop() colorVar!: string;
  @Prop() elements!: HTMLElement[];
  render() {
    return (
      <article
        style={{
          backgroundColor: `var(${this.backgroundColorVar}, var(--background))`,
          color: `var(${this.colorVar}, var(--foreground))`,
        }}
      >
        {this.elements}
      </article>
    );
  }
}
