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

    @GetMapping("/teamForm") //name?
    public String teamForm(Model model) {
        model.addAttribute("team", new Team());
        return "team-form";
    }

    @PostMapping("/teamForm")
    public String teamSubmit(@ModelAttribute Team team, Model model) {
        model.addAttribute("team", team);
        return "team-form";
    }
}
