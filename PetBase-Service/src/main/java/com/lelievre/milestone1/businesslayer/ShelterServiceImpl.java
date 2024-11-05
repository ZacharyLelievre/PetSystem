package com.lelievre.milestone1.businesslayer;

import com.lelievre.milestone1.dataaccesslayer.Shelter;
import com.lelievre.milestone1.dataaccesslayer.ShelterRepository;
import com.lelievre.milestone1.presentationlayer.pets.shelters.ShelterRequestDTO;
import com.lelievre.milestone1.presentationlayer.pets.shelters.ShelterResponseDTO;
import com.lelievre.milestone1.utils.exceptions.InUseException;
import com.lelievre.milestone1.utils.exceptions.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Service
public class ShelterServiceImpl implements ShelterService {
    private static final Logger logger = LoggerFactory.getLogger(ShelterServiceImpl.class);

    private ShelterRepository shelterRepository;

    public ShelterServiceImpl(ShelterRepository shelterRepository) {
        this.shelterRepository = shelterRepository;
    }

    @Override
    public List<ShelterResponseDTO> getAllShelters() {
        logger.info("Fetching all shelters");
        List<Shelter> shelterEntities = shelterRepository.findAll();
        List<ShelterResponseDTO> shelterResponseDTOList = new ArrayList<>();

        for (Shelter shelter : shelterEntities) {
            ShelterResponseDTO shelterResponseDTO = new ShelterResponseDTO();
            BeanUtils.copyProperties(shelter, shelterResponseDTO);
            shelterResponseDTOList.add(shelterResponseDTO);
        }
        logger.info("Fetched {} shelters", shelterResponseDTOList.size());
        return shelterResponseDTOList;
    }

    @Override
    public ShelterResponseDTO getShelter(String shelterId) {

        Shelter savedShelter = shelterRepository.findShelterByShelterId(shelterId);

        if (savedShelter == null)
            throw new NotFoundException("Unkown shelterId:" + shelterId);

        ShelterResponseDTO shelterResponseDTO = new ShelterResponseDTO();
        BeanUtils.copyProperties(savedShelter, shelterResponseDTO);

        return shelterResponseDTO;
    }

    @Override
    public ShelterResponseDTO addShelter(ShelterRequestDTO shelterRequestDTO) {
        Shelter shelter = new Shelter();
        BeanUtils.copyProperties(shelterRequestDTO, shelter);
        shelter.setShelterId(UUID.randomUUID().toString());

        Shelter savedShelter = shelterRepository.save(shelter);

        ShelterResponseDTO shelterResponseDTO = new ShelterResponseDTO();
        BeanUtils.copyProperties(savedShelter, shelterResponseDTO);

        return shelterResponseDTO;
    }

    @Override
    public ShelterResponseDTO updateShelterDTO(ShelterRequestDTO shelterRequestDTO, String shelterId) {

        Shelter foundShelter = shelterRepository.findShelterByShelterId(shelterId);

        if (foundShelter == null)
            throw new NotFoundException("Unkown shelterId:" + shelterId);

        Shelter shelter = new Shelter();
        BeanUtils.copyProperties(shelterRequestDTO, shelter);
        shelter.setShelterId(foundShelter.getShelterId());
        shelter.setId(foundShelter.getId());

        Shelter savedShelter = shelterRepository.save(shelter);

        ShelterResponseDTO shelterResponseDTO = new ShelterResponseDTO();
        BeanUtils.copyProperties(savedShelter, shelterResponseDTO);

        return shelterResponseDTO;
    }

    @Override
    public void deleteShelter(String shelterId) {
        Shelter foundShelter = shelterRepository.findShelterByShelterId(shelterId);

        if (foundShelter == null) {
            throw new NotFoundException("Unkown shelter id:" + shelterId);

        }
        try {
            shelterRepository.delete(foundShelter);
        } catch (DataIntegrityViolationException ex) {
            throw new InUseException("Cannot delete shelter with shelterId" + shelterId + "as it is currently assigned to one or more pets");

        }
    }
}
