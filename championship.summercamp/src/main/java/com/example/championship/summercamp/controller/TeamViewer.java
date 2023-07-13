package com.example.championship.summercamp.controller;

import com.example.championship.summercamp.model.Team;
import com.example.championship.summercamp.service.TeamServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TeamViewer {
    @Autowired
    private TeamServices teamServices;

    @GetMapping({"/listAllTeams"})
    public ModelAndView listAllTeams() {
        ModelAndView mav = new ModelAndView("list-teams");
        mav.addObject("teams", teamServices.getAll());
        return mav;
    }

    @GetMapping("/getTeams")
    public String getTeamsAjax(){return "teamJS";}

    //TODO:Ask, should I somehow use here the functions from the rest controller?
    @GetMapping("/team") //I don't know what is the point for this
    public String teamForm(Model model) {
        model.addAttribute("team", new Team());
        return "team";
    }
    //The form saves failed teams, I think
    //Can't leave empty slots
    @PostMapping("/team")
    public Team teamSubmit(@ModelAttribute Team team, Model model) {
        model.addAttribute("team", team);
        return teamServices.createTeam(team);
    }
    //Dubious error for still existing teams
    //Error becuase some players are captains
    @GetMapping("/delete/{id}")
    public String deleteTeam(@PathVariable("id") Integer id, Model model) {
        Team team = teamServices.getOne(id);
                //.orElseThrow(() -> new IllegalArgumentException("Invalid team Id:" + id));
        teamServices.deleteTeam(id);
        return "list-teams"; //why u no go back?
    }
}
