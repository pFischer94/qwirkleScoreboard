package de.vw.f73.qwirkle2.player;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping
    public List<Player> getAllPlayers() {
        return this.playerRepo.findAll();
    }

    @PostMapping
    public Player postPlayer(@RequestBody Player player) {
        System.out.println("postPlayer output:");
        Player output = this.playerRepo.save(player);
        System.out.println(output);
        return output;
    }

    @PostMapping("/end")
    public List<Player> postPlayers(@RequestBody List<Player> players) {
        System.out.println("postPlayers output:");
        List<Player> output = this.playerRepo.saveAll(players);
        System.out.println(output);
        return output;
    }

//    @PostMapping
//    public List<Player> postPlayers(List<Player> players) {
//        return this.playerRepo.saveAll(players);
//    }

    @PostMapping("/addPoints")
    public Player addPoints(Player player, int points) {
        return null;
    }

}
