import { Component, OnInit, ViewChild } from '@angular/core';
import { PLocation } from 'src/app/models/location';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import { catchError, map, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  locations: PLocation[] = [];
  addLocationForm: FormGroup;
  PatientId: string = "";
  locationsUrl: string = "";
  dataSource: MatTableDataSource<PLocation>;
  displayedColumns: string[] = ['fromDate', 'toDate', 'city', 'address','delete'];
  patientIdFormControl = new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();

  constructor(private _locationsService: MainService) { 
    this.dataSource = new MatTableDataSource();
    this.addLocationForm = new FormGroup({
      fromDate :new FormControl(),
      toDate :new FormControl(),
      city :new FormControl(),
      adress :new FormControl(),
    });
  }

  ngOnInit(){
    this.addLocationForm = new FormGroup({
      fromDate :new FormControl(),
      toDate :new FormControl(),
      city :new FormControl(),
      adress :new FormControl(),
    });
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.locations);
    this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.empTbSort;
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  displayeTable(): void {
    console.log(this.locations);
  }

   getAllLocations(): void{
     this._locationsService.getAll(this.PatientId).subscribe(locs => {
      this.locations = locs;
      this.dataSource.data=locs;
      this.dataSource.sort = this.empTbSort;
      this.dataSource.paginator=this.paginator;
      this.dataSource.paginator?.firstPage();
      // this.dataSource.paginator?.firstPage();
      this.displayeTable();
    }
      , err => console.log(err));
      // if (this.dataSource.paginator) {
      //   this.dataSource.paginator.firstPage();
      // }
  }
  changePatient(event: any): void {
    let currentId: string = event.target.value;
    if (currentId.length <= 9 && currentId.length >= 7) {
      this.PatientId = currentId;
    }
    else {
      return;
    }
    this.getAllLocations();
    this.displayeTable();
  }
  postLocation():Observable<Object>{
    var newLoc: PLocation ={
      fromDate: this.addLocationForm.value.fromDate,
      toDate: this.addLocationForm.value.toDate,
      city: this.addLocationForm.value.city,
      adress: this.addLocationForm.value.adress,
      patientId:this.PatientId,
    }
    return this._locationsService.Post(newLoc);
  }
  AddLocation(event:any):void{
  
    this.postLocation().subscribe(b=>
      this.getAllLocations(),err=> console.log(err));
      this.addLocationForm.reset();
  }
  //delete...
deleteLocation(id:number):void{
this._locationsService.delete(id).subscribe(res=>
  this.getAllLocations(),err=> console.log(err) 
);

}


}
