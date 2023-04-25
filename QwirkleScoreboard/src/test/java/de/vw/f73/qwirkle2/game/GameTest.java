package de.vw.f73.qwirkle2.game;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import de.vw.f73.qwirkle2.player.Player;
import de.vw.f73.qwirkle2.player.PlayerRepository;

@SpringBootTest
public class GameTest {

    @Autowired
    PlayerRepository repo;

    private List<Player> players;

    @Test
    void testGame() {
        setup();
        routine();
        end();
        System.err.println("testGame completed");
    }

    void setup() {
        this.players = this.repo.findAll();
        System.err.println(this.players);
        System.err.println("setup completed");
    }

    void routine() {

        System.err.println("routine completed");
    }

    void end() {

        System.err.println("end completed");
    }

}
