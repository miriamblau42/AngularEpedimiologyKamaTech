import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PLocation } from "../../models/location";
@Injectable({
    providedIn: 'root'
})
export class MainService{
    getAll(patientId: string):Observable<PLocation[]>{
          return this._http.get<PLocation[]>(`https://localhost:44371/api/Patient/GetLocations/${patientId}`)
        }
    
    Post( loc:PLocation):Observable<Object>
    {
        return this._http.post<Object>(`https://localhost:44371/api/Location`,loc)   
    }  
    delete(locationId: number): Observable<Object>{
        return this._http.delete(`https://localhost:44371/api/Location/${locationId}`)
    }
    constructor(private _http : HttpClient){}
}