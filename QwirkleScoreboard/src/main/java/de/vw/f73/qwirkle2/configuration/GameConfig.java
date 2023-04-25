package de.vw.f73.qwirkle2.configuration;

import de.vw.f73.qwirkle2.game.GameService;

//@Configuration
public class GameConfig {

    // anderer Weg für Autostart
    // deaktiviert durch //@Configuration

    public GameConfig(GameService gameService) {
        gameService.start();
    }

}
