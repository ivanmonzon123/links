import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="home">
      <h1>Welcome to LinksApp</h1>
      <p>Random Rick and Morty metadata is loaded for social previews.</p>
    </div>
  `,
  styles: [`.home { padding: 1rem; }`]
})
export class HomeComponent {}
