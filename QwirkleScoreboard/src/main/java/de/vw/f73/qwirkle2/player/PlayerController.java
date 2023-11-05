package de.vw.f73.qwirkle2.player;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/player")
@CrossOrigin("http://localhost:5173")
public class PlayerController {

    private PlayerRepository playerRepo;

    public PlayerController(PlayerRepository playerRepo) {
        this.playerRepo = playerRepo;
    }

//    @GetMapping
//    public List<Player> getAllPlayers() {
//        return this.playerRepo.findAll();
//    }

    @PostMapping
    public List<Player> postPlayers(List<Player> players) {
        return this.playerRepo.saveAll(players);
    }

}
