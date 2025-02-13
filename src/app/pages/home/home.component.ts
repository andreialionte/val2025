import { Component, OnInit, ElementRef, ViewChild, QueryList, ViewChildren, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { ModalComponent } from '../../common/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('kitty') kitty!: ElementRef;
  @ViewChild('bow') bow!: ElementRef;
  @ViewChild('loveButton') loveButton!: ElementRef;
  @ViewChild('sparklesContainer') sparklesContainer!: ElementRef;
  @ViewChildren('heart') hearts!: QueryList<ElementRef>;
  @ViewChildren('flower') flowers!: QueryList<ElementRef>;

  private clickCount = 0;
  private maxClickStage = 5;
  private modalShown = false;
  private emojis = ['💖', '💕', '💝', '💗', '💓', '💞', '🌸', '✨'];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeAnimations();
    this.startFloatingHearts();
    this.animateFlowers();
  }

  private initializeAnimations(): void {
    gsap.to(this.kitty.nativeElement, {
      y: -20,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });

    gsap.to(this.bow.nativeElement, {
      rotation: 10,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    gsap.to(this.loveButton.nativeElement, {
      scale: 1.1,
      duration: 0.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }

  public triggerLoveAnimation(): void {
    this.clickCount++;
    const stage = Math.min(Math.floor(this.clickCount / 5), this.maxClickStage);
    
    // Basic heart explosion for every click
    this.createHeartExplosion();
    this.createSparkles();
    this.createEmojiExplosion();

    // Progressive effects based on click count
    switch(stage) {
      case 1:
        this.triggerRainbowMode();
        break;
      case 2:
        this.triggerKittyDance();
        break;
      case 3:
        this.triggerHeartStorm();
        break;
      case 4:
        this.triggerSparkleExplosion();
        break;
      case 5:
        this.triggerFinalCelebration();
        break;
    }
  }

  private createEmojiExplosion(): void {
    const buttonRect = this.loveButton.nativeElement.getBoundingClientRect();
    const startX = buttonRect.left + buttonRect.width / 2;
    const startY = buttonRect.top + buttonRect.height / 2;

    // Create 10 emojis
    for (let i = 0; i < 10; i++) {
      const emoji = document.createElement('div');
      emoji.textContent = this.emojis[Math.floor(Math.random() * this.emojis.length)];
      emoji.style.position = 'absolute';
      emoji.style.fontSize = '30px';
      emoji.style.zIndex = '9999';
      emoji.style.userSelect = 'none';
      emoji.style.pointerEvents = 'none';
      this.sparklesContainer.nativeElement.appendChild(emoji);

      // Starting position
      gsap.set(emoji, {
        x: startX,
        y: startY,
        scale: 0.5,
        opacity: 1
      });

      // Random direction and distance
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 100;
      const duration = 0.8 + Math.random() * 0.5;

      // Animation timeline
      const tl = gsap.timeline();
      
      tl.to(emoji, {
        x: startX + Math.cos(angle) * distance,
        y: startY + Math.sin(angle) * distance,
        scale: 1,
        rotation: Math.random() * 360,
        duration: duration,
        ease: "power2.out"
      })
      .to(emoji, {
        opacity: 0,
        y: '+=50',
        duration: duration * 0.5,
        ease: "power2.in",
        onComplete: () => emoji.remove()
      }, `-=${duration * 0.2}`);
    }
  }

  private startFloatingHearts(): void {
    this.hearts.forEach((heart, index) => {
      const startX = Math.random() * window.innerWidth;
      const element = heart.nativeElement;
      
      gsap.set(element, {
        x: startX,
        y: window.innerHeight + 100,
        opacity: 0,
        scale: 0.5 + Math.random() * 0.5
      });

      this.animateHeart(element);
    });
  }

  private animateHeart(element: HTMLElement): void {
    const duration = 4 + Math.random() * 3;
    const startX = Math.random() * window.innerWidth;

    gsap.to(element, {
      x: startX + (-100 + Math.random() * 200),
      y: -100,
      opacity: 1,
      duration: duration,
      ease: "none",
      onComplete: () => {
        gsap.set(element, {
          x: startX,
          y: window.innerHeight + 100,
          opacity: 0
        });
        this.animateHeart(element);
      }
    });
  }

  //... continuing from previous code

  private animateFlowers(): void {
    this.flowers.forEach((flower, index) => {
      const element = flower.nativeElement;
      gsap.set(element, { x: (index * 20) + '%' });
      
      gsap.to(element.querySelector('.petals'), {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      gsap.to(element, {
        y: -10,
        duration: 1.5 + Math.random(),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: Math.random()
      });
    });
  }

  private createHeartExplosion(): void {
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const velocity = 5 + Math.random() * 5;
      const heart = document.createElement('div');
      heart.className = 'heart';
      this.sparklesContainer.nativeElement.appendChild(heart);

      gsap.set(heart, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        scale: 0.5 + Math.random() * 0.5
      });

      gsap.to(heart, {
        x: `+=${Math.cos(angle) * 200 * velocity}`,
        y: `+=${Math.sin(angle) * 200 * velocity}`,
        opacity: 0,
        scale: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => heart.remove()
      });
    }
  }

  private createSparkles(): void {
    for (let i = 0; i < 30; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      this.sparklesContainer.nativeElement.appendChild(sparkle);

      gsap.set(sparkle, {
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 400,
        y: window.innerHeight / 2 + (Math.random() - 0.5) * 400,
        scale: 0
      });

      gsap.to(sparkle, {
        scale: 1 + Math.random(),
        opacity: 0,
        duration: 1 + Math.random(),
        ease: "power1.out",
        onComplete: () => sparkle.remove()
      });
    }
  }

  private triggerRainbowMode(): void {
    const colors = ['#ff69b4', '#ff1493', '#ff69b4', '#ff1493', '#ff69b4'];
    gsap.to('body', {
      background: `linear-gradient(45deg, ${colors.join(',')})`,
      duration: 2,
      yoyo: true,
      repeat: 3
    });

    gsap.to(this.kitty.nativeElement.querySelector('.face'), {
      boxShadow: '0 0 30px rgba(255,105,180,0.8)',
      duration: 0.5
    });
  }

  private triggerKittyDance(): void {
    const tl = gsap.timeline();
    tl.to(this.kitty.nativeElement, {
      rotation: 360,
      duration: 1,
      ease: "power1.inOut"
    })
    .to(this.kitty.nativeElement, {
      scale: 1.2,
      duration: 0.5,
      yoyo: true,
      repeat: 1
    })
    .to(this.kitty.nativeElement, {
      y: -50,
      duration: 0.5,
      yoyo: true,
      repeat: 1
    });
  }

  private triggerHeartStorm(): void {
    for (let i = 0; i < 50; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart';
      this.sparklesContainer.nativeElement.appendChild(heart);

      gsap.set(heart, {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 100,
        scale: 0.5 + Math.random() * 1
      });

      gsap.to(heart, {
        x: `+=${Math.random() * 400 - 200}`,
        y: -200,
        rotation: Math.random() * 360,
        duration: 3 + Math.random() * 2,
        ease: "power1.out",
        onComplete: () => heart.remove()
      });
    }
  }

  private triggerSparkleExplosion(): void {
    for (let ring = 0; ring < 3; ring++) {
      setTimeout(() => {
        for (let i = 0; i < 36; i++) {
          const angle = (i / 36) * Math.PI * 2;
          const sparkle = document.createElement('div');
          sparkle.className = 'sparkle';
          this.sparklesContainer.nativeElement.appendChild(sparkle);

          gsap.set(sparkle, {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          });

          gsap.to(sparkle, {
            x: window.innerWidth / 2 + Math.cos(angle) * (200 + ring * 100),
            y: window.innerHeight / 2 + Math.sin(angle) * (200 + ring * 100),
            opacity: 0,
            duration: 2,
            ease: "power2.out",
            onComplete: () => sparkle.remove()
          });
        }
      }, ring * 200);
    }
  }

  private triggerFinalCelebration(): void {
    // Previous celebration effects
    this.triggerRainbowMode();
    this.triggerKittyDance();
    this.triggerHeartStorm();
    this.triggerSparkleExplosion();

    // Extra special effects
    gsap.to(this.kitty.nativeElement, {
      scale: 2,
      duration: 1,
      yoyo: true,
      repeat: 1,
      ease: "elastic.out(1, 0.3)"
    });

    // Create a spinning ring of hearts
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart';
      this.sparklesContainer.nativeElement.appendChild(heart);
      
      gsap.set(heart, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        scale: 1
      });

      gsap.to(heart, {
        rotation: i * 30 + 720,
        x: window.innerWidth / 2 + Math.cos(i * Math.PI / 6) * 200,
        y: window.innerHeight / 2 + Math.sin(i * Math.PI / 6) * 200,
        duration: 3,
        ease: "power2.inOut",
        onComplete: () => heart.remove()
      });
    }

    // confetti effects
    this.fireConfetti();

    // show modal after 1500 ms 
    setTimeout(() => {
      this.showCelebrationModal();
    }, 1500);
  }

  private fireConfetti(): void {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        shapes: ['heart'],
        colors: ['#ff69b4', '#ff1493', '#ff69b4', '#ff1493']
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  private showCelebrationModal(): void {
    if (this.modalShown) return;
    
    this.modalShown = true;
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      panelClass: 'celebration-dialog',
      disableClose: true,
      autoFocus: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.modalShown = false;
    });
  }
}