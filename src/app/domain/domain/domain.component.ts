import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categories, Domains } from 'src/app/core/interface';
import { MainService } from 'src/app/core/main.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {
  subscription: Subscription = new Subscription();
  filterData: Domains[] = [];
  mainData: Domains[] = [];
  categories: Categories[] = [];
  cartData: Domains[] = [];
  domainZone = [".edu.ge", ".com.ge", ".ge", ".org.ge"];
  filterZone = [];
  catFilter = [];
  addAnim: number;
  burugerMenu: boolean;
  minValue: number = 0;
  maxValue: number = 26;
  priceMinValue: number = 0;
  priceMaxValue: number = 50000;
  options: Options = {
    floor: 0,
    ceil: 26
  };
  priceOptions: Options = {
    floor: 0,
    ceil: 50000
  };

  constructor(private service: MainService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.service.burugeMenu$.subscribe({
        next: (value) => this.burugerMenu = value
      }),
    );

    this.subscription.add(
      this.service.getDomainList().subscribe((res: Domains[]) => {
        this.mainData = res;
        this.filterData = res;
        this.getCartList();
      }),
    );

    this.subscription.add(
      this.service.getCategories().subscribe((res: Categories[]) => {
        this.categories = res;
      }),
    );
  }

  getCartList() {
    const data = this.mainData.filter(domain => domain.cart == true);
    this.service.cartNumber$.next(data.length);
  }

  sliderEvent(min: number, max: number) {
    this.minValue = min;
    this.maxValue = max;
    this.mainData = this.filterData.filter((item: Domains) => item.domainName.length >= this.minValue && item.domainName.length <= this.maxValue);
  }

  priceSliderEvent(min: number, max: number) {
    this.priceMinValue = min;
    this.priceMaxValue = max;
    this.mainData = this.filterData.filter((item: Domains) => item.price >= this.priceMinValue && item.price <= this.priceMaxValue);
  }

  zoneFilter(item, e: any) {
    if (!e.target.checked) {
      const itemIndex: number = this.filterZone.indexOf(item);
      if (itemIndex !== -1) {
        this.filterZone.splice(itemIndex, 1);
        this.mainData = this.filterData
      }
    } else {
      this.filterZone.push(item);
    }
    this.mainData = this.filterData.filter(domains => this.filterZone.includes(domains.domainExtension));
    if (!this.filterZone.length) {
      this.mainData = this.filterData;
    }
  }

  categoryFilter(item: Categories, e) {
    if (!e.target.checked) {
      const itemIndex: number = this.catFilter.indexOf(item.id);
      if (itemIndex !== -1) {
        this.catFilter.splice(itemIndex, 1);
      }
    } else {
      this.catFilter.push(item.id);
    }
    this.mainData = this.filterData.filter((domain) => {
      return domain.categories.some((tag) => {
        return this.catFilter.includes(tag);
      });
    });
    if (!this.catFilter.length) {
      this.mainData = this.filterData;
    }
  }

  burgerACtion() {
    this.burugerMenu = !this.burugerMenu;
    this.service.burugeMenu$.next(this.burugerMenu);
  }

  addToCart(item: Domains) {
    if (!item.cart) {
      this.addAnim = item.id;
    };

    item.cart = !item.cart;
    this.subscription.add(
      this.service.addToCart(item.id, item).subscribe((res: Domains) => {
        this.getCartList();
        setTimeout(() => {
          this.addAnim = null;
        }, 1000);
      }),
    );
  }

  searchaction(event) {
    const data = event.target.value;
    this.mainData = this.filterData.filter((items: Domains) => items.domainName.includes(data));
  }
  
  // search with service

  // searchaction(event) {
  //   const data = event.target.value;
  //   this.service.searchByName(data).subscribe((res: Domains[]) => {
  //     this.mainData = res;
  //   })
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
