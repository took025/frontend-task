import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from '../core/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  subscription: Subscription = new Subscription()
  burugerMenu: boolean;
  count: number;
  constructor(private service: MainService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.service.cartNumber$.subscribe({ next: (value) => this.count = value }),
    );
  }

  burgerACtion() {
    this.burugerMenu = !this.burugerMenu;
    this.service.burugeMenu$.next(this.burugerMenu);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
