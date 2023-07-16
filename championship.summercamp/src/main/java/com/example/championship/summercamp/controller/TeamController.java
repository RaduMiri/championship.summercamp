package com.example.championship.summercamp.controller;

import com.example.championship.summercamp.model.Team;
import com.example.championship.summercamp.service.TeamServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/team")
@CrossOrigin(origins = "http://localhost:8080")
public class TeamController {
    @Autowired
    private TeamServices teamServices;

    //CRUD
    //Create
    @PostMapping("/createTeam")
    public Team postTeam(@RequestBody Team newTeam){
        return teamServices.createTeam(newTeam);
    }

    //Update
    @PutMapping("/updateTeam/{id}")
    public Team updateTeam(@RequestBody Team newTeam, @PathVariable Integer id){return teamServices.updateTeam(newTeam,id);}

    //Deletes
    @DeleteMapping("/delete/{id}")
    public void deleteTeam(@PathVariable Integer id){
        teamServices.deleteTeam(id);
   }
    @DeleteMapping("/deleteAll")
    public void deleteAllTeams(){teamServices.deleteAllTeams();}

    //Filters
    @GetMapping({"/findById/{id}","/one/{id}"})
    public Team getTeam(@PathVariable Integer id){return teamServices.getOne(id);}
    @GetMapping("/findByName/{name}")
    public List<Team> findByName(@PathVariable String name) {return teamServices.findByName(name);}
    @GetMapping("/findByColour/{colour}")
    public List<Team> findByColour(@PathVariable String colour) {return teamServices.findByColour(colour);}
    //GetMapping("/findByCaptainID/{captainId}")

    //Sorts
    //TODO:This is sorted by id I think
    @GetMapping({"/findByOrderByIdAsc", "/all"})
    public List<Team> getAllTeams(){
        return teamServices.getAll();
    }
    @GetMapping("/findByOrderByNameAsc")
    public List<Team> findByOrderByNameAsc(){return teamServices.findByOrderByNameAsc();}
    @GetMapping("/findByOrderByColourAsc")
    public List<Team> findByOrderByColourAsc(){return teamServices.findByOrderByColourAsc();}
    @GetMapping("/findByOrderByIdDesc")
    public List<Team> findByOrderByIdDesc(){return teamServices.findByOrderByIdDesc();}
    @GetMapping("/findByOrderByNameDesc")
    public List<Team> findByOrderByNameDesc(){return teamServices.findByOrderByNameDesc();}
    @GetMapping("/findByOrderByColourDesc")
    public List<Team> findByOrderByColourDesc(){return teamServices.findByOrderByColourDesc();}
    @GetMapping("/findByOrderByCaptainFirstNameAscCaptainLastNameAsc")
    public List<Team> findByOrderByCaptainFirstNameAscCaptainLastNameAsc(){return teamServices.findByOrderByCaptainFirstNameAscCaptainLastNameAsc();}
    @GetMapping("/findByOrderByCaptainFirstNameDescCaptainLastNameDesc")
    public List<Team> findByOrderByCaptainFirstNameDescCaptainLastNameDesc(){return teamServices.findByOrderByCaptainFirstNameDescCaptainLastNameDesc();}

   //I don't have many batch methods
}
