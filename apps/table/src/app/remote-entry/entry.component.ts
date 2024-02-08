import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'challenge-md-table-entry',
  template: `<challenge-md-nx-welcome></challenge-md-nx-welcome>`,
})
export class RemoteEntryComponent {}
