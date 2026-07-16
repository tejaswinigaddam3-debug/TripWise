package org.spring.travelplannerwebapplication.controller;

import jakarta.validation.Valid;
import org.spring.travelplannerwebapplication.dto.ApiResponse;
import org.spring.travelplannerwebapplication.dto.TripDTO;
import org.spring.travelplannerwebapplication.model.Trip;
import org.spring.travelplannerwebapplication.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
    private TripService tripService;

    @PostMapping
    public ResponseEntity<ApiResponse<TripDTO>> addTrip(@Valid @RequestBody Trip trip) {
        TripDTO tripDTO = tripService.saveTrip(trip);
        ApiResponse<TripDTO> response = ApiResponse.success("Trip created successfully", tripDTO, HttpStatus.CREATED.value());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TripDTO>>> getAllTrips() {
        List<TripDTO> trips = tripService.getAllTrips();
        ApiResponse<List<TripDTO>> response = ApiResponse.success("Trips retrieved successfully", trips, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<TripDTO>>> getUserTrips(@PathVariable Long userId) {
        List<TripDTO> trips = tripService.getUserTrips(userId);
        ApiResponse<List<TripDTO>> response = ApiResponse.success("User trips retrieved successfully", trips, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TripDTO>> getTripById(@PathVariable Long id) {
        TripDTO trip = tripService.getTripById(id);
        ApiResponse<TripDTO> response = ApiResponse.success("Trip retrieved successfully", trip, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TripDTO>> updateTrip(@PathVariable Long id, @Valid @RequestBody Trip trip) {
        TripDTO tripDTO = tripService.updateTrip(id, trip);
        ApiResponse<TripDTO> response = ApiResponse.success("Trip updated successfully", tripDTO, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteTrip(@PathVariable Long id) {
        tripService.deleteTrip(id);
        ApiResponse<String> response = ApiResponse.success("Trip deleted successfully", "Trip with id " + id + " has been deleted", HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}