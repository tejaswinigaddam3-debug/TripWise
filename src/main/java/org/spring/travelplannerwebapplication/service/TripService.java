package org.spring.travelplannerwebapplication.service;

import org.spring.travelplannerwebapplication.dto.TripDTO;
import org.spring.travelplannerwebapplication.exception.ResourceNotFoundException;
import org.spring.travelplannerwebapplication.model.Trip;
import org.spring.travelplannerwebapplication.model.User;
import org.spring.travelplannerwebapplication.repository.TripRepository;
import org.spring.travelplannerwebapplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private UserRepository userRepository;

    public TripDTO saveTrip(Trip trip) {
        if (trip.getUser() == null || trip.getUser().getId() == null) {
            throw new IllegalArgumentException("User must be associated with the trip");
        }

        User user = userRepository.findById(trip.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + trip.getUser().getId()));

        trip.setUser(user);
        Trip savedTrip = tripRepository.save(trip);
        return convertToDTO(savedTrip);
    }

    public List<TripDTO> getAllTrips() {
        return tripRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<TripDTO> getUserTrips(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return tripRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TripDTO getTripById(Long id) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + id));
        return convertToDTO(trip);
    }

    public TripDTO updateTrip(Long id, Trip tripDetails) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + id));

        trip.setDestination(tripDetails.getDestination());
        trip.setStartDate(tripDetails.getStartDate());
        trip.setEndDate(tripDetails.getEndDate());
        trip.setBudget(tripDetails.getBudget());

        Trip updatedTrip = tripRepository.save(trip);
        return convertToDTO(updatedTrip);
    }

    public void deleteTrip(Long id) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + id));
        tripRepository.delete(trip);
    }

    private TripDTO convertToDTO(Trip trip) {
        return new TripDTO(
                trip.getId(),
                trip.getDestination(),
                trip.getStartDate(),
                trip.getEndDate(),
                trip.getBudget(),
                trip.getUser().getId(),
                trip.getCreatedAt(),
                trip.getUpdatedAt()
        );
    }
}