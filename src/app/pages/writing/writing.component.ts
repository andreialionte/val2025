import { Component, ElementRef, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-writing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WritingComponent implements AfterViewInit {
  @ViewChild('letterContent') letterContent!: ElementRef;
  @ViewChild('magicButton') magicButton!: ElementRef;
  @ViewChild('bow') bow!: ElementRef;
  private isAnimating = false;

  ngAfterViewInit() {
    this.initializeAnimations();
    this.addHoverEffect();
  }

  private initializeAnimations(): void {
    // Initialize permanent animations
    gsap.to('.floating-element', {
      y: -20,
      duration: 2,
      yoyo: true,
      repeat: -1,
      stagger: 0.2,
      ease: "power1.inOut"
    });

    // Add parallax effect
    document.addEventListener('mousemove', (e) => {
      if (this.isAnimating) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX - innerWidth / 2) * 0.005;
      const moveY = (clientY - innerHeight / 2) * 0.005;

      gsap.to(this.letterContent.nativeElement, {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: "power2.out"
      });
    });
  }

  private addHoverEffect(): void {
    const letter = this.letterContent.nativeElement;
    
    letter.addEventListener('mouseenter', () => {
      if (this.isAnimating) return;
      
      gsap.to(letter, {
        scale: 1.02,
        boxShadow: "0 15px 40px rgba(0,0,0,0.15), 0 0 40px rgba(255,192,203,0.3) inset",
        duration: 0.3,
        ease: "power2.out"
      });

      // Create sparkle effect on hover
      this.createMiniSparkles();
    });

    letter.addEventListener('mouseleave', () => {
      if (this.isAnimating) return;
      
      gsap.to(letter, {
        scale: 1,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1), 0 0 30px rgba(255,192,203,0.2) inset",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }

  private createMiniSparkles(): void {
    const rect = this.letterContent.nativeElement.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.position = 'absolute';
      sparkle.style.width = '4px';
      sparkle.style.height = '4px';
      sparkle.style.background = `hsl(${Math.random() * 60 + 320}, 100%, 75%)`;
      sparkle.style.borderRadius = '50%';
      sparkle.style.filter = 'blur(1px)';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '1000';
      document.body.appendChild(sparkle);

      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 50;
      const startX = rect.left + Math.random() * rect.width;
      const startY = rect.top + Math.random() * rect.height;

      gsap.fromTo(sparkle,
        {
          x: startX,
          y: startY,
          scale: 0,
          opacity: 1
        },
        {
          x: startX + Math.cos(angle) * distance,
          y: startY + Math.sin(angle) * distance,
          scale: 1.5,
          opacity: 0,
          duration: 0.8 + Math.random() * 0.4,
          ease: "power2.out",
          onComplete: () => sparkle.remove()
        }
      );
    }
  }

  public triggerMagicEffect(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;

    // Create initial flash effect
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = 'white';
    flash.style.opacity = '0.8';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '999';
    document.body.appendChild(flash);

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          this.isAnimating = false;
        }, 2000);
      }
    });

    // Flash effect
    tl.to(flash, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => flash.remove()
    });

    // Letter effect
    tl.to(this.letterContent.nativeElement, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    })
    .to(this.letterContent.nativeElement, {
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });

    // Create multiple effects
    this.createSparkleExplosion();
    this.createFloatingEmojis();
    this.createHeartTrail();
  }

  private createSparkleExplosion(): void {
    const rect = this.letterContent.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 40; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.position = 'fixed';
      sparkle.style.width = '6px';
      sparkle.style.height = '6px';
      sparkle.style.borderRadius = '50%';
      sparkle.style.background = `hsl(${Math.random() * 60 + 320}, 100%, 75%)`;
      sparkle.style.filter = 'blur(1px)';
      sparkle.style.boxShadow = '0 0 10px rgba(255,192,203,0.8)';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '1000';
      document.body.appendChild(sparkle);

      const angle = (i / 40) * Math.PI * 2 + Math.random() * 0.5;
      const distance = 100 + Math.random() * 150;

      gsap.fromTo(sparkle,
        {
          x: centerX,
          y: centerY,
          scale: 0
        },
        {
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          scale: 1.5 + Math.random(),
          opacity: 0,
          duration: 1 + Math.random() * 0.5,
          ease: "power2.out",
          onComplete: () => sparkle.remove()
        }
      );
    }
  }

  private createFloatingEmojis(): void {
    const emojis = ['💖', '💝', '💕', '💗', '💓', '✨', '🌸', '⭐'];
    const rect = this.letterContent.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 15; i++) {
      const emoji = document.createElement('div');
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.position = 'fixed';
      emoji.style.fontSize = '24px';
      emoji.style.pointerEvents = 'none';
      emoji.style.zIndex = '1000';
      document.body.appendChild(emoji);

      const angle = (i / 15) * Math.PI * 2 + Math.random() * 0.5;
      const distance = 80 + Math.random() * 100;

      gsap.fromTo(emoji,
        {
          x: centerX,
          y: centerY,
          scale: 0,
          opacity: 0,
          rotation: Math.random() * 360
        },
        {
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          scale: 1,
          opacity: 1,
          rotation: Math.random() * 360,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(emoji, {
              y: '+=100',
              opacity: 0,
              duration: 0.8,
              ease: "power2.in",
              onComplete: () => emoji.remove()
            });
          }
        }
      );
    }
  }

  private createHeartTrail(): void {
    const rect = this.letterContent.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.position = 'fixed';
        heart.style.fontSize = '30px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        document.body.appendChild(heart);

        gsap.set(heart, {
          x: centerX,
          y: centerY,
          scale: 0
        });

        gsap.to(heart, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        });

        gsap.to(heart, {
          y: centerY - 150,
          duration: 1.5,
          ease: "power1.inOut"
        });

        gsap.to(heart, {
          opacity: 0,
          delay: 1,
          duration: 0.5,
          onComplete: () => heart.remove()
        });
      }, i * 100);
    }
  }
}