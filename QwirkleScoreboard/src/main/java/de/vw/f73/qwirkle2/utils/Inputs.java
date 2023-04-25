package de.vw.f73.qwirkle2.utils;

import java.util.Scanner;

public class Inputs {

    private static final Scanner SCANNER = new Scanner(System.in);

    public static String readString(String prompt, String regex) {
        String input;
        do {
            System.out.print(prompt);
            input = SCANNER.nextLine().trim();
        } while (!input.matches(regex));
        return input;
    }

    public static String readString(String prompt) {
        System.out.print(prompt);
        return SCANNER.nextLine().trim();
    }

}
