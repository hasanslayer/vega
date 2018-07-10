import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { Component, OnInit } from "@angular/core";




@Component({
    templateUrl: 'vehicle-list.html'
})

export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[];
    makes: KeyValuePair[];
    query: any = {};

    constructor(private vehicleService: VehicleService) { }

    ngOnInit() {
        this.vehicleService.getMakes()
            .subscribe(makes => this.makes = makes);


        // we remove this.allVehicles because the filtering will be on the server
        this.populateVehicles();
    }

    private populateVehicles() {
        this.vehicleService.getVehicles(this.query)
            .subscribe(vehicles => this.vehicles = vehicles);
    }

    onFilterChange() {
        //this.filter.modelId = 2; // this is for demonstrating
        this.populateVehicles();
    }

    resetFilter() {
        this.query = {};
        this.onFilterChange();
    }

    sortBy(columnName) {
        if (this.query.sortBy === columnName) {
            this.query.isSortAscending = false;
        } else {
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }
        this.populateVehicles();

    }
}