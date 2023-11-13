package com.manish.ipldashboard.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.manish.ipldashboard.model.Match;

public interface MatchRepository extends CrudRepository<Match, Long> {

    List<Match> getByTeam1OrTeam2OrderByMatchDateDesc(String teamName1, String teamName2, Pageable pageable);
    @Query("select m from Match m where (m.team1 = :teamName or m.team2 = :teamName) and m.matchDate between :startDate and :endDate order by m.matchDate desc")
    List<Match> getMatchesByTeamBetweenDates(@Param("teamName") String team, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    List<Match> getByTeam1AndMatchDateBetweenOrTeam2AndMatchDateBetweenOrderByMatchDateDesc(String team1, LocalDate startDate1,
            LocalDate endDate1, String team2, LocalDate startDate2, LocalDate endDate2);

    default List<Match> findLatestMatchesByTeam(String teamName, int page, int size) {
        return getByTeam1OrTeam2OrderByMatchDateDesc(teamName, teamName, PageRequest.of(page, size));
    }
}
