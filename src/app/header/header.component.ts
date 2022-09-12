import { Component, OnInit } from '@angular/core';
import { MainService } from '../core/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  count: number;
  constructor(private service: MainService) { }

  ngOnInit(): void {
      this.service.cartNumber$.subscribe({ next: (value) => this.count = value });
  }

}
