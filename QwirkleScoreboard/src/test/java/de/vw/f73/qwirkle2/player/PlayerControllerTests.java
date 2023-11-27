package de.vw.f73.qwirkle2.player;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class PlayerControllerTests {

    private PlayerRepository playerRepo;
    private PlayerController playerController;
    private Player p1 = new Player("p1");
    List<Player> players = List.of(this.p1);

    @BeforeEach
    void setup() {
        this.playerRepo = Mockito.mock(PlayerRepository.class);
        this.playerController = new PlayerController(this.playerRepo);
        System.out.println("setup");
    }

    @Test
    void testGetAllPlayers_callsRepo() {
        // WHEN
        this.playerController.getAllPlayers();

        // THEN
        Mockito.verify(this.playerRepo).findAll();
    }

    @Test
    void testGetAllPlayers_errorPass() {
        // GIVEN
        Mockito.doThrow(RuntimeException.class).when(this.playerRepo).findAll();

        // THEN
        assertThrows(RuntimeException.class, () -> this.playerController.getAllPlayers());
    }

    @Test
    void testPostPlayer_callsRepo() {
        // WHEN
        this.playerController.postPlayer(this.p1);

        // THEN
        Mockito.verify(this.playerRepo).save(this.p1);
    }

    @Test
    void testPostPlayer_errorPass() {
        // GIVEN
        Mockito.doThrow(RuntimeException.class).when(this.playerRepo).save(Mockito.any());

        // THEN
        assertThrows(RuntimeException.class, () -> this.playerController.postPlayer(this.p1));
    }

    @Test
    void testPostPlayers_callsRepo() {
        // WHEN
        this.playerController.postPlayers(this.players);

        // THEN
        Mockito.verify(this.playerRepo).saveAll(this.players);
    }

    @Test
    void testPostPlayers_errorPass() {
        // GIVEN
        Mockito.doThrow(RuntimeException.class).when(this.playerRepo).saveAll(Mockito.anyIterable());

        // THEN
        assertThrows(RuntimeException.class, () -> this.playerController.postPlayers(this.players));
    }

}
