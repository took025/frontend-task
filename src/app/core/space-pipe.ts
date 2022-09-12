import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'formatBankAcc'
})

export class FormatBankAccPipe implements PipeTransform {
    transform(value: number | string, locale?: string): string {
        return new Intl.NumberFormat(locale, {
            minimumFractionDigits: 2
        }).format(Number(value));
    }
}