package de.vw.f73.qwirkle2.player;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import jakarta.transaction.Transactional;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
public class PlayerRepositoryTests {

    @Autowired
    private PlayerRepository playerRepo;
    private Player p1 = new Player("p1");
    List<Player> players = new ArrayList<>(List.of(this.p1));

    @Test
    void testFindAll_empty() {
        List<Player> res = this.playerRepo.findAll();
        List<Player> exp = List.of();
        assertEquals(0, res.size());
        assertEquals(exp, res);
    }

    @Test
    @DirtiesContext
    void testFindAll_1() {
        this.playerRepo.save(this.p1);
        List<Player> res = this.playerRepo.findAll();
        assertEquals(1, res.size());
    }

    @Test
    void testSave_nameNull() {
        System.err.println("testSave_nameNull");
        Player nullPlayer = new Player(null);
        assertThrows(RuntimeException.class, () -> this.playerRepo.save(nullPlayer));
    }

    @Test
    @Order(value = 2)
    @Transactional
    void testSave1() {
        System.err.println("testSave1");
        Player res = this.playerRepo.save(this.p1);
        assertEquals(1, this.playerRepo.count());
        assertEquals(this.p1, res);
    }

    @Test
    @Order(value = 1)
    @DirtiesContext
    void testSave2() {
        System.err.println("testSave2");
        Player p2 = new Player("p2");
        Player res = this.playerRepo.save(p2);
        assertEquals(1, this.playerRepo.count());
        assertEquals(p2, res);
    }

    @Test
    @Transactional
    void testSaveAll() {
        System.err.println("testSaveAll");
        this.players.add(this.p1);
        List<Player> res = this.playerRepo.saveAll(this.players);
        Player resPlayer = this.playerRepo.findAll().get(0);
        assertEquals(1, this.playerRepo.count());
        // p1 wird nur einmal gespeichert, aber bleibt td 2 mal in res
        assertEquals(this.players, res);
        assertEquals(this.p1.getId(), resPlayer.getId());
        assertEquals(this.p1.getName(), resPlayer.getName());
    }

    @AfterEach
    void end() {
        System.err.println("players: " + this.players);
        System.err.println("repo.count(): " + this.playerRepo.count());
    }

    // saveAll

}
