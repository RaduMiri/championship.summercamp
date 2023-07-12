package com.example.championship.summercamp.controller;

import com.example.championship.summercamp.service.PlayerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PlayerViewer {
    @Autowired
    private PlayerServices playerServices;

    @GetMapping({"/listAllPlayers"})
    public ModelAndView listAllPlayers() {
        ModelAndView mav = new ModelAndView("list-players");
        mav.addObject("players", playerServices.getAll());
        return mav;
    }
}
