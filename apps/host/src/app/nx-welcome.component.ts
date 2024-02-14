import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'challenge-md-nx-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!--
     * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     This is a starter component and can be deleted.
     * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     Delete this file and get started with your project!
     * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     -->
    
    <div class="container">
      <h1>Welcome to Nx</h1>
      <p>
        This is an Angular CLI app built with Nx. It is a set of extensible dev
        tools for monorepos, which helps you develop like Google, Facebook, and
        Microsoft.
      </p>
      <p>
        <a
          class="btn btn-primary"
          href="https://nx.dev/angular/getting-started/what-is-nx"
          target="_blank"
          rel="noopener"
        >
          Learn Nx
        </a>
      </p>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
