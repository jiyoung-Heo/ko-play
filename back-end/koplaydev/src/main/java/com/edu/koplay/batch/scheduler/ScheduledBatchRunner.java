package com.edu.koplay.batch.scheduler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledBatchRunner {
    private static final Logger logger = LoggerFactory.getLogger(ScheduledBatchRunner.class);

    private final JobLauncher jobLauncher;
    private final Job job;

    public ScheduledBatchRunner(JobLauncher jobLauncher, Job job) {
        this.jobLauncher = jobLauncher;
        this.job = job;
    }

    //@Scheduled(cron = "0 30 23 * * ?")
    @Scheduled(cron = "0 * * * * ?") //: 이 크론 표현식은 매 1분마다 작업을 실행하도록 설정합니다.
    public void runBatchJob() {
        try {
            JobParameters jobParameters = new JobParametersBuilder()
                    .addLong("time", System.currentTimeMillis())
                    .toJobParameters();
            jobLauncher.run(job, jobParameters);
            logger.info("Batch job executed successfully.");
        } catch (Exception e) {
            logger.error("Batch job failed: {}", e.getMessage(), e);
        }
    }
}

