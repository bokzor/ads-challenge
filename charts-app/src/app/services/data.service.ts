import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Papa} from 'ngx-papaparse';
import {map} from "rxjs/operators";
import {CSVRecord} from "../models/CSVRecord";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient, private papa: Papa) {
  }

  getData() {
    return this.httpClient.get('/assets/temperatures.csv', {responseType: 'text'})
      .pipe(
        map(csvData => {
          return this.papa.parse(csvData, {
            header: true,
          });
        }),
        map(t => t.data as CSVRecord[])
      );
  }

}

