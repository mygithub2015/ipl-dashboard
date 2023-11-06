package com.manish.ipldashboard.data;

import java.time.LocalDate;

import org.springframework.batch.item.ItemProcessor;

import com.manish.ipldashboard.model.Match;


public class IPLMatchDataProcessor implements ItemProcessor<IPLMatchInput, Match> {
        
      @Override
      public Match process(IPLMatchInput input) throws Exception {
    
        Match match = new Match();
        match.setId(Long.valueOf(input.getId()));
        match.setCity(input.getCity());
        match.setMatchDate(LocalDate.parse(input.getMatchDate()));
        match.setVenue(input.getVenue());
        // set team1 & team2 depending on the innings order
        String firstInningsTeam;
        String secondInningsTeam;
        if("bat".equals(input.getTossDecision())) {
            firstInningsTeam = input.getTossWinner();
            secondInningsTeam = firstInningsTeam.equals(input.getTeam1()) ? input.getTeam2() : input.getTeam1();
        } else {
            secondInningsTeam = input.getTossWinner();
            firstInningsTeam = (secondInningsTeam.equals(input.getTeam1())) ? input.getTeam2() : input.getTeam1();
        }
        match.setTeam1(firstInningsTeam);
        match.setTeam2(secondInningsTeam);
        match.setTossWinner(input.getTossWinner());
        match.setTossDecision(input.getTossDecision());
        match.setMatchWinner(input.getWinner());
        match.setPlayerOfMatch(input.getPlayerOfMatch());
        match.setResult(input.getResult());
        match.setResultMargin(input.getResultMargin());
        match.setUmpire1(input.getUmpire1());
        match.setUmpire2(input.getUmpire2());
        return match;
      }
    
    }
