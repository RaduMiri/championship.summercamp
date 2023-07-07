package com.example.championship.summercamp.service;

import com.example.championship.summercamp.model.Team;
import com.example.championship.summercamp.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamServices {
    @Autowired
    private TeamRepository teamRepository;

    public Team createTeam(Team newTeam){
        return teamRepository.save(newTeam);
    }


}
