package de.vw.f73.qwirkle2.player;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.annotation.DirtiesContext;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PlayerControllerIntTests {

    @Autowired
    private PlayerRepository playerRepo;
    @Autowired
    private TestRestTemplate restTemp;
    private Player p1;
    private List<Player> players;

    @BeforeEach
    void setup() {
        this.p1 = new Player("p1");
        this.players = new ArrayList<>(List.of(this.p1));
        this.players.add(new Player("p2"));
    }

    @Test
    @DirtiesContext
    void testGetAllPlayers() {
        this.restTemp.postForEntity("/player/end", this.players, List.class);
        List<Player> res = List.of(this.restTemp.getForObject("/player", Player[].class));
        String name = this.playerRepo.findAll().get(0).getName();

        assertEquals(2, this.playerRepo.count());
        assertEquals(2, res.size());
        assertEquals(this.p1.getName(), name);
        assertEquals(this.players.get(1).getTotalBiggestTurn(), res.get(1).getTotalBiggestTurn());
    }

    @Test
    @DirtiesContext
    void testSavePlayers() {
        this.restTemp.postForEntity("/player/end", this.players, List.class);
        String name = this.playerRepo.findAll().get(0).getName();

        assertEquals(2, this.playerRepo.count());
        assertEquals(this.p1.getName(), name);
    }

    @Test
    @DirtiesContext
    void testSavePlayer() {
        this.restTemp.postForEntity("/player", this.p1, Player.class);
        String name = this.playerRepo.findAll().get(0).getName();

        assertEquals(1, this.playerRepo.count());
        assertEquals(this.p1.getName(), name);
    }

}
