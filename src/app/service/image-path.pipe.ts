import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'imagePath'
})
export class ImagePathPipe implements PipeTransform {

    transform(value: string, args?: any): any {
        let reg = /^(http|HTTP)[A-Za-z]{0,1}\:\/\//;
        if (!value) {
            return 'http://via.placeholder.com/600x400';
        }
        if (reg.test(value)) {
            return value;
        }
        return 'http://127.0.0.1:3000/' + value;
    }

}
