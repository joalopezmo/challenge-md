import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialUiModule } from '@challenge-md/ui';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, SharedMaterialUiModule],
  selector: 'challenge-md-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'host';
}
