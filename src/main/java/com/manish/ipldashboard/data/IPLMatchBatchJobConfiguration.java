package com.manish.ipldashboard.data;

import javax.sql.DataSource;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.transaction.PlatformTransactionManager;

import com.manish.ipldashboard.model.Match;


@Configuration
public class IPLMatchBatchJobConfiguration {

    private static final String[] FIELD_NAMES = new String[] {
            "id", "city", "matchDate", "playerOfMatch", "venue", "neutralVenue", "team1", "team2", "tossWinner",
            "tossDecision", "winner", "result", "resultMargin", "eliminator", "method", "umpire1", "umpire2"

    };

    @Bean
    public FlatFileItemReader<IPLMatchInput> reader() {
        return new FlatFileItemReaderBuilder<IPLMatchInput>()
                .name("matchInputReader")
                .resource(new ClassPathResource("ipl-dataset.csv"))
                .delimited()
                .names(FIELD_NAMES)
                .fieldSetMapper(new BeanWrapperFieldSetMapper<IPLMatchInput>() {
                    {
                        setTargetType(IPLMatchInput.class);
                    }
                }).build();
    }

    @Bean
    public IPLMatchDataProcessor processor() {
        System.out.println("*********Coming to DataProcessor***********************");
        return new IPLMatchDataProcessor();
        
    }

    @Bean
    public JdbcBatchItemWriter<Match> writer(DataSource dataSource) {
        System.out.println("********************************BATCH-WRITER*************************************");
        return new JdbcBatchItemWriterBuilder<Match>()
                .itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
                .sql("INSERT INTO ipl_match (id, city, match_date, player_Of_Match, venue, team1, team2, toss_Winner, toss_Decision, match_Winner, result, result_Margin, umpire1, umpire2) "+
                "VALUES (:id, :city, :matchDate, :playerOfMatch, :venue, :team1, :team2, :tossWinner, :tossDecision, :matchWinner, :result, :resultMargin, :umpire1, :umpire2)")
                .dataSource(dataSource).build();

    }

    @Bean
    public Job importUserJob(JobRepository jobRepository,
            JobCompletionNotificationListener listener, Step step1) {
        return new JobBuilder("importUserJob", jobRepository)
                .incrementer(new RunIdIncrementer())
                .listener(listener)
                .flow(step1)
                .end()
                .build();
    }

    @Bean
    public Step step1(JobRepository jobRepository,
            PlatformTransactionManager transactionManager, JdbcBatchItemWriter<Match> writer) {
        return new StepBuilder("step1", jobRepository)
                .<IPLMatchInput, Match>chunk(10, transactionManager)
                .reader(reader())
                .processor(processor())
                .writer(writer)
                .build();
    }
}
