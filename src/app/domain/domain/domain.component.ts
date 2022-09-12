import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Categories, Domains } from 'src/app/core/interface';
import { MainService } from 'src/app/core/main.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {
  filterData: Domains[] = [];
  mainData: Domains[] = [];
  categories: Categories[] = [];
  domainZone = [".edu.ge", ".com.ge", ".ge", ".org.ge"];
  filterZone = [];
  catFilter = [];
  format = '2.0-2';

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
    this.service.getDomainList().subscribe((res: Domains[]) => {
      this.mainData = res;
      this.filterData = res;
    });
    this.service.getCategories().subscribe((res: Categories[]) => {
      this.categories = res;
    });
    this.getCartList();
  }
  getCartList() {
    this.service.getCartList().subscribe((res: Domains[]) => {
      this.service.cartNumber$.next(res.length);

    });
  }

  sliderEvent(min?: number, max?: number) {
    this.minValue = min!;
    this.maxValue = max!;
    this.mainData = this.filterData.filter((item: Domains) => item.domainName.length >= this.minValue && item.domainName.length <= this.maxValue);
  }

  priceSliderEvent(min?: number, max?: number) {
    this.priceMinValue = min!;
    this.priceMaxValue = max!;
    this.mainData = this.filterData.filter((item: Domains) => item.price >= this.priceMinValue && item.price <= this.priceMaxValue);
  }

  zoneFilter(item, e: any) {
    if (!e.target.checked) {
      const myIndex: number = this.filterZone.indexOf(item);
      if (myIndex !== -1) {
        this.filterZone.splice(myIndex, 1);
        this.mainData = this.filterData
      }
    } else {
      this.filterZone.push(item);
      this.mainData = this.filterData.filter(person => this.filterZone.includes(person.domainExtension))
    }
  }

  categoryFilter(item: Categories, e) {
    if (!e.target.checked) {
      const myIndex: number = this.catFilter.indexOf(item.id);
      if (myIndex !== -1) {
        this.catFilter.splice(myIndex, 1);
      }
      this.mainData = this.filterData;
    } else {
      this.catFilter.push(item.id);
      this.mainData = this.filterData.filter((domain) => {
        return domain.categories.some((tag) => {
          return this.catFilter.includes(tag);
        });
      });
    }
  }

  addToCart(item: Domains) {
    this.service.addToCart(item).subscribe((res: Domains[]) => {
      this.getCartList();
    });
  }



  // searchaction(e: any) {
  //   const data = e.target.value;
  //   this.mainData = this.filterData.filter((items: Domains) => items.domainName.includes(data));
  // }
  searchaction(event) {
    const data = event.target.value;
    this.service.searchByName(data).subscribe((res: Domains[]) => {
      this.mainData = res;
    })
  }
}
