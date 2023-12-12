import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByRamo',
})
export class FilterByRamoPipe implements PipeTransform {
  transform(asistencias: any[], filtroRamo: string): any[] {
    if (filtroRamo === 'Todos') {
      return asistencias;
    } else {
      return asistencias.filter((asist) => asist.ramo === filtroRamo);
    }
  }
}