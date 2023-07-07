package com.example.championship.summercamp.controller;

import com.example.championship.summercamp.model.Team;
import com.example.championship.summercamp.service.TeamServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/team")
public class TeamController {
    @Autowired
    private TeamServices teamServices;

    @GetMapping(value = "/one/{id}")
    public Team getTeam(@PathVariable Integer id){
        return teamServices.getOne(id);
        //if it doesn't find the team it will give a server error
    }

    @GetMapping(value = "/all")
    public List<Team> getAllTeams(){
        return teamServices.getAll();
    }

    @PostMapping("/createTeam")
    public Team postTeam(@RequestBody Team newTeam){
        return teamServices.createTeam(newTeam);
    }

   @PutMapping("/updateTeam/{id}")
   public Team updateTeam(@RequestBody Team newTeam, @PathVariable Integer id){
        Team dbTeam = teamServices.getOne(id);
        dbTeam.setName(newTeam.getName());
        return teamServices.updateTeam(dbTeam);
   }

   @DeleteMapping("/delete/{id}")
    public void deleteTeam(@PathVariable Integer id){
        teamServices.deleteTeam(id);
   }

   //I don't have batch methods
}
