import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {
    transform(currentArray: Array<Record<string, string | any>> | any, dateKey: string = 'last_updated', reverse: boolean = false): Array<any> | undefined {

        if (!Array.isArray(currentArray)) {
            return undefined;
        }

        return currentArray.sort((a, b) => {
            if (reverse) {
                return new Date(a[dateKey]).getTime() - new Date(b[dateKey]).getTime();
            } else {
                return new Date(b[dateKey]).getTime() - new Date(a[dateKey]).getTime();
            }
        });
    }
}
