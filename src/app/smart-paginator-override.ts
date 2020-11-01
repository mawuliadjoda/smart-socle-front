import { MatPaginatorIntl } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 van ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  // return `${startIndex + 1} - ${endIndex} van ${length}`;

  return `${startIndex + 1} - ${endIndex} sur ${length}`;
};


export function getDutchPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = environment.PAGINATOR_MESSAGE_ELMENT_PAR_PAGE;
  paginatorIntl.nextPageLabel = environment.PAGINATOR_SUIVANT;
  paginatorIntl.previousPageLabel = environment.PAGINATOR_PRECEDENT;
  paginatorIntl.lastPageLabel = environment.PAGINATOR_LABEL_FIN;
  paginatorIntl.firstPageLabel = environment.PAGINATOR_LABEL_DEBUT;
  // paginatorIntl.getRangeLabel = 'sur';
  paginatorIntl.getRangeLabel = dutchRangeLabel;

  return paginatorIntl;
}
