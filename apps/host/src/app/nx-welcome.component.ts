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
      <header>
        <h1>Microfrontend Architecture Project</h1>
      </header>
      <main>
        <section id="main-idea">
          <h2>The Main Idea</h2>
          <p>
            The main idea of this repo is to make a CRUD application created in
            Angular 17, using the microfronts architecture by federated modules,
            using Nx as monorepo. Although the repository has 3 projects,
            challenge-md, host, and table; this example is only structured in
            the host and table applications, and the challenge-md application is
            only as an example that in a monorepo can subsist alternate
            applications that are not related, without affecting project
            developments. The project is an application of microfrontend
            architecture, so it is composed of different applications that are
            independent and can be deployed independently.
          </p>
        </section>
        <section id="applications">
          <h2>Applications</h2>
          <div class="application">
            <h3>Host</h3>
            <p>
              Is the main application of the project, a recipe application that
              allows managing the remotes microfront of the project. It will
              contain the main menu, a login screen, and the router outlet. It
              has been developed with standalone components and will implement
              functional guards, interceptors, and services.
            </p>
          </div>
          <div class="application">
            <h3>Table</h3>
            <p>
              Is a microfrontend application that allows interacting with the
              back API. It has one standalone component, table, that allows
              showing the information of the API.
            </p>
          </div>
        </section>
        <section id="libraries">
          <h2>Libraries</h2>
          <div class="library">
            <h3>UI</h3>
            <p>
              Contains the shared UI modules imported from Angular Material. The
              library is imported by the different applications of the project
              and is transversal to the project. It shows the potential of the
              monorepo architecture by allowing sharing code between the
              different applications without the need for creating an npm
              package or a git submodule.
            </p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Microfrontend Architecture Project</p>
      </footer>
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
    </div>
  `,
  styles: `body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
}

header {
    background-color: #333;
    color: #fff;
    padding: 20px;
    text-align: center;
}

main {
    padding: 20px;
}

h2 {
    margin-top: 0;
}

.application, .library {
    margin-bottom: 20px;
}

footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
    position: fixed;
    bottom: 0;
    width: 100%;
}
`,
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
