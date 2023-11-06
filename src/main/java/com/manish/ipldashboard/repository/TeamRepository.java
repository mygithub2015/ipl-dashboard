package com.manish.ipldashboard.repository;

import org.springframework.data.repository.CrudRepository;

import com.manish.ipldashboard.model.Team;

public interface TeamRepository extends CrudRepository<Team, Long> {
    
    Team findByTeamName(String teamName);
}
