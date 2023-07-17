package com.example.championship.summercamp.service;

import com.example.championship.summercamp.model.Player;
import com.example.championship.summercamp.model.Team;
import com.example.championship.summercamp.repository.PlayerRepository;
import com.example.championship.summercamp.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamServices {
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private PlayerRepository playerRepository;
    //Create
    public Team createTeam(Team newTeam){
        //TODO:if(newTeam.captain.team!=newTeam.id do not allow
        return teamRepository.save(newTeam);
    }
    //Update
    public Team updateTeam(Team newTeam, Integer id){
        Team dbTeam = teamRepository.getOne(id);
        if(newTeam.getName()!=null)
            dbTeam.setName(newTeam.getName());
        if(newTeam.getCaptain()!=null){
            dbTeam.setCaptain(newTeam.getCaptain());
        }
        if(newTeam.getColour()!=null)
            dbTeam.setColour(newTeam.getColour());
        return teamRepository.save(newTeam);
    }
    //Deletes
    public void deleteTeam(Integer id) {
        List<Player> players = teamRepository.getOne(id).getPlayers();
        for(int i=0;i<players.size();i++){
            if(players.get(i).getTeam().getId()==id){
                players.get(i).setTeam(null);
            }
        }
        teamRepository.deleteById(id);
    }
    public void deleteAllTeams(){teamRepository.deleteAll();}
    //Filters
    public Team getOne(Integer id){
        return teamRepository.findById(id).get();
    }
    public List<Team> findByName(String name) {return teamRepository.findByName(name);}
    public List<Team> findByColour(String colour){return teamRepository.findByColour(colour);}
    //Sorts
    public List<Team> getAll(){
        return teamRepository.findAll();
    }
    public List<Team> findByOrderByNameAsc(){return teamRepository.findByOrderByNameAsc();}
    public List<Team> findByOrderByColourAsc(){return teamRepository.findByOrderByColourAsc();}
    public List<Team> findByOrderByIdDesc(){return teamRepository.findByOrderByIdDesc();}
    public List<Team> findByOrderByNameDesc(){return teamRepository.findByOrderByNameDesc();}
    public List<Team> findByOrderByColourDesc(){return teamRepository.findByOrderByColourDesc();}
    public List<Team> findByOrderByCaptainFirstNameAscCaptainLastNameAsc(){return teamRepository.findByOrderByCaptainFirstNameAscCaptainLastNameAsc();}
    public List<Team> findByOrderByCaptainFirstNameDescCaptainLastNameDesc(){return teamRepository.findByOrderByCaptainFirstNameDescCaptainLastNameDesc();}
}
