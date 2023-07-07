package com.example.championship.summercamp.service;

import com.example.championship.summercamp.model.Team;
import com.example.championship.summercamp.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamServices {
    @Autowired
    private TeamRepository teamRepository;

    public Team getOne(Integer id){
        return teamRepository.findById(id).get();
    }
    public List<Team> getAll(){
        return teamRepository.findAll();
    }

    public Team createTeam(Team newTeam){
        return teamRepository.save(newTeam);
    }

    public Team updateTeam(Team newTeam){
        return teamRepository.save(newTeam);
    }

    public void deleteTeam(Integer id){
        teamRepository.deleteById(id);
    }
}
