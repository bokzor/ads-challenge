import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { subscribeToResult } from 'rxjs/internal-compatibility';
import { CSVRecord } from '../models/CSVRecord';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {
  }

  getData() {
    this.httpClient.get('/assets/temperatures.csv')
      .subscribe(result => {
        let csvRecordsArray = (<string>result).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        const records: CSVRecord[] = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      });
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.id = curruntRecord[0].trim();
        csvRecord.firstName = curruntRecord[1].trim();
        csvRecord.lastName = curruntRecord[2].trim();
        csvRecord.age = curruntRecord[3].trim();
        csvRecord.position = curruntRecord[4].trim();
        csvRecord.mobile = curruntRecord[5].trim();
        csvArr.push(csvRecord);
      }
    }
  }
}

