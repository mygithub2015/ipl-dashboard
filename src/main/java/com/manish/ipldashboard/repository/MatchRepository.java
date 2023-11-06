package com.manish.ipldashboard.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.CrudRepository;

import com.manish.ipldashboard.model.Match;


public interface MatchRepository extends CrudRepository<Match, Long> {
    
    List<Match> getByTeam1OrTeam2OrderByMatchDateDesc(String teamName1, String teamName2, Pageable pageable);

    default List<Match> findLatestMatchesByTeam(String teamName, int page, int size) {
        return getByTeam1OrTeam2OrderByMatchDateDesc(teamName, teamName, PageRequest.of(page, size));
    }
}
