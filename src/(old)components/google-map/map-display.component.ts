import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  GoogleMap,
  GoogleMapsModule,
  MapDirectionsService,
} from '@angular/google-maps';
import { map } from 'rxjs';
import { DetailComponent } from '../event-detail/detail/detail.component';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  template: `
    <!-- <google-map #map [zoom]="zoom" width="100%" height="100%">
      <map-directions-renderer
        *ngIf="directionsResult"
        [directions]="directionsResult"
      >
      </map-directions-renderer>
      <map-marker
        *ngIf="markerPosition"
        [position]="markerPosition"
      ></map-marker>
    </google-map> -->
  `,
  styles: [``],
})
export class MapDisplayComponent implements OnInit {
  @ViewChild('map', { static: true })
  map!: GoogleMap;

  @Input() from: any
  @Input() to: any

  zoom = 5;
  // directionsResult: google.maps.DirectionsResult | undefined;
  markerPosition: google.maps.LatLng | undefined;
  distanceValue: string | undefined; // Add this line

  constructor(
    private directionService: MapDirectionsService,
    private detailComponent: DetailComponent
  ) { }

  // goToLocation(location: google.maps.LatLng) {
  //   this.markerPosition = location;
  //   this.map.panTo(location);
  //   this.zoom = 17;
  //   this.directionsResult = undefined;
  // }

  // getDirection(from: google.maps.LatLng, to: google.maps.LatLng) {
  //   const request: google.maps.DirectionsRequest = {
  //     origin: from,
  //     destination: to,
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   };
  //   this.directionService
  //     .route(request)
  //     .pipe(map((res) => res.result))
  //     .subscribe((result) => {
  //       this.directionsResult = result;
  //       this.markerPosition = undefined;
  //     });
  //   // console.log('fromDirectionRequest', request);
  //   console.log('ตำแหน่งเริ่มต้น:', 'Lat: ', from.lat(), 'Lng: ', from.lng());
  //   console.log('จุดปลายทาง:', 'Lat: ', to.lat(), 'Lng: ', to.lng());
  // }

  getDistance(from: google.maps.LatLng, to: google.maps.LatLng) {
    const distanceMatrixService = new google.maps.DistanceMatrixService();

    const origins = [from];
    const destinations = [to];

    const distanceMatrixRequest: google.maps.DistanceMatrixRequest = {
      origins: origins.map((origin) => ({
        lat: origin.lat(),
        lng: origin.lng(),
      })),
      destinations: destinations.map((destination) => ({
        lat: destination.lat(),
        lng: destination.lng(),
      })),
      travelMode: google.maps.TravelMode.DRIVING,
    };
    distanceMatrixService.getDistanceMatrix(
      distanceMatrixRequest,
      (response, status) => {
        console.log('distance ทำงาน');

        if (status === 'OK') {
          const distance = response?.rows[0].elements[0].distance.text;
          this.distanceValue = distance; // Set the distanceValue variable

          // console.log('Distance:', distance);
          this.detailComponent.distanceFromMap(distance)
        } else {
          console.error('Error calculating distance:', status);
        }
      }
    );
  }

  ngOnChanges() {
    const fromLocation = this.from?.location;
    const toLocation = this.to?.location;

    if (fromLocation && toLocation) {
      // this.getDirection(fromLocation, toLocation);
      this.getDistance(fromLocation, toLocation); // Calculate distance
    }
    // else if (fromLocation) {
    //   this.goToLocation(fromLocation);
    // } else if (toLocation) {
    //   this.goToLocation(toLocation);
    // }
  }

  ngOnInit(): void { }
}
