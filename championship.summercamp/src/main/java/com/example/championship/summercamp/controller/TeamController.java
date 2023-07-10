package com.example.championship.summercamp.controller;

import com.example.championship.summercamp.model.Team;
import com.example.championship.summercamp.service.TeamServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
        return teamServices.updateTeam(newTeam,id);
   }

   @DeleteMapping("/delete/{id}") //TODO:doesn't seem to work
    public void deleteTeam(@PathVariable Integer id){
        teamServices.deleteTeam(id);
   }

   @DeleteMapping("/deleteAll")
    public void deleteAllTeams(){teamServices.deleteAllTeams();}

    //TODO: The rest of getmappings for
    @GetMapping("/filterByName/{name}")
    public List<Team> filterByName(@PathVariable String name)
    {
        return teamServices.filterByName(name);
    }
   //I don't have batch methods
}
