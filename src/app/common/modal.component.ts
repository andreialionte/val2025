import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, RouterLink],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  hearts = ['❤️', '💖', '💝', '💕', '💗', '💓', '💞', '💘'];

  constructor(private dialogRef: MatDialogRef<ModalComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  randomPositionButton(): void {
    const button = document.querySelector('.buton-secundar') as HTMLElement;
    if (button) {
      // Get viewport dimensions
      const viewportWidth = window.innerWidth - button.offsetWidth;
      const viewportHeight = window.innerHeight - button.offsetHeight;

      // Calculate random position
      const randomX = Math.floor(Math.random() * viewportWidth);
      const randomY = Math.floor(Math.random() * viewportHeight);

      // Apply new position
      button.style.position = 'fixed'; // Use fixed to position relative to viewport
      button.style.left = randomX + 'px';
      button.style.top = randomY + 'px';
    }
  }
}