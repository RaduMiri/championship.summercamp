package com.example.championship.summercamp.controller;

import com.example.championship.summercamp.model.Player;
import com.example.championship.summercamp.service.PlayerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/player")
public class PlayerController {
    @Autowired
    private PlayerServices playerServices;

    //CRUD
    @PostMapping("/create")
    public Player postPlayer(@RequestBody Player newPlayer){return playerServices.createPlayer(newPlayer);}

    @PutMapping("/update/{id}")
    public Player updatePlayer(@RequestBody Player newPlayer, @PathVariable Integer id){return playerServices.updatePlayer(newPlayer, id);}

    @DeleteMapping("/delete/{id}")
    public void deletePlayer(@PathVariable Integer id){
        playerServices.deletePlayer(id);
    }
    @DeleteMapping("/deleteAll")
    public void deleteAllPlayers(){playerServices.deleteAllPlayers();}

    //Filters
    @GetMapping({"/findById/{id}","/one/{id}"})
    public Player getPlayer(@PathVariable Integer id){
        return playerServices.getOne(id);
    }
    @GetMapping("/findByFirstName/{firstName}")
    public List<Player> findByFirstName(@PathVariable String firstName) {return playerServices.findByFirstName(firstName);}
    @GetMapping("/findByLastName/{lastName}")
    public List<Player> findByLastName(@PathVariable String lastName) {return playerServices.findByLastName(lastName);}
    @GetMapping("/findByAge/{age}")
    public List<Player> findByAge(@PathVariable Integer age) {return playerServices.findByAge(age);}
    @GetMapping("/findByNumber/{number}")
    public List<Player> findByNumber(@PathVariable Integer number) {return playerServices.findByNumber(number);}
    @GetMapping("/findByTeamCaptainId/{teamCaptainId}")
    public List<Player> findByTeamCaptainId(@PathVariable Integer teamCaptainId){return playerServices.findByTeamCaptainId(teamCaptainId);}
    @GetMapping("/findByTeamId/{teamId}")
    public List<Player> findByTeamId(Integer teamId){return playerServices.findByTeamId(teamId);}
    @GetMapping("/findByFirstNameLastNameAgeNumberTeamNameTeamColour/{string}")
    public List<Player> findByFirstNameLastNameAgeNumberTeamNameTeamColour(@PathVariable String string){return playerServices.findByFirstNameLastNameAgeNumberTeamNameTeamColour(string);}
    @GetMapping("/findByTeamCaptainIsNull")
    public List<Player> findByTeamCaptainIsNull(){return playerServices.findByTeamCaptainIsNull();}
    @GetMapping("/findByTeamCaptainIsNotNull")
    public List<Player> findByTeamCaptainIsNotNull(){return playerServices.findByTeamCaptainIsNotNull();}
    @GetMapping("/isPlayerCaptain/{id}")
    public Boolean isPlayerCaptain(@PathVariable Integer id) {return playerServices.isPlayerCaptain(id);}

    //Sorts
    @GetMapping({"/findByOrderByIdAsc", "/all"})
    public List<Player> getAllPlayers(){return playerServices.getAll();}
    @GetMapping("/findByOrderByFirstNameAsc")
    public List<Player> findByOrderByFirstNameAsc(){return playerServices.findByOrderByFirstNameAsc();}
    @GetMapping("/findByOrderByLastNameAsc")
    public List<Player> findByOrderByLastNameAsc(){return playerServices.findByOrderByLastNameAsc();}
    @GetMapping("/findByOrderByAgeAsc")
    public List<Player> findByOrderByAgeAsc(){return playerServices.findByOrderByAgeAsc();}
    @GetMapping("/findByOrderByNumberAsc")
    public List<Player> findByOrderByNumberAsc(){return playerServices.findByOrderByNumberAsc();}
    @GetMapping("/findByOrderByTeamColourAscTeamNameAsc")
    public List<Player> findByOrderByTeamColourAscTeamNameAsc(){return playerServices.findByOrderByTeamColourAscTeamNameAsc();}

    @GetMapping("/findByOrderByIdDesc")
    public List<Player> findByOrderByIdDesc(){return playerServices.findByOrderByIdDesc();}
    @GetMapping("/findByOrderByFirstNameDesc")
    public List<Player> findByOrderByFirstNameDesc(){return playerServices.findByOrderByFirstNameDesc();}
    @GetMapping("/findByOrderByLastNameDesc")
    public List<Player> findByOrderByLastNameDesc(){return playerServices.findByOrderByLastNameDesc();}
    @GetMapping("/findByOrderByAgeDesc")
    public List<Player> findByOrderByAgeDesc(){return playerServices.findByOrderByAgeDesc();}
    @GetMapping("/findByOrderByNumberDesc")
    public List<Player> findByOrderByNumberDesc(){return playerServices.findByOrderByNumberDesc();}
    @GetMapping("/findByOrderByTeamColourDescTeamNameDesc")
    public List<Player> findByOrderByTeamColourDescTeamNameDesc(){return playerServices.findByOrderByTeamColourDescTeamNameDesc();}
}
