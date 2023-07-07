package com.example.championship.summercamp.controller;

import com.example.championship.summercamp.model.Team;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TeamController {
    @GetMapping(value = "/annotated/team/{id}")
    public Team getTestData(@PathVariable Integer id){
        Team team = new Team();
        team.setName("Jon");
        return team;
    }
}
